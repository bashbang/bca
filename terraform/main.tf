provider "random" {
  version = "~> 2.2"
}

resource "random_string" "storage_name" {
  length  = 24
  upper   = false
  number  = false
  lower   = true
  special = false
}

resource "random_string" "function_name" {
  length  = 24
  upper   = false
  number  = false
  lower   = true
  special = false
}

resource "random_string" "app_service_plan_name" {
  length  = 24
  upper   = false
  number  = false
  lower   = true
  special = false
}

resource "azurerm_storage_account" "storage" {
  name                     = random_string.storage_name.result
  location                 = azurerm_resource_group.rg.location
  resource_group_name      = azurerm_resource_group.rg.name
  account_tier             = "Standard"
  account_replication_type = "LRS"

  tags = local.common_tags
}

resource "azurerm_storage_container" "storage_container" {
  name                  = "func"
  storage_account_name  = azurerm_storage_account.storage.name
  container_access_type = "private"
}

# TODO: The file doesn't get updated when changed.  Seems this is an issue with the module. https://github.com/terraform-providers/terraform-provider-azurerm/pull/7786
# TODO: Following the above issue for resolution. Need to come up with a workaround to deal with this in the time being.
resource "azurerm_storage_blob" "storage_blob" {
  name                   = "function.zip"
  storage_account_name   = azurerm_storage_account.storage.name
  storage_container_name = azurerm_storage_container.storage_container.name
  type                   = "Block"
  source                 = "./dist/function.zip"
}



data "azurerm_storage_account_sas" "storage_sas" {
  connection_string = azurerm_storage_account.storage.primary_connection_string
  https_only        = false
  resource_types {
    service   = false
    container = false
    object    = true
  }
  services {
    blob  = true
    queue = false
    table = false
    file  = false
  }
  start  = "2020-01-01"
  expiry = "2030-12-31"
  permissions {
    read    = true
    write   = false
    delete  = false
    list    = false
    add     = false
    create  = false
    update  = false
    process = false
  }
}

resource "azurerm_application_insights" "banner_insights" {
  name                = "${var.prefix}-${var.environment}-banner-app-insights"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  application_type    = "web"
}

resource "azurerm_function_app" "function" {
  name                       = "${var.prefix}-${var.environment}-banner-app-function"
  location                   = azurerm_resource_group.rg.location
  resource_group_name        = azurerm_resource_group.rg.name
  app_service_plan_id        = azurerm_app_service_plan.sp.id
  storage_account_name       = azurerm_storage_account.storage.name
  storage_account_access_key = azurerm_storage_account.storage.primary_access_key

  version = "~3"
  app_settings = {
    "FUNCTIONS_WORKER_RUNTIME" = "dotnet"
    "FUNCTIONS_EXTENSION_VERSION" : "~3"
    "FUNCTION_APP_EDIT_MODE"         = "readonly"
    "https_only"                     = false
    "HASH"                           = filebase64sha256("./dist/function.zip")
    "WEBSITE_RUN_FROM_PACKAGE"       = "https://${azurerm_storage_account.storage.name}.blob.core.windows.net/${azurerm_storage_container.storage_container.name}/${azurerm_storage_blob.storage_blob.name}${data.azurerm_storage_account_sas.storage_sas.sas}"
    "APPINSIGHTS_INSTRUMENTATIONKEY" = azurerm_application_insights.banner_insights.instrumentation_key
  }

  tags = local.common_tags

}
