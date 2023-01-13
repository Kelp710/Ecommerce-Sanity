const {createServer} = require('http')
const {parse} = require('url')
const next = require('next')
const cors = require('cors')

const dev = process.env.NODE_ENV !== 'production'
const app = next({dev})
const corsMiddleware = require('./cors');
app.use(corsMiddleware);