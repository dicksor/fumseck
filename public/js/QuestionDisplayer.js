class QuestionDisplayer {
  constructor() {
    this.questionEl = document.getElementById('question')
    this.responseAEl = document.getElementById('responseA')
    this.responseBEl = document.getElementById('responseB')
    this.responseCEl = document.getElementById('responseC')
    this.responseDEl = document.getElementById('responseD')
    this.questionsInfos = document.getElementById('questionsInfos')
  }

  displayNext(question, count, nb) {
    this.questionEl.innerHTML = question.question
    this.responseAEl.innerHTML = question.propositions[0]
    this.responseBEl.innerHTML = question.propositions[1]
    this.responseCEl.innerHTML = question.propositions[2]
    this.responseDEl.innerHTML = question.propositions[3]
    this.questionsInfos.innerHTML = 'Question ' + count + '/' + nb
  }
}
