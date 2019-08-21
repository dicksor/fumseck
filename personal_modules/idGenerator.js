const idgen = require('idgen')

class IdGenerator{
  constructor(){
    this.arrayGameId = [];
  }

  generate(length = 6){
    let gameId = '';
    do {
       gameId = idgen(length)
    }while(this.arrayGameId.includes(gameId))

    return gameId;
  }
}

module.exports = IdGenerator
