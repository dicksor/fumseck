class QuizTimer {
  constructor(maxTime, onTimeOverCb, onTickCb) {
    this.maxTime = maxTime
    this.onTimeOverCb = onTimeOverCb
    this.onTickCb = onTickCb
    this.countdown = this.maxTime
  }

  sync() {
    this.countdown = this.maxTime
  }

  startTimer() {
    this.interval = setInterval(() => this.tick(), 1000)
  }

  tick() {
    this.countdown--
    this.onTickCb(this.countdown)
    if(this.countdown <= 0) {
      clearInterval(this.interval)
      this.onTimeOverCb()
    }
  }
}

module.exports = QuizTimer
