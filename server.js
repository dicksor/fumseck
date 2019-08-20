//npm modules
const express = require('express')
const app = express()
const http = require('http').createServer(app)
const path = require('path')
const io = require('socket.io')(http)


//personal modules
let IdGenerator = require('./personal_modules/IdGenerator')

//configuration
app.set('view engine', 'ejs')

//routes
app.get('/', (req, res) =>{
  res.render('index');
})
.get('/create_game', (req, res) =>{
  let idGenerator = new IdGenerator();
  res.render('createGame', {gameId:idGenerator.generate()})
})
.get('/join_game/:id_party', (req, res) =>{
  console.log('join_game : ' + req.params.id_party)
})
.use((req, res, next) => {
  console.log('404')
})

http.listen(34335, function(){
  console.log('Starting server on port: 34335')
})
