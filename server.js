const {createServer} = require('http')
const {parse} = require('url')
const next = require('next')
const cors = require('cors')

const dev = process.env.NODE_ENV !== 'production'
const app = next({dev})
const handle = app.getRequestHandler()

const corsOptions = {
    origin: 'http://example.com',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
  server.use(cors(corsOptions));

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true)
    const { pathname, query } = parsedUrl

    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

    handle(req, res, parsedUrl)
  }).listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
