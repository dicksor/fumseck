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


    for(let i = 0; i < 4; i++) {
      if(data.count > 0) {
        document.getElementById(i).classList.remove('uk-card-primary')
        document.getElementById(i).classList.add('uk-card-hover')
        document.getElementById("" + i + i).style.cursor = 'pointer';
      }

      document.getElementById("" + i + i).addEventListener('click', function() {
          sendResponse(i)
      });
    }

    questionManager.displayNext(data.question)
    gameAnimation.addQuestionAnimation()

  })

  socket.on('tick', (data) => {
    gameAnimation.onTick(data.countdown)
  })

  socket.on('sync', (data) => {
    gameAnimation.onSync(data.countdown)
  })

  socket.on('player_connected', (data) => {
    let divNewPlayer = document.getElementById('newPlayer')
    divNewPlayer.innerHTML = ''
    data.arrayPlayer.forEach((pseudo) => {
      divNewPlayer.innerHTML += "<p>" + pseudo + "</p>"
    })
  })

  socket.on('game_is_ready', () => {
    document.getElementById('waitingQueue').style.display = 'none'
    document.getElementById('inGame').style.display = 'block'
  })

  let pseudo = document.getElementById('pseudo')

  if(pseudo){
    socket.emit('waiting_queue', { pseudo: pseudo.textContent, gameId: document.getElementById('gameId').textContent })
  }

})

// Send rep from the user
function sendResponse(rep) {
  document.getElementById(rep).classList.add('uk-card-primary')

  for(let i = 0; i < 4; i++) {
    document.getElementById(i).classList.remove('uk-card-hover')
    document.getElementById("" + i + i).style.cursor = 'default';
    document.getElementById("" + i + i).removeEventListener('click', sendResponse(i));
  }
}
