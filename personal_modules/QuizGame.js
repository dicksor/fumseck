const QuizTimer = require('./QuizTimer')
const QuizReader = require('./QuizReader')

class QuizGame {
  constructor(gameId) {
    this.gameId = gameId
    this.sockets = []
    this.quizTimer = new QuizTimer(10,
                                   () => this.onTimeOver(),
                                   (countdown) => this.onTick(countdown),
                                   (countdown) => this.onSync(countdown))
    this.startQuiz()
  }

  addPlayer(socket) {
    this.sockets.push(socket)
  }

  startQuiz() {
    let quiz = new QuizReader('oqdb_breaking_bad.json')
    quiz.readQuiz().then((quizData) => {
      this.quizData = quizData
      console.log(quizData);
      this.renderNextQuestion()
    })
    .catch((err) => {
      console.log(err)
    })
  }

  broadCastToAllPlayer(channel, data=null) {
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

    this.broadCastToAllPlayer('next_question', { question: data })

    this.quizTimer.sync()
    this.quizTimer.startTimer()
  }

  getRandomQuestionIdx(allQuestions) {
    return Math.floor(Math.random() * allQuestions.length)
  }

  onTimeOver() {
    // TODO: stop after n questions
    this.renderNextQuestion()
  }

  onTick(countdown) {
    this.broadCastToAllPlayer('tick', { countdown: countdown })
  }

  onSync(countdown) {
    this.broadCastToAllPlayer('sync', { countdown: countdown })
  }
}

module.exports = QuizGame
