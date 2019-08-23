class ScoreDisplayer {
  constructor() {
    let participantsEl = document.getElementById('participants')
    let scoreEl = document.getElementById('scores')
  }

  displayStatTable(stats) {
    console.log(stats)
    let participants = []
    stats[0].scores.forEach((obj, idx) => participants.push(Object.keys(obj)[0]))
    console.log(participants)
    this.addParticipants()
  }

  addParticipants(participants) {
    for (let participant in participants) {
      let tr = document.createElement('tr')
      this.participantsEl.appendChild(tr)
    }
  }
}
