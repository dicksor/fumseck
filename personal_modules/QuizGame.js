const QuizTimer = require('./QuizTimer')
const QuizReader = require('./QuizReader')

class QuizGame {
  constructor(gameId, res) {
    this.gameId = gameId
    this.res = res
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
    // TODO : remove question from set
    this.res.render('in_game', { question: question, propositions: propositions })
    this.quizTimer = new QuizTimer()
  }

  getRandomQuestionIdx(allQuestions) {
    return Math.floor(Math.random() * allQuestions.length)
  }
}

module.exports = QuizGame
