const express = require('express')
const path = require('path')
const webConfig = require('./modules/config.js').webServer
const authAPI = require('./api/auth_api.js')
const inventoryAPI = require('./api/inventory_api.js')
const productsAPI = require('./api/products_api.js')
const amazonMWS = require('./api/amazonMWS.js')
const userAPI = require('./api/user_api.js')
const cookieParser = require('cookie-parser')
const authenticate = require('./modules/utilities').authenticate
const jwtUnauth = require('./modules/utilities').jwtUnauth
const fs = require('fs');
const http = require('http')
const https = require('https')


require('./modules/amznPriceService.js').init()
require('./modules/emailNotification.js').init()

const privateKey  = fs.readFileSync('../sslcert/domain.key', 'utf8');
const certificate = fs.readFileSync('../sslcert/domain.crt', 'utf8');

const credentials = {key: privateKey, cert: certificate}
const app = express()

app.use(express.static(path.join(__dirname, '../dist')))
app.use(cookieParser())


app.use("/auth", authAPI)
app.use("/inventory", authenticate, inventoryAPI)
app.use("/user", authenticate, userAPI)
app.use("/products", authenticate, productsAPI)

app.get('/', (req,res) => res.send())

app.all('*', function(req, res){
  res.redirect('/')
})

app.use(jwtUnauth)

const httpServer = http.createServer(app)
const httpsServer = https.createServer(credentials, app)

httpServer.listen(webConfig.port, ()=>{console.log("Listening on:", webConfig.port)})
httpsServer.listen(webConfig.httpsPort, ()=>{console.log("Https listening on:", webConfig.httpsPort)})

module.exports = app
