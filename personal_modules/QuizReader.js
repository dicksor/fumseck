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

        for(let i = 0; i < files.length; i++) {
          if(files[i].substring(0,3) == 'fum') {
            files.splice(i, 1)
          }
        }
        console.log(files)
        resolve({paths: files, names: names})
      })
    })
  }

  findFileInsideDir(token) {
    return new Promise((resolve, reject) => {
      fs.readdir(this.BASE_MODEL_PATH, (err, files) => {
        if (err) {
          reject(err)
        }

        for(let i = 0; i < files.length; i++) {
          if(files[i].slice(-25, -5) == token) {
            resolve(files[i])
          }
        }
      })
    })
  }

  cleanName(files) {
    let names = []
    for(let file of files) {
      if(file.substring(0,3) != 'fum')
      {
        let f = file.replace(/oqdb|_|\.json/gi, ' ').trim()
        names.push(f)
      }
    }
    return names
  }
}

module.exports = QuizReader
