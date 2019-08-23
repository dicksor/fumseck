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

  let endGameEl = document.getElementById('endGame')
  let waitingQueueEl = document.getElementById('waitingQueue')
  let inGameEl = document.getElementById('inGame')

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

  //Waiting queue
  let pseudo = document.getElementById('pseudo')
  let gameId = document.getElementById('gameId')

  let waitingQueueManager = new WaitingQueueManager(pseudo, gameId, socket)
  waitingQueueManager.emitClientInfo()
  waitingQueueManager.listenConnectedPlayer()
  waitingQueueManager.listenWaitingQueueTimer()
  waitingQueueManager.roomError()

  socket.on('game_is_over', () => {
    inGameEl.style.display = 'none'
    endGameEl.style.display = 'block'
  })

  socket.on('game_is_ready', () => {
    console.log('test');
    waitingQueueEl .style.display = 'none'
    inGameEl.style.display = 'block'
  })
})

// Send rep from the user
function sendResponse(rep) {
  document.getElementById(rep).classList.add('uk-card-primary')

  for(let i = 0; i < 4; i++) {
    document.getElementById("" + i + i).onclick = null
    document.getElementById(i).classList.remove('uk-card-hover')
    document.getElementById("" + i + i).style.cursor = 'default'
  }
  //socket.emit('answer_question', { pseudo: pseudo.textContent, gameId: document.getElementById('gameId').textContent, response: rep })
}
