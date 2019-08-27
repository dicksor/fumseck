class PageToggler {
  constructor() {
    this.transitionEl = document.getElementById('transition')
    this.inGameEl = document.getElementById('inGame')
    this.endGameEl = document.getElementById('endGame')
    this.waitingQueueEl = document.getElementById('waitingQueue')
  }

  toggleQueue() {
    this.waitingQueueEl .style.display = 'none'
    this.inGameEl.style.display = 'block'
  }

  toggleBreak() {
    this.inGameEl.style.display = 'none'
    this.transitionEl.style.display = 'block'
  }

  togglePlay() {
    this.inGameEl.style.display = 'block'
    this.transitionEl.style.display = 'none'
  }

  toggleEndGame() {
    this.inGameEl.style.display = 'none'
    this.endGameEl.style.display = 'block'
  }
}
