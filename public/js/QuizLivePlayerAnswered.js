class QuizLivePlayerAnswered {
  constructor(socket){
    this.socket = socket
    this.answeredPlayer = []
    this.divPlayerAnswered = document.getElementById('playerAnsweredContainer')
  }

  listenPlayerAnswered(){
    this.socket.on('display_player_answered', (data) => {

      let newPseudo = data.arrayPlayer.filter(x => !this.answeredPlayer.includes(x))[0]//get the new connected player

      this.answeredPlayer.push(newPseudo)//add new player to the local array

      let div = document.createElement('div')
      div.innerHTML = '<img href="/public/img/user.png" />'
      div.classList.add('playerAnswered')
      div.classList.add('uk-tile')
      div.classList.add('uk-tile-primary')
      div.classList.add('uk-padding-small')

      this.divPlayerAnswered.appendChild(div)
    })
  }

  cleanScreen(){
    this.answeredPlayer = []
    this.divPlayerAnswered.innerHTML = ''
  }
}
