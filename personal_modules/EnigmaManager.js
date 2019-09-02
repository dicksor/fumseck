/**
 * Authors : Romain Capocasale, Vincent Moulin and Jonas Freiburghaus
 * Date : August and September 2019
 * Projet name : Fumseck
 * Class : INF2dlm-A
 * Course : Project P2, Summer HES
 */

const util = require('./util')

class EnigmaManager {
  constructor() {

  }

  cleanAnectdoteProcessing(anecdote) {
    let cleanAnectdote = anecdote.split(" ")
    let cleanAnectdoteWithoutDeterminant = []

    let regex = /[\'-()*+$%&#"!.,"';<>=?@^_«»]/g

    cleanAnectdote.forEach((word) => {
        cleanAnectdoteWithoutDeterminant.push(word.replace(regex, ' '))
    })
    return cleanAnectdoteWithoutDeterminant.join(" ").split(" ").filter((e) => {return e != ''})
  }


cutAnecdoteProcessing(arrayWord) {
  const offsetMin = 3
  const offsetMax = 3

  let index = -1
  let word = ''
  do {
    index = util.getRandomNumber(offsetMin, arrayWord.length - offsetMax)
    word = arrayWord[index]
  } while(word.length <= 4)
  return {correctWord:arrayWord[index], arrayBeginAnecdote:arrayWord.splice(0, index)}
  }
}

module.exports = EnigmaManager
