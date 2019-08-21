//npm modules
const express = require('express')
const app = express()
const http = require('http').createServer(app)
const path = require('path')
const io = require('socket.io')(http)
const GameManager = require('./personal_modules/GameManager')
const viewPath = 'views'

let gameManager = new GameManager()

app.set('view engine', 'ejs')
app.use('/favicon.ico', express.static('public/img/icon/favicon.ico'));
app.use(express.static('public'))

app.get('/', (req, res) =>{
  res.render('index')
})
.get('/create_game', (req, res) => {
  let idGenerator = new IdGenerator()
  gameManager.generateGameId()
  res.render('createGame', {gameId:gameManager.generateGameId()})
})
.get('/create_game_processing', (req, res) => {
  gameManager.createGame(req.query)

  res.render('waiting_queue', {host:true, gameId:res.query.gameId})
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

  res.render('waiting_queue', {host:false})
})
.get('/in_game/:id_game', (req, res) => {
  gameManager.createGame(req.params.id_game, res)
})
.use((req, res, next) => {
  res.status(404).send('Page introuvable !');
})

io.sockets.on('connection', (socket) =>{
   socket.on('quiz_init', () => {
     socket.emit(gameManager.sendNext
   })
 })

//if games[gameId]

http.listen(34335, ()=> {
  console.log('Starting server on port: 34335')
})
