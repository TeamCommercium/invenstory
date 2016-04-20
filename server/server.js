import express from 'express'
import path from 'path'
import { webServer } from './modules/config.js'
var authAPI = require('./api/auth_api.js')
// import * as inventoryAPI from './api/auth_api.js'

const app = express()

app.use(express.static(path.join(__dirname, '../dist')))
app.use("/auth", authAPI)
// app.user("/inventory", inventoryAPI)

app.get('/', (req,res) => res.send())

app.listen(webServer.port, ()=>{console.log("Listening on", webServer.port)})
