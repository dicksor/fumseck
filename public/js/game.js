document.addEventListener('DOMContentLoaded', () => {
  const socket = io()

  let questionEl = document.getElementById("question")
  let responseAEl = document.getElementById("responseA")
  let responseBEl = document.getElementById("responseB")
  let responseCEl = document.getElementById("responseC")
  let responseDEl = document.getElementById("responseD")

  let questionManager = new QuestionManager(questionEl,
                                            responseAEl,
                                            responseBEl,
                                            responseCEl,
                                            responseDEl)

  let cardsEls = document.getElementsByClassName('uk-card')
  let countdownNumberEl = document.getElementById('countdown-number')
  let countdownSvgCircleEl = document.getElementById('timer-svg--circle')
  let countdownEl = document.getElementById('countdown')

  let gameAnimation = new GameAnimation(cardsEls,
                                        countdownNumberEl,
                                        countdownSvgCircleEl,
                                        countdownEl)

  socket.on('next_question', (data) => {
    questionManager.displayNext(data.question)
    gameAnimation.addQuestionAnimation()
  })




  socket.on('tick', (data) => {
    countdownNumberEl.textContent = data.countdown
    if (data.countdown <= 5) {
      gameAnimation.addStressMotion()
    }
  })

  socket.on('sync', (data) => {
    gameAnimation.onSync(data.countdown)
  })

  let pseudo = document.getElementById('pseudo')

  if(pseudo){
    socket.emit('waiting_queue', { pseudo:pseudo.textContent, gameId:document.getElementById('gameId').textContent })
  }

  socket.on('player_connected', (data) => {
    let divNewPlayer = document.getElementById('newPlayer')
    divNewPlayer.innerHTML = ''
    data.arrayPlayer.forEach((pseudo) => {
      divNewPlayer.innerHTML += "<p>" + pseudo + "</p>"
    })

    socket.on('game_is_ready', () => {
      document.getElementById('waiting_queue').style.display = 'none'
      document.getElementById('in_game').style.display = 'block'
    })
  })

  // envoie réponse

  function sendRep() {

  }

})
