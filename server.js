require('dotenv').config()
const path = require('path')
const express = require('express')
const serveStatic = require('serve-static')

const resolve = file => path.resolve(__dirname, file)
const isProd = process.env.NODE_ENV === 'production'

const app = express()

const serve = (dir, cache) =>
    express.static(resolve(dir), {
        maxAge: cache && isProd ? '1y' : 0,
    })

app.use(serveStatic(path.join(__dirname, 'dist')))

app.use('/public', serve('./public', true))
app.use('/images', serve('./public/images', true))
app.use('/fonts', serve('./public/fonts', true))
app.use('/favicon', serve('./public/favicon', true))

const port = +process.env.PORT + 1 || 9999

app.get('/*', (res, req) => {
    req.redirect('/')
})

app.listen(port, () => {
    console.log(`server started at localhost:${port}`)
})
