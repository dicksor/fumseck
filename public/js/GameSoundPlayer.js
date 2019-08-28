class GameSoundPlayer {
  constructor() {
    this.audClockTicking = document.getElementById('audClockTicking')
    this.audGangeJingle = document.getElementById('audGangeJingle')
    this.audMouseClick = document.getElementById('audMouseClick')
  }

  playTick() {
    this.audClockTicking.addEventListener('ended', () => {
      this.audClockTicking.play()
    }, false)
    this.audClockTicking.play()
  }

  stopTick() {
    this.audClockTicking.pause()
  }

  playJingle() {
    this.audGangeJingle.addEventListener('ended', () => {
      this.audGangeJingle.play()
    }, false)
    this.audGangeJingle.play()
  }

  playReponseClicked() {
    this.audMouseClick
  }
}
