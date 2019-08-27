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

//global variable
let gameManager = new GameManager()

//config
app.set('view engine', 'ejs')
app.use('/favicon.ico', express.static('public/img/icon/favicon.ico'));
app.use(express.static('public'))

//router
app.get('/', (req, res) => {
  quizReader.readCopyrights().then(copyrights => {
    res.render('index', { copyrights: copyrights })
  })
  .catch(error => {
    // TODO : tell user
    console.log(error)
  })

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
  res.render('game', {host:true, gameId:gameId, nbPlayer:req.body.nbPlayer, theme:req.body.theme, nbQuestion:req.nbQuestion})
})
.get('/join_game/:game_id', (req, res) => {
  let gameId = req.params.game_id
  if(gameManager.isGameIdInRunningGame(gameId)){
    res.render('joinGame', {gameId:gameId})
  } else {
    res.redirect('/')
  }

})
.get('/join_game', (req, res) => {
  res.render('joinGame', {gameId:''})
})
.post('/game', urlencodedParser, (req, res) => {
  res.render('game', {host:false, pseudo:req.body.pseudo, gameId:req.body.gameId})
})
.post('/create_quiz_processing', urlencodedParser, (req, res) => {
  const createQuizParsing = new CreateQuizParsing(req.body)
  createQuizParsing.saveData()
  res.redirect('/')
})
.use((req, res, next) => {
  res.status(404).send('Page introuvable !');
})

//socket.io
io.on('connection', function(socket){

  socket.on('player_in_waiting_queue', (data) => {
  	gameManager.addPlayer(data, socket)
  })

  socket.on('host_in_waiting_queue', (data) => {
    gameManager.addHost(data, socket)
  })

  socket.on('host_start_game', (data) => {
    gameManager.forceStartGame(data)
  })

  socket.on('answer_question', (data) => {
    gameManager.handleResponse(data)
    gameManager.displayPlayerAnswered(data)
  })
})

http.listen(34335, function(){
  console.log('Starting server on port: 34335')
})
