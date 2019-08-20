const QuizGame = require('./QuizGame')

class GameManager {
  constructor() {
    this.runningGames = {}
  }

  createGame(gameId, res) {
    if (gameId in this.runningGames) {
      // TODO : show error or redirect
    } else {
      this.runningGames[gameId] = new QuizGame(gameId, res)
    }
  }

  onGameOver() {
    // TODO : remove from dictionary
  }
}

module.exports = GameManager
