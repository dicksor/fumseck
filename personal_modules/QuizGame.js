const QuizTimer = require('./QuizTimer')
const QuizReader = require('./QuizReader')
const flatten = require('./util')
const QuizStat = require('./QuizStat')

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
                                   (countdown) => this.onTick(countdown),
                                   (countdown) => this.onSync(countdown))
    this.count = 0
    this.breakTime = 5000
    this.quizStat = new QuizStat()
    this.playerAnsweredQuestion = []
  }

  addPlayer(socket) {
    this.playerSockets.push(socket)
  }

  addHost(socket) {
    this.hostSocket = socket
  }

  startQuiz() {
    let quiz = new QuizReader()
    quiz.readQuiz(this.theme).then((quizData) => {
      this.quizData = flatten(Object.values(quizData.quizz))
      this.broadcastToAll('start_game')
      setTimeout(() => this.renderNextQuestion(), 7000)
    })
    .catch((err) => {
      console.log(err)
    })
  }

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

    this.broadcastToAll('next_question', { question: data, count: this.count })
    this.count++

    this.quizTimer.startTimer()
  }

  transitionToBreak() {
    this.broadcastToAll('break_transition')
    setTimeout(() => this.renderNextQuestion(), this.breakTime)
  }

  getRandomQuestionIdx(allQuestions) {
    return Math.floor(Math.random() * allQuestions.length)
  }

  onTimeOver() {
    if(this.count < this.nbQuestion && this.quizData.length > 0) {
      this.quizStat.nextQuestion()
      this.transitionToBreak()
    } else {
      let stats = this.quizStat.getStatisitiques()
      this.emitToHost('game_is_over', { stats: stats })
      this.broadCastToAllPlayer('game_is_over', { stats: null })
      setTimeout(() => { delete this }, 1000)
    }
  }

  onTick(countdown) {
    this.broadcastToAll('tick', {countdown: countdown})
  }

  sync(countdown) {
    this.broadcastToAll('sync', {countdown: countdown})
  }
}

module.exports = QuizGame
