const QuizGame = require('./QuizGame')
const idgen = require('idgen')

class GameManager {
  constructor() {
    this.runningGames = {}
  }

  joinGame(gameId, theme, nbPlayer, socket=null) {
    if (this.gameIdExist()) {

    } else {
      //création de la partie
      this.runningGames[gameId] = new QuizGame(gameId) //passer le theme et le nombre de joueur en plus
    }
  }

  onGameOver() {
    // TODO : remove from dictionary
  }

  gameIdExist(gameId){
    return (gameId in this.runningGames)
  }

  generateGameId(length = 6){
    let gameId = '';
    do {
       gameId = idgen(length)
    }while(this.gameIdExist())

    return gameId;
  }
}

module.exports = GameManager
