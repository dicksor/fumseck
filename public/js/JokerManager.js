class JokerManager {
  constructor(socket, gameId, pseudo) {
    this.socket = socket
    this.gameId = gameId
    this.pseudo = pseudo
  }

  clickOnJokerButton() {
    document.getElementById('joker').addEventListener('click', (event) =>{
      event.target.disabled = true
      this.socket.emit('use_joker', {gameId:this.gameId, pseudo:this.pseudo})
    })
  }

  listenRemovedPropositions(){
    this.socket.on('remove_propositions', (data) => {
      data.removedPropositions.forEach((id) => {
        document.getElementById(id).classList.add('animated', 'flipOutY')
      })
    })
  }
}
