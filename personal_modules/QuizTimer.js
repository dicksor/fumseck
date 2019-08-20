class QuizTimer {
  constructor(maxTime) {
    this.maxTime = maxTime
    this.secondElapsed = 0
    this.startTimer()
  }

  startTimer() {
    this.interval = setInterval(() => this.tick(), 1000)
  }

  tick() {
    this.secondElapsed++
    if(this.secondElapsed >= this.maxTime) {
      // TODO : emit and next game
    }
    console.log(`second passed ${this.secondElapsed}`)
  }

  reset() {
    clearInterval(this.interval)
    this.secondElapsed = 0
    this.startTimer()
  }
}

module.exports = QuizTimer
