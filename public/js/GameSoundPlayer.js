/**
 * [GameSoundPlayer Plays sounds effect in game]
 */
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

  decreaseJingleVolume() {
    let vol = this.audGangeJingle.volume
    let interval = 200

    let fadeout = setInterval(() => {
      if (vol > 0.2) {
        vol -= 0.05
        this.audGangeJingle.volume = vol
      }
      else {
        clearInterval(fadeout)
      }
    }, interval)
  }

  increaseJingleVolume() {
    this.audGangeJingle.volume = 1
  }

  playReponseClicked() {
    this.audMouseClick
  }
}
