const http = require('http')
const express = require('express')

const app = express();
const server = http.createServer()

app.get('/', function(req, res) {
	res.sendFile('index.html', { root: __dirname })
})
server.on('request', app)
server.listen(3000)

console.log("Server started on port 3000")

//--------------------------
const ws = require('ws')

const wss = new ws.Server({server}) 
wss.on('connection', (connection) => {
	const numClients = wss.clients.size
	wss.broadcast('Current visitors: ' + numClients)
	if (ws.readyState === ws.OPEN) {
		ws.send('Welcome to my server!')
	}
})

wss.broadcast = (msg) => wss.clients.forEach(client => client.send(msg))
