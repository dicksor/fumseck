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
