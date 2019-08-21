const QuizGame = require('./QuizGame')
const idgen = require('idgen')

class GameManager {
  constructor() {
    this.runningGames = []
  }

  createGame(gameId, theme, nbPlayer) {
    if (this.gameIdExist()) {

    } else {
      //création de la partie
      this.runningGames[gameId] = {}

      this.runningGames[gameId]['quizz'] = new QuizGame(gameId) //passer le theme et le nombre de joueur en plus
      this.runningGames[gameId]['nbPlayer'] = nbPlayer
      this.runningGames[gameId]['players'] = []
    }
  }

  onGameOver() {
    // TODO : remove from dictionary
  }

  isRoomFull(gameId){
    return this.runningGames[gameId]['players'].length - 1 === this.runningGames[gameId]['nbPlayer']
  }

  addPlayer(pseudo, gameId, socket){
        if(this.isRoomFull(gameId)){
          this.runningGames[gameId]['quiz'].startQuiz()
          this.runningGames[gameId]['quiz'].broadCastToAllPlayer('game_is_ready')
        } else {
          this.runningGames[gameId]['quiz'].broadCastToAllPlayer('player_connected', {arrayPlayer: this.runningGames[gameId]['players']})
          this.runningGames[gameId]['players'].push(pseudo)
          this.runningGames[gameId]['quiz'].addPlayer(socket)
        }
  }

  test() {
    this.runningGames['1234'] = new Array(3)
    this.runningGames['1234']['quizz'] =123
    this.runningGames['1234']['players'] = []
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
