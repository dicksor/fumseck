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

  let waitingQueueEl = document.getElementById('waitingQueue')
  let inGameEl = document.getElementById('inGame')
  let rankingEl = document.getElementById('ranking')

  let transitionEl = document.getElementById('transition')

  let pseudo = document.getElementById('pseudo')
  let gameId = document.getElementById('gameId')

  let scoreDisplayer = new ScoreDisplayer()
  let quizResponse = new QuizResponse(socket, gameId.value)

  //display player answered
  let quizLivePlayerAnswered = new QuizLivePlayerAnswered(socket)
  quizLivePlayerAnswered.listenPlayerAnswered()

  if(pseudo){
    quizResponse.setPseudo(pseudo.value)
  }

  socket.on('next_question', (data) => {
    //clean player answered info
    quizLivePlayerAnswered.cleanScreen()

    questionDisplayer.displayNext(data.question)
    gameAnimation.addQuestionAnimation()
    quizResponse.resetCards()
  })

  socket.on('tick', (data) => {
    gameAnimation.onTick(data.countdown)
  })

  socket.on('sync', (data) => {
    inGameEl.style.display = 'block'
    transitionEl.style.display = 'none'
    gameAnimation.onSync(data.countdown)
  })

  //Waiting queue
  let waitingQueueManager = new WaitingQueueManager(pseudo, gameId, socket)
  waitingQueueManager.emitClientInfo()
  waitingQueueManager.listenConnectedPlayer()
  waitingQueueManager.listenWaitingQueueTimer()
  waitingQueueManager.roomError()

  let rankingManager = new RankingManager(rankingEl)

  socket.on('game_is_ready', () => {
    waitingQueueEl .style.display = 'none'
    inGameEl.style.display = 'block'
  })

  socket.on('break_transition', () => {
    inGameEl.style.display = 'none'
    transitionEl.style.display = 'block'
  })

  socket.on('game_is_over', (data) => {
    let stats = data.stats
    inGameEl.style.display = 'none'
    rankingEl.style.display = 'block'
    if(stats !== null) {
      scoreDisplayer.displayStatTable(stats)
      rankingManager.displayRankingTimer(scoreDisplayer.getParticpants(stats[0].scores))
    }
  })
})
