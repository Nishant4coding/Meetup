const express = require('express')
// const { hostname } = require('os')
const app = express()
const http = require('http').createServer(app)
const hostname="0.0.0.0";
const PORT = process.env.PORT || 5000

http.listen(PORT,hostname, () => {
    console.log(`Listening on port  ${PORT}`)
})

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

// Socket 
const io = require('socket.io')(http)
// const users={};
io.on('connection', (socket) => {
    console.warn('Connected...')
    socket.on('new-user-joined',name=>{
        user[socket.id]=name;
        socket.broadcast.emit('user-joined',name);
    })
    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg)
        // console.log(msg)
    })

})

