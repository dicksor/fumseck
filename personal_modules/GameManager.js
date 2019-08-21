const QuizGame = require('./QuizGame')

class GameManager {
  constructor() {
    this.runningGames = {}
  }

  createGame(gameId, nbPlayer, theme, res) {
    if (gameId in this.runningGames) {
      // TODO : show error or redirect
    } else {
      this.runningGames[gameId]['quiz'] = new QuizGame(gameId, res)
      this.runningGames[gameId]['nbPlayer'] = nbPlayer
      this.runningGames[gameId]['players'] = []
    }
  }

  onGameOver() {
    // TODO : remove from dictionary
  }

  generateGameId(length = 6){
    let gameId = '';
    do {
       gameId = idgen(length)
    }while(this.arrayGameId.includes(gameId))

    return gameId;
  }
}

module.exports = GameManager
