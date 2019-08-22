const QuizTimer = require('./QuizTimer')
const QuizReader = require('./QuizReader')

class QuizGame {
  constructor(gameId, nbQuestion, theme) {
    this.gameId = gameId
    this.nbQuestion = nbQuestion
    this.theme = theme
    this.sockets = []
    this.quizTimer = new QuizTimer(10,
                                   () => this.onTimeOver(),
                                   (countdown) => this.onTick(countdown),
                                   (countdown) => this.onSync(countdown))
    this.count = 0
    this.sync(10)
  }

  addPlayer(socket) {
    this.sockets.push(socket)
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
    for (let socket of this.sockets) {
      socket.emit(channel, data)
    }
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
    this.count++

    this.quizTimer.startTimer()
  }

  getRandomQuestionIdx(allQuestions) {
    return Math.floor(Math.random() * allQuestions.length)
  }

  onTimeOver() {
    // TODO: stop after n questions
    if(this.cout <= this.nbQuestion) {
      this.renderNextQuestion()
    } else {
      // TODO : send game stat
      this.broadCastToAllPlayer('endGame')
    }
  }

  onTick(countdown) {
    this.broadCastToAllPlayer('tick', { countdown: countdown })
  }

  sync(countdown) {
    this.broadCastToAllPlayer('sync', { countdown: countdown })
  }
}

module.exports = QuizGame
