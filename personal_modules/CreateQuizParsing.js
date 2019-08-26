const fs = require('fs')
const idgen = require('idgen')
const Mail = require('./SendMail')

class CreateQuizParsing {
  constructor(data) {
    this.dataQuiz = data
  }

  saveData() {

    let repLetter = ''
    let jsonQuiz = ''

    jsonQuiz += '{"nbQuestions": "' + this.dataQuiz.numberOfQuestion + '", "quizTitle": "' + this.dataQuiz.quizTitle + '",'
    jsonQuiz += '"quizz": ['

    for(let i = 1; i <= this.dataQuiz.numberOfQuestion; i++) {
      repLetter = this.dataQuiz["repQuiz" + i].toLowerCase()
      jsonQuiz += '{"question": "' + this.dataQuiz["question" + i] + '","propositions": ["' + this.dataQuiz["rep" + i + "a"] + '", "' + this.dataQuiz["rep" + i + "b"] + '", "' + this.dataQuiz["rep" + i + "c"] + '", "' + this.dataQuiz["rep" + i + "d"] + '"],"reponse": "' + this.dataQuiz["rep" + i + repLetter] + '"}'

      if(this.dataQuiz.numberOfQuestion - i > 0) {
        jsonQuiz += ','
      }
    }

    jsonQuiz += ']}'

    let token = idgen(20)
    let userMail = this.dataQuiz.userMail

    let title = this.dataQuiz.quizTitle.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^\w\s]/gi, '').replace(/ /g,'_')
    let filename = 'fum_' + title + '_' + token + '.json'

    fs.writeFile('app/model/' + filename, jsonQuiz, function(err) {
        if(err) {
          return console.log(err)
        } else {
          Mail.sendMail(userMail, 'http://localhost:34335/load_game/' + token)
        }
    });
  }
}

module.exports = CreateQuizParsing
