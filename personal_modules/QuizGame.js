/**
 * Authors : Romain Capocasale, Vincent Moulin and Jonas Freiburghaus
 * Date : August and September 2019
 * Projet name : Fumseck
 * Class : INF2dlm-A
 * Course : Project P2, Summer HES
 */

const QuizTimer = require('./QuizTimer')
const QuizReader = require('./QuizReader')
const util = require('./util')
const QuizStat = require('./QuizStat')
const EnigmaManager = require('./EnigmaManager')

/**
 * [QuizGame Class that coordinates one game]
 */
class QuizGame {
  constructor(gameId, nbQuestion, theme, responseTime) {
    this.gameId = gameId
    this.isRoomOpen = true
    this.playerSockets = []
    this.responseTime = responseTime
    this.hostSocket = new Object()
    this.nbQuestion = nbQuestion
    this.theme = theme
    this.quizTimer = new QuizTimer(this.responseTime,
                                   () => this.onTimeOver(),
                                   (countdown) => this.onTick(countdown))
    this.count = 1
    this.breakTime = 5000
    this.quizStat = new QuizStat()
    this.playerAnsweredQuestion = []

    this.propositions = []
    this.responseIdx = 0

    this.enigmaManager = new EnigmaManager()
  }

  /**
   * [addPlayer Appends a socket to the list of all player's socket]
   * @param {[type]} socket [socket.io : socket]
   */
  addPlayer(socket) {
    this.playerSockets.push(socket)
  }

  /**
   * [addHost Set the host's socket]
   * @param {[type]} socket [socket.io : socket]
   */
  addHost(socket) {
    this.hostSocket = socket
  }

  /**
   * [startQuiz Reads the quiz file, signals game start, renders next question]
   */
  startQuiz() {
    let quiz = new QuizReader()
    quiz.readQuiz(this.theme).then((quizData) => {
      this.quizData = util.flatten(Object.values(quizData.quizz))
      this.broadcastToAll('start_game')
      setTimeout(() => this.renderNextQuestion(), 7000)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  /**
   * [broadCastToAllPlayer Send a message through socket to all players]
   * @param  {[type]} channel     [description]
   * @param  {[type]} [data=null] [description]
   * @return {[type]}             [description]
   */
  broadCastToAllPlayer(channel, data = null) {
    for (let socket of this.playerSockets) {
      socket.emit(channel, data)
    }
  }

  emitToHost(channel, data = null) {
    this.hostSocket.emit(channel, data)
  }

  broadcastToAll(channel, data = null){
    this.broadCastToAllPlayer(channel, data)
    this.emitToHost(channel, data)
  }

  /**
   * [renderNextQuestion Parses a random question and sends it]
   */
  renderNextQuestion() {
    let rndQuestionIdx = this.getRandomQuestionIdx(this.quizData)
    let question = this.quizData[rndQuestionIdx].question
    this.propositions = this.quizData[rndQuestionIdx].propositions
    let response = this.quizData[rndQuestionIdx].reponse
    this.responseIdx = this.propositions.indexOf(response)
    let data = { question: question, propositions: this.propositions}

    this.quizStat.addQuestionAnswer(question, this.responseIdx)

    this.quizData.splice(rndQuestionIdx, 1)

    this.quizTimer.sync()
    this.sync(this.responseTime)

    this.playerAnsweredQuestion = []

    this.broadcastToAll('next_question', { question: data, count: this.count, nbQuestion: this.nbQuestion })
    this.count++

    this.quizTimer.startTimer()
  }

  renderNextEnigma() {
    let rndAnecdoteIdx = this.getRandomQuestionIdx(this.quizData)
    let anecdote = this.quizData[rndAnecdoteIdx].anecdote
    let cleanAnectdote = this.enigmaManager.cleanAnectdoteProcessing(anecdote)
    let cutAnecdote = this.enigmaManager.cutAnecdoteProcessing(cleanAnectdote)

    this.propositions = ['test1', 'test2', 'test3']//méthode de jonas

    this.responseIdx = util.getRandomNumber(0,4)
    this.propositions.splice(this.responseIdx, 0, cutAnecdote['correctWord'])

    let question = anecdote.replace(cutAnecdote['correctWord'], '_______')
    let data = { question: question, propositions: this.propositions}

    this.quizStat.addQuestionAnswer(question, this.responseIdx)

    this.quizData.splice(rndAnecdoteIdx, 1)

    this.quizTimer.sync()
    this.sync(this.responseTime)

    this.playerAnsweredQuestion = []

    this.broadcastToAll('next_question', { question: data, count: this.count })
    this.count++

    this.quizTimer.startTimer()
  }

  getRemovedPropositions() {
    let propositionsIndex = Object.keys(this.propositions)
    propositionsIndex.splice(this.responseIdx, 1)//remove the reponse

    propositionsIndex.splice(util.getRandomNumber(0,2), 1)

    return propositionsIndex
  }

/**
 * [transitionToBreak Notify a transition between questions]
 */
  transitionToBreak() {
    this.broadcastToAll('break_transition')

    let isPersonalQuiz = this.theme.includes('fum')
    setTimeout(() => {
      let rdnNumber = util.getRandomNumber(0,3)

      if(!isPersonalQuiz && rdnNumber == 3){
        this.renderNextEnigma()
      } else {
        this.renderNextQuestion()
      }

    }, this.breakTime)
  }

  getRandomQuestionIdx(allQuestions) {
    return Math.floor(Math.random() * allQuestions.length)
  }

  /**
   * [onTimeOver When a question's time is over]
   */
  onTimeOver() {
    if(this.count <= this.nbQuestion && this.quizData.length > 0) {
      this.quizStat.nextQuestion()
      this.transitionToBreak()
    } else {
      let stats = this.quizStat.getStatisitiques()
      this.emitToHost('game_is_over', { stats: stats })
      this.broadCastToAllPlayer('game_is_over', { stats: null })
      setTimeout(() => { delete this }, 1000)
    }
  }

  /**
   * [onTick On timer's tick (each seconds)]
   * @param  {[type]} countdown [The actual countdown value]
   */
  onTick(countdown) {
    this.broadcastToAll('tick', {countdown: countdown})
  }

  /**
   * [sync Synchronize the clients and the server before a question]
   * @param  {[type]} countdown [description]
   * @return {[type]}           [description]
   */
  sync(countdown) {
    this.broadcastToAll('sync', {countdown: countdown})
  }
}

module.exports = QuizGame
