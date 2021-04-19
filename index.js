require('dotenv').config()
require('dotenv/config')

const server = require("./api/server");
const helmet = require("helmet")
const cors = require("cors")

const port = process.env.PORT || 8080	
server.use(helmet())
server.use(cors())

server.listen(port, () => {
	console.log(`running at http://localhost:${port}`)
})