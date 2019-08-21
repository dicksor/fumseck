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
const viewPath = 'views'

let gameManager = new GameManager()
gameManager.test()

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
  let theme = req.body.theme
  let nbPlayer = req.body.nbPlayer

  gameManager.createGame(gameId, theme, nbPlayer)
  res.render('waiting_queue', {host:true, gameId:gameId})
  console.log('Game is created with id : ' + gameId);
})
.get('/join_game/:game_id', (req, res) => {
  res.render('joinGame', {gameId:req.params.game_id})
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

io.on('connection', function(socket){
  console.log('a user connected')

  socket.on('waiting_queue', (data) => {
  	gameManager.addPlayer(data.pseudo, data.gameId, socket)
  })

  socket.on('disconnect', function(){
    // TODO
  })
})

http.listen(34335, function(){
  console.log('Starting server on port: 34335')
})
