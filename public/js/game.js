document.addEventListener('DOMContentLoaded', () => {
  const socket = io()

  let questionEl = document.getElementById("question")
  let responseAEl = document.getElementById("responseA")
  let responseBEl = document.getElementById("responseB")
  let responseCEl = document.getElementById("responseC")
  let responseDEl = document.getElementById("responseD")

  let cardsEls = document.getElementsByClassName('uk-card')

  function addQuestionAnimation() {
    for (let cardEl of cardsEls) {
      cardEl.classList.add('uk-animation-scale-up')
    }
  }

  function removeQuestionAnimation() {
    for (let cardEl of cardsEls) {
      cardEl.classList.remove('uk-animation-scale-up')
    }
  }

  socket.on('next_question', (data) => {
    let question = data.question
    questionEl.innerHTML = question.question
    responseAEl.innerHTML = question.propositions[0]
    responseBEl.innerHTML = question.propositions[1]
    responseCEl.innerHTML = question.propositions[2]
    responseDEl.innerHTML = question.propositions[3]
    addQuestionAnimation()
    setTimeout(() => removeQuestionAnimation(), 1000)
  })


  let countdownNumberEl = document.getElementById('countdown-number')
  let countdownSvgCircleEl = document.getElementById('timer-svg--circle')
  let countdownEl = document.getElementById('countdown')

  socket.on('tick', (data) => {
    countdownNumberEl.textContent = data.countdown
    if (data.countdown <= 5) {
      countdownEl.classList.add('uk-animation-shake')
      setTimeout(() => {countdownEl.classList.remove('uk-animation-shake')}, 100)
      countdownNumberEl.style.color = "#e74c3c"
      countdownSvgCircleEl.style.stroke = "#e74c3c"
    }
  })

  socket.on('sync', (data) => {
    countdownNumberEl.textContent = data.countdown
    countdownSvgCircleEl.style.animation = 'animation: countdown' + data.countdown + 's linear infinite forwards'
    countdownNumberEl.style.color = "#333"
    countdownSvgCircleEl.style.stroke = "#333"
  })

  let pseudo = document.getElementById('pseudo')

  if(pseudo){
    socket.emit('waiting_queue', {pseudo:pseudo.textContent, gameId:document.getElementById('gameId').textContent})
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
