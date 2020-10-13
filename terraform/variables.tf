variable "prefix" {
  type        = string
  default     = "bca"
  description = "Prefix for various named resources"
}

variable "resource_group_name" {
  type        = string
  default     = "banner-service"
  description = "Which Azure resrouce group is this being deployed into."
}

variable "app_service_name" {
  type        = string
  default     = "banner-service"
  description = "The name of the web application."
}

variable "client_secret" {
  type        = string
  description = "The Azure service principle 'password' used for Terraform Cloud deployments - this is a secret and should be deployed in Terraform Cloud - see readme.md on how to obtain this info"
}

variable "subscription_id" {
  type        = string
  description = "The Azure subscription ID"
}

variable "client_id" {
  type        = string
  description = "The Azure 'appId' is terraforms 'client_id'"
}

variable "tenant_id" {
  type        = string
  description = "The Azure 'tenant' id"
}
