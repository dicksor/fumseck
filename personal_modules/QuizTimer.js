class QuizTimer {
  constructor(maxTime, onTimeOverCb) {
    this.maxTime = maxTime
    this.onTimeOverCb = onTimeOverCb
    this.secondElapsed = 0
    this.startTimer()
  }

  startTimer() {
    this.interval = setInterval(() => this.tick(), 1000)
  }

  tick() {
    this.secondElapsed++
    if(this.secondElapsed >= this.maxTime) {
      this.stop()
      this.onTimeOverCb()
    }
  }

  reset() {
    this.secondElapsed = 0
    this.startTimer()
  }

  stop() {
    clearInterval(this.interval)
  }
}

module.exports = QuizTimer
