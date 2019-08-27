class GameAnimation {
  constructor() {
    this.cardsEls = document.getElementsByClassName('uk-card')
    this.countdownNumberEl = document.getElementById('countdown-number')
    this.countdownSvgCircleEl = document.getElementById('timer-svg--circle')
    this.countdownEl = document.getElementById('countdown')
    this.transitionWaitEl = document.getElementById('transition-wait')
    this.m16El = document.getElementById('m16')
    this.waitText = "Préparez vous pour la prochaine question"
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

  onTick(count) {
    this.countdownNumberEl.textContent = count
    if(count <= 5) {
      this.addStressMotion()
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

  removeNodesChild(node) {
    while(node.firstChild) {
      node.removeChild(node.firstChild)
    }
  }

  addWaitMotion() {
    let spanTextWrapper = document.createElement('span')
    spanTextWrapper.id = 'text-wrapper'
    spanTextWrapper.classList.add('text-wrapper')
    let span = document.createElement('span')
    span.classList.add('letters')
    span.textContent = this.waitText
    spanTextWrapper.appendChild(span)
    spanTextWrapper.innerHTML = spanTextWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>")
    this.m16El.appendChild(spanTextWrapper)

    let waitAnimation = anime.timeline({loop: false, autoplay: false})

    waitAnimation.add({
      targets: '.ml6 .letter',
      translateY: ["1.1em", 0],
      translateZ: 0,
      duration: 750,
      delay: (el, i) => 50 * i
    }).add({
      targets: '.ml6',
      opacity: [1, 0],
      duration: 1000,
      easing: "easeOutExpo",
      delay: 1000
    })

    waitAnimation.play()

    setTimeout(() => this.removeNodesChild(this.m16El), 5000)
    this.m16El.style.opacity = 1
  }

}
