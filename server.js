//npm modules
const express = require('express')
const app = express()
const http = require('http').createServer(app)
const path = require('path')
const io = require('socket.io')(http)

//personal modules
let IdGenerator = require('./personal_modules/IdGenerator')

//configuration
app.set('view engine', 'ejs')
app.use('/favicon.ico', express.static('public/img/icon/favicon.ico'));

//routes
app.get('/', (req, res) =>{
  res.render('index');
})
.get('/create_game', (req, res) => {
  let idGenerator = new IdGenerator()
  res.render('createGame', {gameId:idGenerator.generate()})
})
.get('/create_game_processing', (req, res) =>{

})
.get('/join_game/:game_id', (req, res) => {
  res.render('joinGame', {gameId:req.params.game_id})
})
.get('/join_game', (req, res) => {
  res.render('joinGame', {gameId:''})
})
.get('/waiting_queue', (req, res) => {
  let pseudo = res.query.pseudo
  let gameId = res.query.gameId

  // io.sockets.on('connection', (socket) =>{
  //   socket.broadcast.emit('user_connection', {pseudo})
  // })

  //if games[gameId]
})
.use((req, res, next) => {
  res.status(404).send('Page introuvable !');
})

http.listen(34335, ()=> {
  console.log('Starting server on port: 34335')
})
