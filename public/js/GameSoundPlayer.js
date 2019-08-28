class GameSoundPlayer {
  constructor() {
    this.audClockTicking = document.getElementById('audClockTicking')
  }

  playTick() {
    this.audClockTicking.addEventListener('ended', () => {
      this.audClockTicking.play()
    }, false)
    this.audClockTicking.play()
  }

  stopTick() {
    console.log('stop tick')
    this.audClockTicking.pause()
  }
}
