var express = require('express')
var path = require('path')
var webConfig = require('./modules/config.js').webServer
var authAPI = require('./api/auth_api.js')
var inventoryAPI = require('./api/auth_api.js')
var amazonMWS = require('./api/amazonMWS.js')

const app = express()

app.use(express.static(path.join(__dirname, '../dist')))
app.use("/auth", authAPI)
app.use("/inventory", inventoryAPI)

app.get('/', (req,res) => res.send())

app.get('/getMatchingASIN', amazonMWS.getMatchingASIN)
app.get('/getLowestOffers', amazonMWS.getLowestOffers)

app.listen(webConfig.port, ()=>{console.log("Listening on", webConfig.port)})
