var express = require('express')
var path = require('path')
var webConfig = require('./modules/config.js').webServer
var authAPI = require('./api/auth_api.js')
var inventoryAPI = require('./api/inventory_api.js')
var productsAPI = require('./api/products_api.js')
var amazonMWS = require('./api/amazonMWS.js')
var userAPI = require('./api/user_api.js')
var cookieParser = require('cookie-parser')
var authenticate = require('./modules/utilities').authenticate
var fs = require('fs');
var http = require('http')
var https = require('https')


require('./modules/amznPriceService.js').init()

var privateKey  = fs.readFileSync('../sslcert/domain.key', 'utf8');
var certificate = fs.readFileSync('../sslcert/domain.crt', 'utf8');

var credentials = {key: privateKey, cert: certificate}
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

var httpServer = http.createServer(app)
var httpsServer = https.createServer(credentials, app)

httpServer.listen(webConfig.port, ()=>{console.log("Listening on", webConfig.port)})
httpsServer.listen(8443)

module.exports = app
