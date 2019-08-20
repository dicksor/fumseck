const express = require('express')
const app = express()
const http = require('http').createServer(app)
const path = require('path')
const io = require('socket.io')(http)
const GameManager = require('./personal_modules/GameManager')
const viewPath = 'views'

let gameManager = new GameManager()

app.set('view engine', 'ejs')

app.use(express.static('public'))

app.get('/', (req, res) =>{
  res.render('index')
})
.get('/create_game', (req, res) => {
  res.render('createGame', {gameId:'o9jd99'})
})
.get('/create_game_processing', (req, res) => {
  // TODO
})
.get('/join_game', (req, res) => {
  res.render('joinGame')
})
.get('/join_game/:id_game', (req, res) => {
  console.log('join_game_by_id')
})
.get('/in_game/:id_game', (req, res) => {
  res.render('in_game')
})
.use((req, res, next) => {
  console.log('404')
})

io.on('connection', function(socket){
  console.log('a user connected')

  socket.on('disconnect', function(){
    // TODO
  })

  socket.on('quiz_init', (data) => {
    console.log('quiz_init')
    gameManager.createGame(data, socket)
  })
})

http.listen(34335, function(){
  console.log('Starting server on port: 34335')
})
