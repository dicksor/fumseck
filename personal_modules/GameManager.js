const QuizGame = require('./QuizGame')
const idgen = require('idgen')

class GameManager {
  constructor() {
    this.runningGames = [] //all game info are stored in this array
  }

  createGame(gameId, theme, nbPlayer) {
      //creation of the game
      this.runningGames[gameId] = []

      this.runningGames[gameId]['quiz'] = new QuizGame(gameId) // TODO : passer le theme en plus
      this.runningGames[gameId]['nbPlayer'] = parseInt(nbPlayer)
      this.runningGames[gameId]['roomOpen'] = true//indicate if player can join the room or not
      this.runningGames[gameId]['players'] = []
  }

  onGameOver() {
    // TODO : remove from dictionary
  }

  /**
   * Return the number of place in the room
   * @param  {String} gameId id of the game
   * @return {Integer}        number of place available
   */
  getNbPlaceAvailable(gameId){
    return this.runningGames[gameId]['nbPlayer'] - this.runningGames[gameId]['players'].length
  }

  /**
   * indicate if the game id alredy exist
   * @param  {String}  gameId game id
   * @return {Boolean}        true if game id exist, false otherwise
   */
  isGameIdExist(gameId){
    return gameId in this.runningGames
  }

  /**
   * Allow to add a host
   * @param {Object} data   data from the host
   * @param {Object} socket socket of the host
   */
  addHost(data, socket){
    //if the game id doesn't exist, the user is redirected to the website index
    if(this.isGameIdExist(data.gameId)){
      if(this.runningGames[data.gameId]['roomOpen']){
          this.runningGames[data.gameId]['quiz'].addHost(socket)
      }
    } else {
      socket.emit('room_error')
    }
  }

/**
 * Allow to add user to the room, if the room is full the game is starting
 * @param {Object} data   data from the client
 * @param {Object} socket socket of the client
 */
  addPlayer(data, socket){
    //if the game id doesn't exist, the user is redirected to the website index
    if(this.isGameIdExist(data.gameId)){
      //if the room is full, the user is redirected to the website index
      if(!this.runningGames[data.gameId]['roomOpen']){
        console.log('room is close')
        socket.emit('room_error')
      } else {
        //we add the user in the game, and send the user connection to all user and the host
        console.log('player added');
        this.runningGames[data.gameId]['quiz'].addPlayer(socket)
        this.runningGames[data.gameId]['players'].push(data.pseudo)

        this.runningGames[data.gameId]['quiz'].broadCastToAllPlayer('player_connected', {arrayPlayer: this.runningGames[data.gameId]['players']})
        this.runningGames[data.gameId]['quiz'].emitToHost('player_connected', {arrayPlayer: this.runningGames[data.gameId]['players']})

        //if after player adding, the room is full, the game is started
        if(this.getNbPlaceAvailable(data.gameId) == 0){
          console.log('game_is_ready');
          this.runningGames[data.gameId]['roomOpen'] = false
          this.runningGames[data.gameId]['quiz'].startQuiz()
          this.runningGames[data.gameId]['quiz'].broadCastToAllPlayer('game_is_ready')
          this.runningGames[data.gameId]['quiz'].emitToHost('game_is_ready')
        }
      }
    } else {
      socket.emit('room_error')
    }
  }

  /**
   * generate a game id for a game, check also if the id is alredy use
   * @param  {Integer} [length=6] length of the id generate
   * @return {Integer}            game id
   */
  generateGameId(length = 6){
    let gameId = '';
    do {
       gameId = idgen(length)
    } while(this.isGameIdExist(gameId))

    return gameId;
  }
}

module.exports = GameManager
