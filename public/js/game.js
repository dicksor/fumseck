document.addEventListener('DOMContentLoaded', () => {
  const socket = io()
  const obj = {gameId : 'idtest', username : 'jonas'}

  socket.emit('quiz_init', obj)


  socket.on('quiz_initialized', (msg) => {
    alert(msg)
  })


  let questionEl = document.getElementById("question")
  let responseAEl = document.getElementById("responseA")
  let responseBEl = document.getElementById("responseB")
  let responseCEl = document.getElementById("responseC")
  let responseDEl = document.getElementById("responseD")

  socket.on('next_question', (data) => {
    let question = data.question
    questionEl.innerHTML = question.question
    responseAEl.innerHTML = question.propositions[0]
    responseBEl.innerHTML = question.propositions[1]
    responseCEl.innerHTML = question.propositions[2]
    responseDEl.innerHTML = question.propositions[3]
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

})
