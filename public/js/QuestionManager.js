class QuestionManager {
  constructor(questionEl, responseAEl, responseBEl, responseCEl, responseDEl) {
    this.questionEl = questionEl
    this.responseAEl = responseAEl
    this.responseBEl = responseBEl
    this.responseCEl = responseCEl
    this.responseDEl = responseDEl
  }

  displayNext(question) {
    this.questionEl.innerHTML = question.question
    this.responseAEl.innerHTML = question.propositions[0]
    this.responseBEl.innerHTML = question.propositions[1]
    this.responseCEl.innerHTML = question.propositions[2]
    this.responseDEl.innerHTML = question.propositions[3]
  }
}
