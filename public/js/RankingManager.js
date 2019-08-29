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

  displayRanking(participants){
    for(let i = 0; i < participants.length; i++) {
      if(i < 3){
        this.rankedPlayer.innerHTML += '<tr><td valign="middle" align="center">'+ this.rankingImg[i] +'</td><td valign="middle"><h'+ (i+2) + '>' + participants[i] +'</h'+ (i+2) +'></td></tr>'
      } else {
        break;
      }
    }
  }

  displayRankingTimer(sortedParticipants){
    this.displayRanking(sortedParticipants)
    let time = 10
    let rankingTimer = setInterval(() =>{
      time--
      if(time == 0){
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
