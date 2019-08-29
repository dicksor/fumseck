class QuizLivePlayerAnswered {
  constructor(socket) {
    this.socket = socket
    this.answeredPlayer = []
    this.divPlayerAnswered = document.getElementById('playerAnsweredContainer')
  }

  /**
   * Display players who answered to the questionon]
   */
  listenPlayerAnswered() {

    this.socket.on('display_player_answered', (data) => {

      let newPseudo = data.arrayPlayer.filter(x => !this.answeredPlayer.includes(x))[0]//get the new connected player

      this.answeredPlayer.push(newPseudo) //add new player to the local array

      if(newPseudo.length > 8) {
        newPseudo = newPseudo.slice(0,5) + '...'
      }

      let div = document.createElement('div')
      div.innerHTML = '<img src="img/user.png" class="imgPlayerAnsweredSmall"/><p class="imgUserPseudoSmall">'+ newPseudo +'</p>'
      div.classList.add('playerAnsweredSmall')
      this.divPlayerAnswered.appendChild(div)
    })
  }

  /**
   * Clean the screen for a new question
   */
  cleanScreen() {
    this.answeredPlayer = []
    this.divPlayerAnswered.innerHTML = ''
  }
}
