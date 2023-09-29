const http = require('http')
const express = require('express')

const app = express();
const server = http.createServer()

app.get('/', function(req, res) {
	res.sendFile('index.html', { root: __dirname })
})
server.on('request', app)
server.listen(3000)

process.on('SIGINT', () => {
	wss.clients.forEach(client => client.close())
	server.close(() => shutdownDB())
})

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
	
	db.run(`
		INSERT INTO visitors(count, time) VALUES (${numClients}, DATE('now'));
	`)
	connection.on('close', () => wss.broadcast('A client disconnected'))
})

wss.broadcast = (msg) => wss.clients.forEach(client => client.send(msg))


//--------------------------
const sqlite = require('sqlite3')
const db = new sqlite.Database(':memory:')

db.serialize(() => {
	db.run(`
		CREATE TABLE IF NOT EXISTS visitors (
			count INTEGER,
			time TEXT
		)
	`)
})

function getCounts() {
	db.each("SELECT * FROM visitors", (err, row) => {
		console.log('Row data: ', row)
	})
}

function shutdownDB() {
	getCounts()
	console.log("Shutting down db")
	db.close()
}
