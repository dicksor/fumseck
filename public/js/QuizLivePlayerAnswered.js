class QuizLivePlayerAnswered {
  constructor(pseudo, gameId, socket){
    this.pseudo = pseudo
    this.gameId = gameId
    this.socket = socket
  }

  emiterPlayerAnswered(){
    if(this.pseudo){
      this.socket.emit('player_live_answered', {pseudo:this.pseudo.value, gameId:this.gameId.value, socket:this.socket})
    }
  }

  listenPlayerAnswered(){
    this.socket.on('display_player_answered', (data) => {
      let leftPlayerQuestionAnswered = document.getElementById('leftPlayerQuestionAnswered')
      leftPlayerQuestionAnswered.innerHTML = ''
      data.arrayPlayer.forEach((pseudo) => {
        leftPlayerQuestionAnswered.innerHTML += '<div style="width: 300px;" class="uk-tile uk-tile-primary uk-padding-small displayPlayer"><p class="uk-h4">'+pseudo+'</p></div><br/>'
      })
    })
  }
}
