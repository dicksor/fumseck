class QuestionDisplayer {
  constructor() {
    this.questionEl = document.getElementById("question")
    this.responseAEl = document.getElementById("responseA")
    this.responseBEl = document.getElementById("responseB")
    this.responseCEl = document.getElementById("responseC")
    this.responseDEl = document.getElementById("responseD")
  }

  displayNext(question) {
    //display all the question after user use joker
    for(let i = 0; i <= 3; i++){
      let elem = document.getElementById(i)
      elem.classList.remove('animated', 'bounceOutUp')
      elem.style.display = 'block'
    }

    this.questionEl.innerHTML = question.question
    this.responseAEl.innerHTML = question.propositions[0]
    this.responseBEl.innerHTML = question.propositions[1]
    this.responseCEl.innerHTML = question.propositions[2]
    this.responseDEl.innerHTML = question.propositions[3]
  }
}
