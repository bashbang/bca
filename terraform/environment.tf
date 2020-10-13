variable "region" {
  type        = string
  default     = "canadacentral"
  description = "The Azure region/location where the resources will be created"
}

variable "environment" {
  type        = string
  default     = "dev"
  description = "The current working environment"
}

locals {
  common_tags = {
    environment = var.environment
    project     = "BC Assessment"
    team        = "Devops"
    owner       = "CMul"
  }
}
