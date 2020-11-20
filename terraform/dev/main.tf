resource "random_string" "prefix" {
  length  = 8
  special = false
  lower   = true
  upper   = false
  number  = true
}

module "bca-infrastructure" {
  source = "git::https://github.com/bashbang/bca-tfmodues.git?ref=dev-0.0.29"
  # General module variables
  rg_name  = "${var.environment}-POC"
  location = var.location

  # AKS Variables
  aks_cluster_name = "${var.environment}-aks"
  dns_prefix       = "${var.environment}-k8s"
  client_id        = var.client_id
  client_secret    = var.client_secret

  # ACR variables
  acr_name = "${var.environment}${random_string.prefix.id}acr"

  # Cosomos DB variables
  cosmosdb_name = "${var.environment}${random_string.prefix.id}cosmosdb"
  # TODO: will need to add more cosmos variables to support a failover environment and allow for multi database.
  # TODO: currently only useing a single database in a single region.

  # AKV variables
  avk_name  = "${var.environment}-akv"

}

