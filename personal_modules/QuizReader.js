const fs = require("fs")
const path = require('path')

class QuizReader {
  constructor(fileName) {
    this.fileName = fileName
    this.BASE_MODEL_PATH = "app/model"
  }

  readQuiz() {
    return new Promise((resolve, reject) => {
      let filePath = path.join(this.BASE_MODEL_PATH, this.fileName)
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
    //requiring path and fs modules
    const path = require('path');
    const fs = require('fs');
    //joining path of directory
    const directoryPath = path.join(__dirname, 'Documents');
    //passsing directoryPath and callback function
    fs.readdir(directoryPath, function (err, files) {
      //handling error
      if (err) {
        return console.log('Unable to scan directory: ' + err);
      }
      //listing all files using forEach
      files.forEach(function (file) {
        // Do whatever you want to do with the file
        console.log(file);
      });
    });
  }
}

module.exports = QuizReader
