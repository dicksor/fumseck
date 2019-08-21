class Games{
  constructor(){
    this.gameId = {}
  }

  generate(length = 6){
    let gameId = '';
    do {
       gameId = idgen(length)
    }while(this.arrayGameId.includes(gameId))
    this.arrayGameId.push(gameId)

    return gameId;
  }
}

module.exports = Games
