
exports.webServer = {
                      port: process.env.PORT || 8080,
                      httpsPort: process.env.HTTPS_PORT || 8443
                    }

exports.state     = {
                      env: process.env.NODE_ENV || 'development',
                    }

exports.amazonEnv = {
                      accessKeyId:      process.env.MWS_ACCESS_KEY_ID || null,
                      secretAccessKey:  process.env.MWS_SECRET_KEY || null,
                      merchantId:       process.env.MWS_MERCHANT_ID || null,
                      marketplaceId:    process.env.MWS_MARKETPLACE_ID || "ATVPDKIKX0DER"
                  }

exports.amazonAuth = {
                      clientId:      process.env.AUTH_CLIENT_ID || null,
                      clientSecret:  process.env.AUTH_CLIENT_SECRET || null,
                      callbackURL:   process.env.AUTH_CALLBACK_URL || "http://localhost:" + exports.webServer.port + "/auth/amazon/callback",
                      redirectURL:   process.env.AUTH_REDIRECT_URL || "http://localhost:" + exports.webServer.port
                    }

exports.jwtConfig = {
                      secret: process.env.JWT_SECRET || "dp4L2lRayDn4RvN4tr3hziqb5Df/3IR/L9TrrGhm+Em"
                    }

exports.service   = {
                      svcFreq:          process.env.FETCH_SVC_FREQ || 1000*60*10,
                      maxProdFreq:      process.env.FETCH_PROD_MAX || 1000*60*60
                    }
exports.email     = {
                      emailFreq:        process.env.EMAIL_FREQ || 1000*60*60*24,
                      emailAccount:     process.env.GMAIL_ACCOUNT || null,
                      emailPassword:    process.env.GMAIL_PASSWORD || null 
                    }

 exports.db       = require('knex')(require('../../knexfile.js')[exports.state.env])
