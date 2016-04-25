var express = require('express')
var path = require('path')
var webConfig = require('./modules/config.js').webServer
var authAPI = require('./api/auth_api.js')
var inventoryAPI = require('./api/inventory_api.js')
var amazonMWS = require('./api/amazonMWS.js')
var userAPI = require('./api/user_api.js')
var cookieParser = require('cookie-parser')
var authenticate = require('./modules/utilities').authenticate

const app = express()

app.use(express.static(path.join(__dirname, '../dist')))
app.use(cookieParser())

app.use("/auth", authAPI)
app.use("/inventory", authenticate, inventoryAPI)
app.use('/user', authenticate, userAPI)

app.get('/', (req,res) => res.send())

app.get('/getMatchingAsins', authenticate, amazonMWS.getMatchingAsins)
app.get('/getLowestOffers', authenticate, amazonMWS.getLowestOffers)
app.get('/listProductSearch', authenticate, amazonMWS.listProductSearch)

app.all('*', function(req, res){
  res.redirect('/')
})

app.listen(webConfig.port, ()=>{console.log("Listening on", webConfig.port)})
