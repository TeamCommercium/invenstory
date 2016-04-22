module.exports.db = { url:      process.env.DB_URL || 'localhost',
                    name:     process.env.DB_NAME || 'invenstory_db',
                    username: process.env.DB_USER || null,
                    password: process.env.DB_PASSWORD || null
                  }
module.exports.webServer = {
                    port: process.env.PORT || 8080
}

exports.state = {
                    env: process.env.NODE_ENV || 'development'
}

module.exports.amazonEnv = {
                    accessKeyId:      process.env.MWS_ACCESS_KEY_ID || null,
                    secretAccessKey:  process.env.MWS_SECRET_KEY || null,
                    merchantId:       process.env.MWS_MERCHANT_ID || null,
}

module.exports.amazonAuth = {
                    clientId:      process.env.AUTH_CLIENT_ID || null,
                    clientSecret:  process.env.AUTH_CLIENT_SECRET || null,
                    callbackURL:   process.env.AUTH_CALLBACK_URL || "http://127.0.0.1:8080/auth/amazon/callback"
}