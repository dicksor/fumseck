class WaitingQueueTimer {
  constructor(time, quizGame){
    this.time = time
    this.quizGame = quizGame
  }

  tick(){
    this.timer = setInterval(() => {
      if(this.time == 0){
        if(this.quizGame.playerSockets.length === 0) {
          this.quizGame.emitToHost('room_error')
        } else {
          this.quizGame.isRoomOpen = false
          this.quizGame.startQuiz()
          this.quizGame.broadcastToAll('game_is_ready')
        }
        this.stop()
      } else {
          this.quizGame.emitToHost('timer_waiting_queue', { time: this.time})
          this.time--
      }
    }, 1000)
  }

  stop(){
    clearInterval(this.timer)
  }
}



module.exports = WaitingQueueTimer
