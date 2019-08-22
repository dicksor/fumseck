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

  socket.on('tick', (data) => {
    countdownNumberEl.textContent = data.countdown
  })

  let countdownSvgEl = document.getElementById('timer-svg')

  socket.on('sync', (data) => {
    countdownNumberEl.textContent = data.countdown
    countdownSvgEl.style.animation = 'animation: countdown' + data.countdown + 's linear infinite forwards';
  })
  //Waiting queue
  let pseudo = document.getElementById('pseudo')
  let gameId = document.getElementById('gameId')

  if(pseudo){
    socket.emit('player_in_waiting_queue', {pseudo:pseudo.value,  gameId:gameId.value})
  } else {
    socket.emit('host_in_waiting_queue', {gameId:gameId.value})
  }


  socket.on('player_connected', (data) => {
    let divNewPlayer = document.getElementById('newPlayer')
    divNewPlayer.innerHTML = ''
    data.arrayPlayer.forEach((pseudo) => {
      divNewPlayer.innerHTML += "<p>" + pseudo + "</p>"
    })

    socket.on('game_is_ready', () => {
      document.getElementById('waitingQueue').style.display = 'none'
      document.getElementById('inGame').style.display = 'block'
    })

    //redirect user if a error with the room occur
    socket.on('room_error', () => {
      window.location.href = 'http://127.0.0.1/:34335'
    })
  })

  // envoie réponse

  function sendRep() {

  }

})
