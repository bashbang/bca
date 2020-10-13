# Setup Terraform Cloud
We fist need to setup a Azure service account to allow Terraform Cloud to manage the Azure resources


Detailed instructions here:  https://www.terraform.io/docs/providers/azurerm/guides/service_principal_client_secret.html#configuring-the-service-principal-in-terraform

Basically do this:
`az login`
`az account list`
If there's several subscriptions then you may need to specify which subscription you wish to use.
`az account set --subscription="SUBSCRIPTION_ID"`

Let's now create the service account
`az ad sp create-for-rbac --rol="Contributor" --scopes="/subscriptions/SUBSCRIPTION_ID"`

This will output the following cable

`{
  "appId": "00000000-0000-0000-0000-000000000000",
  "displayName": "azure-cli-2017-06-05-10-41-15",
  "name": "http://azure-cli-2017-06-05-10-41-15",
  "password": "0000-0000-0000-0000-000000000000",
  "tenant": "00000000-0000-0000-0000-000000000000"
}`

which maps to:
* appId is the client_id defined above.
* password is the client_secret defined above.
* tenant is the tenant_id defined above.


Confirm the createion of the account:
`az login --service-principal -u CLIENT_ID -p CLIENT_SECRET --tenant TENANT_ID`

see what you can see:
`az vm list-sizes --location westus`

then log out of the service account
`az logout`


Lastly we need to config Terraform Cloud with these values:

client_secret  (Set this one to sensitive)
subscription_id
client_id
tenant_id