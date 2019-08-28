class ScoreDisplayer {
  constructor() {
    this.participantsEl = document.getElementById('participants')
    this.scoreEl = document.getElementById('scores')
    this.addVector = (a, b) => a.map((e,i) => e + b[i])
    this.addScore = (acc, sum) => this.addVector(acc, sum)
  }

  getParticpants(scores) {
    let participants = []
    scores.forEach((obj, idx) => participants.push(Object.keys(obj)[0]))
    return participants
  }

  displayStatTable(stats) {
    let participants = this.getParticpants(stats[0].scores)
    this.nbParticipants = participants.length
    let totalScore = []
    this.displayParticipants(participants)
    for(let stat of stats) {
      let tr = document.createElement('tr')
      let td = document.createElement('td')
      td.innerHTML = stat.question
      tr.appendChild(td)
      let playersScore = this.displayQuestionScore(stat.scores, tr)
      totalScore.push(playersScore)
      this.scoreEl.appendChild(tr)
    }
    let score = this.addTotalScore(totalScore)
    this.displayTotalScore(score)
  }

  addTotalScore(totalScore) {
    return totalScore.reduce(this.addScore)
  }

  displayTotalScore(scores) {
    let tr = document.createElement('tr')
    let td = document.createElement('td')
    td.innerHTML = 'Total score : '
    td.classList.add('score-bold')
    tr.appendChild(td)
    for (let i = 0; i < this.nbParticipants; i++) {
      let td = document.createElement('td')
      td.innerHTML = scores[i]
      td.classList.add('score-centered', 'score-bold')
      tr.appendChild(td)
    }
    this.scoreEl.appendChild(tr)
  }

  displayParticipants(participants) {
    for (let participant of participants) {
      let th = document.createElement('th')
      th.innerHTML = participant
      th.classList.add('score-centered')
      this.participantsEl.appendChild(th)
    }
  }

  displayQuestionScore(scores, tr) {
    let playersScore = []
    for(let score of scores) {
      let playerScore = Object.values(score)[0]
      let td = document.createElement('td')
      if(playerScore === false) {
        td.innerHTML = 'F'
        td.classList.add('wrong', 'score-centered')
        playersScore.push(0)
      } else {
        td.innerHTML = 'V'
        td.classList.add('correct', 'score-centered')
        playersScore.push(1)
      }
      tr.appendChild(td)
    }
    return playersScore
  }
}
