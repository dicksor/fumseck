class GameAnimation {
  constructor(cardsEls, countdownNumberEl, countdownSvgCircleEl, countdownEl) {
    this.cardsEls = cardsEls
    this.countdownNumberEl = countdownNumberEl
    this.countdownSvgCircleEl = countdownSvgCircleEl
    this.countdownEl = countdownEl
  }

  addQuestionAnimation() {
    for (let cardEl of this.cardsEls) {
      cardEl.classList.add('uk-animation-scale-up')
    }
    setTimeout(() => this.removeQuestionAnimation(), 500)
  }

  removeQuestionAnimation() {
    for (let cardEl of this.cardsEls) {
      cardEl.classList.remove('uk-animation-scale-up')
    }
  }

  addStressMotion() {
    this.countdownEl.classList.add('uk-animation-shake')
    setTimeout(() => { this.countdownEl.classList.remove('uk-animation-shake') }, 100)
    this.countdownNumberEl.style.color = "#e74c3c"
    this.countdownSvgCircleEl.style.stroke = "#e74c3c"
  }

  onSync(countdown) {
    this.countdownNumberEl.textContent = countdown
    this.countdownSvgCircleEl.style.animation = 'animation: countdown' + countdown + 's linear infinite forwards'
    this.countdownNumberEl.style.color = "#333"
    this.countdownSvgCircleEl.style.stroke = "#333"
  }

}
