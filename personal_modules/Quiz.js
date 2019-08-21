const fs = require("fs")
const path = require('path')

class Quiz {
  constructor(fileName) {
    this.fileName = fileName
    this.BASE_MODEL_PATH = "app/model"
  }

  readQuiz(){
    return new Promise((resolve, reject) => {
      let filePath = path.join(this.BASE_MODEL_PATH, this.fileName)
      fs.readFile(filePath, (err, data) => {
        // TODO : manage error
        this.jsonContent = JSON.parse(data)
        resolve(this.jsonContent)
     })
    })
  }
}

module.exports = Quiz
