# TODO: maybe we can just inject the secrets directly into AKV since we have all the info here now.
output "rgname" {
  value       = module.bca-infrastructure.rgname
  description = "The Resource Group Name"
}

output "aks" {
  value       = module.bca-infrastructure.aksname
  description = "The name of the Azure Kubernetes Cluster"
}

output "acr" {
  value       = module.bca-infrastructure.acrname
  description = "The name of the Azure Container Registry"
}

output "cosmos" {
  value       = module.bca-infrastructure.cosmosdbname
  description = "The name of the Azure Cosmos Database"
}

output "cosmosname" {
  value       = module.bca-infrastructure.cosmosdbname
  description = "The CostmosDB host name"
}

output "akv" {
  value       = module.bca-infrastructure.akvname
  description = "The Azure Key Vault Name"
}

output "cosmosdbprimary_key" {
  value       = module.bca-infrastructure.cosmosdbprimary_key
  description = "The cosmosdb host used in a connection string"
}

# This is now automated done by Terraform.
# TODO: Is this the best strategy?
# output "save_db_host_as-AKV-secret" {
#   value       = "az keyvault secret set --vault-name \"${module.bca-infrastructure.akvname}\" --name \"DBHOST\" --value \"${module.bca-infrastructure.cosmosdbname}.mongo.cosmos.azure.com\""
#   description = "The command to execute to store the DB Host into AKV"
# }

# output "save_db_uid_as-AKV-secret" {
#   value       = "az keyvault secret set --vault-name \"${module.bca-infrastructure.akvname}\" --name \"DBUID\" --value \"${module.bca-infrastructure.cosmosdbname}"
#   description = "The CosmosDB user id"
# }

# output "save_db_pwd_as-AKV-secret" {
#   value       = "az keyvault secret set --vault-name \"${module.bca-infrastructure.akvname}\" --name \"DBPWD\" --value \"${module.bca-infrastructure.cosmosdbprimary_key}"
#   description = "The CosmosDB Primray Password"
# }

# Connection string doesn't appear to be a saved var in Azure so I'm formulating it here ease to devops engineer
output "mongo_cli_connection_string" {
  value       = "mongo \"mongodb://${module.bca-infrastructure.cosmosdbname}:${module.bca-infrastructure.cosmosdbprimary_key}@${module.bca-infrastructure.cosmosdbname}.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@${module.bca-infrastructure.cosmosdbname}@\""
  description = "The CLI command to connect to Mongo - includes the mongo executable"
}
