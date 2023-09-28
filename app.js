const http = require('http')
const express = require('express')

const app = express();
const server = http.createServer()

app.get('/', function(req, res) {
	res.write("Hello world")
	res.end()
})
server.on('request', app)
server.listen(3000)

console.log("Server started on port 3000")
