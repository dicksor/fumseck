class QuizStat {
  constructor() {
    this.players = {}
    this.currentQuestionIdx = 0
    this.correctAnswer = []
  }

  getPlayers() {
    return Object.keys(this.players)
  }

  addPlayer(pseudo) {
    this.players[pseudo] = []
  }

  addQuestionAnswer(question, answer) {
    this.correctAnswer[this.currentQuestionIdx] = { question: question, answer: answer }
  }

  addPlayersResponse(pseudo, response) {
    this.players[pseudo][this.currentQuestionIdx] = response
  }

  nextQuestion() {
    this.currentQuestionIdx++
  }

  getPlayersCorrectAnswer(questionIdx) {
    let playersScore = []
    for(let player in this.players) {
      let score = {}
      score[player] = this.players[player][questionIdx] === this.correctAnswer[questionIdx]
      playersScore.push(score)
    }
    return playersScore
  }

  getStatisitiques() {
    let stats = []
    for(let i = 0; i < this.currentQuestionIdx; i++) {
      stats.push({
        question: this.correctAnswer[i].question,
        scores: this.getPlayersCorrectAnswer(i)
      })
    }
    return stats
  }
}

module.exports = QuizStat
