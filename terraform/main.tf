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


resource "azurerm_function_app" "function" {
  name                       = "${var.prefix}-${var.environment}-banner-app-function"
  location                   = azurerm_resource_group.rg.location
  resource_group_name        = azurerm_resource_group.rg.name
  app_service_plan_id        = azurerm_app_service_plan.sp.id
  storage_account_name       = azurerm_storage_account.storage.name
  storage_account_access_key = azurerm_storage_account.storage.primary_access_key
  version                    = "~3"
  app_settings = {
    "FUNCTIONS_WORKER_RUNTIME" = "dotnet"
    "FUNCTION_APP_EDIT_MODE"   = "readonly"
    "https_only"               = true
    #"HASH"                     = base64sha256(file("./dist/function.zip"))
    "HASH"                     = filebase64sha256("./dist/function.zip")
    "WEBSITE_RUN_FROM_PACKAGE" = "https://${azurerm_storage_account.storage.name}.blob.core.windows.net/${azurerm_storage_container.storage_container.name}/${azurerm_storage_blob.storage_blob.name}${data.azurerm_storage_account_sas.storage_sas.sas}"
  }


  tags = local.common_tags

}