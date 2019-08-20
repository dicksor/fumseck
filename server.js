//npm modules
const express = require('express')
const app = express()
const http = require('http').createServer(app)
const path = require('path')
const io = require('socket.io')(http)
const Quiz = require('./personal_modules/Quiz')
const viewPath = 'views'

//personal modules
let IdGenerator = require('./personal_modules/IdGenerator')

//configuration
app.set('view engine', 'ejs')
app.use('/favicon.ico', express.static('public/img/icon/favicon.ico'));

app.use(express.static('public'))

app.get('/', (req, res) =>{
  res.render('index')
})
.get('/create_game', (req, res) => {
  let idGenerator = new IdGenerator()
  res.render('createGame', {gameId:idGenerator.generate()})
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
.get('/join_game', (req, res) => {
  res.render('joinGame', {gameId:''})
})
.get('/waiting_queue', (req, res) => {
  let pseudo = res.query.pseudo
  let gameId = res.query.gameId

  res.render('waiting_queue', {host:false})
  // io.sockets.on('connection', (socket) =>{
  //   socket.broadcast.emit('user_connection', {pseudo})
  // })

  //if games[gameId]
})
.get('/in_game/:id_game', (req, res) => {
  let quiz = new Quiz('oqdb_breaking_bad.json')
  quiz.readQuiz().then((quizData) => {
    console.log(quizData.quizz.expert[0].question)
    res.render('in_game', {quiz: quizData})
  })
})
.use((req, res, next) => {
  res.status(404).send('Page introuvable !');
})

http.listen(34335, ()=> {
  console.log('Starting server on port: 34335')
})
