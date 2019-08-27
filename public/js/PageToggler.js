class PageToggler {
  constructor() {
    this.startQuiz = document.getElementById('startQuiz')
    this.transitionEl = document.getElementById('transition')
    this.inGameEl = document.getElementById('inGame')
    this.endGameEl = document.getElementById('endGame')
    this.waitingQueueEl = document.getElementById('waitingQueue')
  }

  toggleQueue() {
    this.waitingQueueEl.style.display = 'none'
  }

  toggleBreak() {
    this.inGameEl.style.display = 'none'
    this.transitionEl.style.display = 'block'
  }

  togglePlay() {
    this.inGameEl.style.display = 'block'
    this.transitionEl.style.display = 'none'
    this.startQuiz.style.display = 'none'
  }

  toggleStartGame() {
    this.waitingQueueEl.style.display = 'none'
    this.startQuiz.style.display = 'block'
  }

  toggleEndGame() {
    this.inGameEl.style.display = 'none'
    this.endGameEl.style.display = 'block'
  }
}
