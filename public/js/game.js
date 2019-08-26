document.addEventListener('DOMContentLoaded', () => {
  const socket = io()

  let questionEl = document.getElementById("question")
  let responseAEl = document.getElementById("responseA")
  let responseBEl = document.getElementById("responseB")
  let responseCEl = document.getElementById("responseC")
  let responseDEl = document.getElementById("responseD")

  let questionDisplayer = new QuestionDisplayer(questionEl,
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

  let pseudo = document.getElementById('pseudo')
  let gameId = document.getElementById('gameId')

  let scoreDisplayer = new ScoreDisplayer()
  let quizResponse = new QuizResponse(socket, gameId.value)

  if(pseudo){
    quizResponse.setPseudo(pseudo.value)
  }

  socket.on('next_question', (data) => {
    questionDisplayer.displayNext(data.question)
    gameAnimation.addQuestionAnimation()
    quizResponse.resetCards()
  })

  socket.on('tick', (data) => {
    gameAnimation.onTick(data.countdown)
  })

  socket.on('sync', (data) => {
    gameAnimation.onSync(data.countdown)
  })

  //display player answered
  let quizLivePlayerAnswered = new QuizLivePlayerAnswered(pseudo, gameId, socket)
  quizLivePlayerAnswered.emiterPlayerAnswered()
  quizLivePlayerAnswered.listenPlayerAnswered()

  //Waiting queue
  let waitingQueueManager = new WaitingQueueManager(pseudo, gameId, socket)
  waitingQueueManager.emitClientInfo()
  waitingQueueManager.listenConnectedPlayer()
  waitingQueueManager.listenWaitingQueueTimer()
  waitingQueueManager.roomError()

  socket.on('game_is_ready', () => {
    waitingQueueEl .style.display = 'none'
    inGameEl.style.display = 'block'
  })

  socket.on('game_is_over', (data) => {
    let stats = data.stats
    if(stats === null) {
      // TODO : end game screen for remote
    } else {
      inGameEl.style.display = 'none'
      endGameEl.style.display = 'block'
      scoreDisplayer.displayStatTable(stats)
    }
  })
})
