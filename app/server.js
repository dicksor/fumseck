const express = require('express')
const app = express()
const http = require('http').createServer(app)
const path = require('path')
const io = require('socket.io')(http)

const viewPath = 'view'

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, viewPath, '/index.html'))
})

app.get('/create_game', function(req, res){
  console.log('create_game')
})

app.get('/join_game', function(req, res){
  console.log('join_game')
})

app.get('/join_game/:id_party', function(req, res){
  console.log('join_game_with_id')
})

// io.on('connection', function(socket){
//   console.log('a user connected')
//
//   socket.on('disconnect', function(){
//     console.log('user disconnected')
//   })
// })

http.listen(34335, function(){
  console.log('Starting server on port: 34335')
})
