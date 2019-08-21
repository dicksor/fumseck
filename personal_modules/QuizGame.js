const QuizTimer = require('./QuizTimer')
const QuizReader = require('./QuizReader')

class QuizGame {
  constructor(gameId, socket='') {
    this.gameId = gameId
    this.socket = socket
    this.startQuiz()
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

  renderNextQuestion() {
    // TODO : get random level
    let rndQuestionIdx = this.getRandomQuestionIdx(this.quizData.quizz.expert)
    let question = this.quizData.quizz.expert[rndQuestionIdx].question
    let propositions = this.quizData.quizz.expert[rndQuestionIdx].propositions
    let data = { question: question, propositions: propositions}

    this.quizData.quizz.expert.splice(rndQuestionIdx, 1)

    this.socket.emit('next_question', { question: data })

    this.quizTimer = new QuizTimer(10, () => this.onTimeOver())
  }

  getRandomQuestionIdx(allQuestions) {
    return Math.floor(Math.random() * allQuestions.length)
  }

  onTimeOver() {
    console.log('Time over')
    this.renderNextQuestion()
  }
}

module.exports = QuizGame
