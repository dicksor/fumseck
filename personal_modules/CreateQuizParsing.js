const fs = require('fs')

class CreateQuizParsing {
  constructor(data) {
    this.dataQuiz = data
  }

  saveData() {

    let repLetter = ''
    let jsonQuiz = ''

    jsonQuiz += '{"quizTitle": "' + this.dataQuiz.quizTitle + '",'
    jsonQuiz += '"quizz": ['

    for(let i = 1; i <= this.dataQuiz.numberOfQuestion; i++) {
      repLetter = this.dataQuiz["repQuiz" + i].toLowerCase()
      jsonQuiz += '{"question": "' + this.dataQuiz["question" + i] + '","propositions": ["' + this.dataQuiz["rep" + i + "a"] + '", "' + this.dataQuiz["rep" + i + "b"] + '", "' + this.dataQuiz["rep" + i + "c"] + '", "' + this.dataQuiz["rep" + i + "d"] + '"],"reponse": "' + this.dataQuiz["rep" + i + repLetter] + '"}'

      if(this.dataQuiz.numberOfQuestion - i > 0) {
        jsonQuiz += ','
      }
    }

    jsonQuiz += ']}'

    let title = this.dataQuiz.quizTitle.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^\w\s]/gi, '').replace(/ /g,"_")

    fs.writeFile("app/model/fum_" + title + ".json", jsonQuiz, function(err) {
        if(err) {
            return console.log(err);
        }
    });
  }
}

module.exports = CreateQuizParsing
