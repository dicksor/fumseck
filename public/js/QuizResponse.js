class QuizResponse {

  constructor(socket, gameId) {
    this.socket = socket
    this.gameId = gameId
    this.jokerButton = document.getElementById('joker')
  }

  setPseudo(pseudo) {
    this.pseudo = pseudo
  }

  resetCards() {
    this.jokerButton.style.display = 'block'

    for(let i = 0; i < 4; i++) {
      document.getElementById(i).classList.remove('uk-card-primary')
      document.getElementById(i).classList.add('uk-card-hover')
      document.getElementById("" + i + i).style.cursor = 'pointer'
      document.getElementById("" + i + i).onclick = () => {
        this.sendResponse(i)
      }
    }
  }

  sendResponse(rep) {
    document.getElementById(rep).classList.add('uk-card-primary')

    if(!this.jokerButton.disabled) {
      this.jokerButton.style.display = 'none'
    }

    for(let i = 0; i < 4; i++) {
      document.getElementById("" + i + i).onclick = null
      document.getElementById(i).classList.remove('uk-card-hover')
      document.getElementById("" + i + i).style.cursor = 'default'
    }

    let audio = document.getElementById('audio');
    audio.play();

    this.socket.emit('answer_question', { pseudo: this.pseudo, gameId: this.gameId, response: rep })
  }
}
