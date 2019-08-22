const QuizGame = require('./QuizGame')
const idgen = require('idgen')

class GameManager {
  constructor() {
    this.runningGames = []
  }

  createGame(gameId, reqBody) {
    let theme = reqBody.theme
    let nbPlayer = reqBody.nbPlayer
    let nbQuestion = reqBody.nbQuestion

    this.runningGames[gameId] = []

    this.runningGames[gameId]['quiz'] = new QuizGame(gameId, nbQuestion, theme) // TODO : passer le theme et le nombre de joueur en plus
    this.runningGames[gameId]['nbPlayer'] = parseInt(nbPlayer)
    this.runningGames[gameId]['roomOpen'] = true
    this.runningGames[gameId]['players'] = []
  }

  onGameOver() {
    // TODO : remove from dictionary
  }

  getNbPlaceAvailable(gameId){
    return this.runningGames[gameId]['nbPlayer'] - this.runningGames[gameId]['players'].length
  }

  addPlayer(pseudo, gameId, socket){

    console.log(this.runningGames[gameId]['quiz'].sockets);

    if(!this.runningGames[gameId]['roomOpen']){
      console.log('room is close');
      window.location = 'http://127.0.0.1/join_game'
    } else {
      console.log('player added');
      this.runningGames[gameId]['quiz'].addPlayer(socket)
      this.runningGames[gameId]['players'].push(pseudo)

      this.runningGames[gameId]['quiz'].broadCastToAllPlayer('player_connected', {arrayPlayer: this.runningGames[gameId]['players']})
      socket.emit('player_connected', {arrayPlayer: this.runningGames[gameId]['players']})

      if(this.getNbPlaceAvailable(gameId) == 0){
        console.log('game_is_ready');
        this.runningGames[gameId]['roomOpen'] = false
        this.runningGames[gameId]['quiz'].startQuiz()
        this.runningGames[gameId]['quiz'].broadCastToAllPlayer('game_is_ready')
      }
    }
  }

  gameIdExist(gameId){
    return gameId in this.runningGames
  }

  generateGameId(length = 6){
    let gameId = '';
    do {
       gameId = idgen(length)
    } while(this.gameIdExist())

    return gameId;
  }
}

module.exports = GameManager
