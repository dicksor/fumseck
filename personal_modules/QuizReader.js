const fs = require("fs")
const path = require('path')

class QuizReader {
  constructor() {
    this.BASE_MODEL_PATH = "app/model"
  }

  readQuiz(fileName) {
    return new Promise((resolve, reject) => {
      let filePath = path.join(this.BASE_MODEL_PATH, fileName)
      fs.readFile(filePath, (err, data) => {
        try {
          this.jsonContent = JSON.parse(data)
          resolve(this.jsonContent)
        } catch (error) {
          reject(error)
        }
     })
    })
  }

  readTopics() {
    return new Promise((resolve, reject) => {
      fs.readdir(this.BASE_MODEL_PATH, (err, files) => {
        if (err) {
          reject(err)
        }
        let names = this.cleanName(files)
        resolve({paths: files, names: names})
      })
    })
  }

  readCopyrights() {
  return this.readTopics().then(topics => {
    const oqdb_prefix = 'oqdb'
    let copyrights = []
    for(let path of topics.paths) {
        if(path.startsWith(oqdb_prefix)) {
          let promise = new Promise((resolve, reject) => {
            this.readQuiz(path).then(quiz => {
              resolve({ 'theme': quiz.theme, 'redacteur': quiz.redacteur, 'fournisseur': quiz.fournisseur })
            })
          })
          copyrights.push(promise)
        }
      }
      return Promise.all(copyrights)
    })
  }

  cleanName(files) {
    let names = []
    for(let file of files) {
      let f = file.replace(/oqdb|_|\.json/gi, ' ').trim()
      names.push(f)
    }
    return names
  }
}

module.exports = QuizReader
