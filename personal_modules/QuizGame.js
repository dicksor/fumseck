const QuizTimer = require('./QuizTimer')
const QuizReader = require('./QuizReader')

class QuizGame {
  constructor(gameId, nbQuestion, theme) {
    this.gameId = gameId
    this.playerSockets = []
    this.hostSocket = new Object()
    this.nbQuestion = nbQuestion
    this.theme = theme
    this.sockets = []
    this.quizTimer = new QuizTimer(10,
                                   () => this.onTimeOver(),
                                   (countdown) => this.onTick(countdown),
                                   (countdown) => this.onSync(countdown))
    this.count = 0

  }

  addPlayer(socket) {
    this.playerSockets.push(socket)
  }

  addHost(socket) {
    this.hostSocket = socket
  }

  startQuiz() {
    let quiz = new QuizReader('oqdb_breaking_bad.json')
    quiz.readQuiz().then((quizData) => {
      this.quizData = quizData
      this.renderNextQuestion()
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

  emitToHost(channel, data = null){
    this.hostSocket.emit(channel, data)
  }

  renderNextQuestion() {
    // TODO : get random level
    let rndQuestionIdx = this.getRandomQuestionIdx(this.quizData.quizz.expert)
    let question = this.quizData.quizz.expert[rndQuestionIdx].question
    let propositions = this.quizData.quizz.expert[rndQuestionIdx].propositions
    let data = { question: question, propositions: propositions}

    this.quizData.quizz.expert.splice(rndQuestionIdx, 1)

    this.quizTimer.sync()
    this.sync(10)

    this.broadCastToAllPlayer('next_question', { question: data, count: this.count })
    this.emitToHost('next_question', { question: data, count: this.count })
    this.count++

    this.quizTimer.startTimer()
  }

  getRandomQuestionIdx(allQuestions) {
    return Math.floor(Math.random() * allQuestions.length)
  }

  onTimeOver() {
    if(this.count < this.nbQuestion) {
      this.renderNextQuestion()
    } else {
      this.broadCastToAllPlayer('game_is_over')
    }
  }

  onTick(countdown) {
    this.broadCastToAllPlayer('tick', {countdown: countdown})
    this.emitToHost('tick', {countdown: countdown})
  }

  sync(countdown) {
    this.emitToHost('sync', {countdown: countdown})
    this.broadCastToAllPlayer('sync', {countdown: countdown})
  }
}

module.exports = QuizGame
