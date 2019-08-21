//npm modules
const express = require('express')
const app = express()
const http = require('http').createServer(app)
const path = require('path')
const io = require('socket.io')(http)
const GameManager = require('./personal_modules/GameManager')
const viewPath = 'views'

const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({extended: false})

let gameManager = new GameManager()

app.set('view engine', 'ejs')
app.use('/favicon.ico', express.static('public/img/icon/favicon.ico'));

app.use(express.static('public'))



app.get('/', (req, res) =>{
  res.render('index')
})
.get('/create_game', (req, res) => {
  res.render('createGame')
})
.get('/create_game_processing', (req, res) => {
  console.log("create_game_processing");
  //res.query.gameId
  //res.query.nbUser
  //res.query.theme
  res.render('waiting_queue', {host:true, gameId:res.query.gameId})
})
.get('/join_game/:game_id', (req, res) => {
  res.render('joinGame', {gameId:req.params.game_id})
})
.get('/create_game_processing', (req, res) => {
  // TODO
})
.get('/join_game', (req, res) => {
  res.render('joinGame', {gameId:''})
})
.post('/waiting_queue', urlencodedParser, (req, res) => {
  res.render('waiting_queue', {host:false, pseudo:req.body.pseudo, gameId:req.body.gameId})
})
.get('/in_game/:id_game', (req, res) => {
  res.render('in_game')
})
.use((req, res, next) => {
  res.status(404).send('Page introuvable !');
})

let playerConnected = []

io.on('connection', function(socket){
  console.log('a user connected')

  socket.on('waiting_queue', (data) => {
  	socket.broadcast.emit('player_connected', {newPlayerPseudo:data.pseudo})
  })

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
