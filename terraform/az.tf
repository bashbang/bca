#
# This TF sets up an environment for an Azure "Function" deployment
#

# The basic setup of the TF environment 
terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = ">= 2.26"
    }
  }
}

# setup for TF cloud - CLI version
# TODO: this will change once we have a github account setup
terraform {
  backend "remote" {
    organization = "BCAssessment"

    workspaces {
      name = "dev"
    }
  }
}


provider "azurerm" {
  # Whilst version is optional, we /strongly recommend/ using it to pin the version of the Provider being used
  version = "~>2.0"
  subscription_id = var.subscription_id
  client_id       = var.client_id
  client_secret   = var.client_secret
  tenant_id       = var.tenant_id

  features {}
}

resource "azurerm_resource_group" "rg" {
  name     = "${var.prefix}-${var.environment}-${var.resource_group_name}"
  location = var.region
  tags     = local.common_tags
}

resource "azurerm_app_service_plan" "sp" {
  name                = "${var.prefix}-${var.environment}-${var.app_service_name}"
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location

  kind = "functionapp"

  sku {
    tier = "Dynamic"
    size = "Y1"
  }
}
