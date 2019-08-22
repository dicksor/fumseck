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

    if(data.count > 0) {
        for(let i = 0; i < 4; i++) {
            document.getElementById(i).classList.remove('uk-card-primary')
            document.getElementById(i).classList.add('uk-card-hover')
            document.getElementById("" + i + i).style.cursor = 'pointer';
            document.getElementById("" + i + i).onclick = function() {
                sendResponse(i)
            };
        }
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

    /*socket.on('game_is_ready_for_host', () =>{

    })*/

    //redirect user if a error with the room occur
    socket.on('room_error', () => {
      window.location.href = 'http://127.0.0.1/:34335'
    })
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
