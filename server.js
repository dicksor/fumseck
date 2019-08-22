//npm modules
const express = require('express')
const app = express()
const http = require('http').createServer(app)
const path = require('path')
const io = require('socket.io')(http)
const bodyParser = require('body-parser')
let urlencodedParser = bodyParser.urlencoded({ extended: false })

//personal_modules
const GameManager = require('./personal_modules/GameManager')

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
.post('/create_game_processing', urlencodedParser, (req, res) => {
  let gameId = gameManager.generateGameId()
  gameManager.createGame(gameId, req.body)
  res.render('game', {host:true, gameId:gameId})
})
.get('/join_game/:game_id', (req, res) => {
  res.render('joinGame', {gameId:req.params.game_id})
})
.get('/join_game', (req, res) => {
  res.render('joinGame', {gameId:''})
})
.post('/waiting_queue', urlencodedParser, (req, res) => {
  res.render('game', {host:false, pseudo:req.body.pseudo, gameId:req.body.gameId})
})
.use((req, res, next) => {
  res.status(404).send('Page introuvable !');
})

io.on('connection', function(socket){

  socket.on('player_in_waiting_queue', (data) => {
  	gameManager.addPlayer(data, socket)
  })

  socket.on('host_in_waiting_queue', (data) => {
    gameManager.addHost(data, socket)
  })
})

http.listen(34335, function(){
  console.log('Starting server on port: 34335')
})
