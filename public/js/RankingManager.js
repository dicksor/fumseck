class RankingManager {
  constructor(pageToggler) {
    this.pageToggler = pageToggler

    this.rankedPlayer = document.getElementById('rankedPlayer')
    this.rankingTimer = document.getElementById('rankingTimer')

    this.rankingImg = []
    this.rankingImg[0] = '<img src="img/goldCup.png" id="goldCup">'
    this.rankingImg[1] = '<img src="img/silverCup.png" id="silverCup">'
    this.rankingImg[2] = '<img src="img/bronzCup.png" id="bronzCup">'
  }

  getSortedParticipantsWithScores(participants, scores) {
    let array = []

    for(let i = 0; i < participants.length; i++) {
      array.push([participants[i], scores[i]])
    }

   array.sort((a,b) => {
      a = a[1]
      b = b[1]
      return a > b ? -1 : (a < b ? 1 : 0)
    })

    return Object.values(array)
  }

  displayRanking(participants, scores){
    let sortedParticipantsWithScores = this.getSortedParticipantsWithScores(participants, scores)

    for(let i = 0; i < sortedParticipantsWithScores.length; i++){
      if(i < 3) {
        this.rankedPlayer.innerHTML += '<tr><td valign="middle" align="center">'+ this.rankingImg[i] +'</td><td valign="middle"><h'+ (i+2) + '>' + sortedParticipantsWithScores[i][0] +'</h'+ (i+2) +'></td></tr>'
      } else {
        break
      }
    }
  }

  displayRankingTimer(){
    let time = 10
    let rankingTimer = setInterval(() =>{
      time--
      if(time == 0) {
        this.pageToggler.toggleEndGame()
        clearInterval(rankingTimer)
      } else {
        this.rankingTimer.innerHTML = time
      }
    }, 1000)
  }

  test(){

  }
}
