#!/bin/bash

#### How to use:
#### run:
####   source InvenstoryENV.sh
#### from within a terminal, then run:
####
####   printenv | grep INVAPP
####
#### to verify you have all of these environment variables
####
#### redo this when you open a new terminal window (or add this to your .bashrc)


#### Amazon Sellers Account Access Key
export MWS_ACCESS_KEY_ID=""

#### Amazon Sellers Account Secret Key
export MWS_SECRET_KEY=""

#### Amazon Sellers Account Merchant ID
export MWS_MERCHANT_ID=""

#### Login With Amazon Client ID
export AUTH_CLIENT_ID=""

#### Login With Amazon Client Secret
export AUTH_CLIENT_SECRET=""

#### Login With Amazon Registered Callback URL
export AUTH_CALLBACK_URL=""

#### Login With Amazon Registered Redirect URL
export AUTH_REDIRECT_URL=""

#### Hardcoded Amazon Geographical Location
export MWS_MARKETPLACE_ID=""

#### Postgres Database User
export DB_USER=""

#### Postgres Database Password
export DB_PASSWORD=""

#### Postgres Database URL
export DB_URL=""

#### JSON Web Token Secret
export JWT_SECRET=""