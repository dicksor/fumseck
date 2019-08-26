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
const QuizReader = require('./personal_modules/QuizReader')
const CreateQuizParsing = require('./personal_modules/CreateQuizParsing')

const quizReader = new QuizReader()

let gameManager = new GameManager()

app.set('view engine', 'ejs')
app.use('/favicon.ico', express.static('public/img/icon/favicon.ico'));
app.use(express.static('public'))


app.get('/', (req, res) =>{
  res.render('index')
})
.get('/create_game', (req, res) => {
  quizReader.readTopics()
  .then(topics => {
    res.render('createGame', { topics: topics })
  })
  .catch(error => {
    // TODO : tell user
    console.log(error)
  })

})
.get('/load_game/:token', (req, res) => {
  let createdQuiz = new QuizReader()

  //let quizFilename = 'fum_quiz_de_test_load_ZXtoTw17qzEYSirFE7B8.json'
  //let quizFilename = ''

  createdQuiz.findFileInsideDir(req.params.token).then((quizFilename) => {
    createdQuiz.readQuiz(quizFilename).then((quizData) => {
      res.render('createGame', { quizTitle: quizData.quizTitle, load_game: true, nbQuestions: quizData.nbQuestions, quizFilename: quizFilename })
    })
    .catch((err) => {
      console.log(err)
    })
  })
  .catch((err) => {
    console.log(err)
  })


})
.post('/create_game_processing', urlencodedParser, (req, res) => {
  let gameId = gameManager.generateGameId()
  gameManager.createGame(gameId, req.body)
  res.render('game', { host: true, gameId: gameId })
})
.get('/join_game/:game_id', (req, res) => {
  res.render('joinGame', {gameId:req.params.game_id})
})
.get('/join_game', (req, res) => {
  res.render('joinGame', {gameId:''})
})
.post('/waiting_queue', urlencodedParser, (req, res) => {
  res.render('game', { host: false, pseudo: req.body.pseudo, gameId: req.body.gameId })
})
.post('/create_quiz_processing', urlencodedParser, (req, res) => {
  const createQuizParsing = new CreateQuizParsing(req.body)
  createQuizParsing.saveData()
  res.redirect('/')
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
