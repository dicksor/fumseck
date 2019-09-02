const QuizTimer = require('./QuizTimer')
const QuizReader = require('./QuizReader')
const util = require('./util')
const QuizStat = require('./QuizStat')
const axios = require('axios')

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

  request(sentence, k = 3) {
    return axios.get('http://localhost:34334/getWordSuggestion/' + sentence + '/' + k)
      .then(response => {
        return response.data
      })
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
    let propositions = this.quizData[rndQuestionIdx].propositions
    let response = this.quizData[rndQuestionIdx].reponse
    let responseIdx = propositions.indexOf(response)
    let data = { question: question, propositions: propositions}

    this.quizStat.addQuestionAnswer(question, responseIdx)

    this.quizData.splice(rndQuestionIdx, 1)

    this.quizTimer.sync()
    this.sync(this.responseTime)

    this.playerAnsweredQuestion = []

    this.broadcastToAll('next_question', { question: data, count: this.count, nbQuestion: this.nbQuestion })
    this.count++

    this.quizTimer.startTimer()
  }

  /**
   * [transitionToBreak Notify a transition between questions]
   */
  transitionToBreak() {
    this.broadcastToAll('break_transition')
    setTimeout(() => this.renderNextQuestion(), this.breakTime)
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
