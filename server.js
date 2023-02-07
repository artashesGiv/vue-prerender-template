require('dotenv').config()
const path = require('path')
const express = require('express')
const serveStatic = require('serve-static')

const app = express()

app.use(serveStatic(path.join(__dirname, '/dist')))

app.get('/*', (res, req) => {
    req.redirect('/')
})

const port = +process.env.PORT + 1 || 2001

app.listen(port, () => {
    console.log(`server started at localhost:${port}`)
})
