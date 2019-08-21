const QuizGame = require('./QuizGame')

class GameManager {
  constructor() {
    this.runningGames = {}
  }

  createGame(data, socket) {
    console.log(data.username)
    if (data.gameId in this.runningGames) {
      // Si salle pleine ciao
      // Si salle en attente
      // TODO : show error or redirect
    } else {
      this.runningGames[data.gameId] = new QuizGame(data.gameId, socket)
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
