let count = 1

function addQuizForm() {
  count++
  document.getElementById('numberOfQuestion').value = count
  const div = document.createElement('div')

  div.className = 'row'

  div.innerHTML = `
  <hr>
  <div class="uk-margin">
      <label class="uk-form-label" for="form-horizontal-text">Question ` + count + `</label>

      <div class="uk-grid-small" uk-grid>
          <div class="uk-width-1-1">
              <input class="uk-input" type="text" placeholder="Enter your question here..." name="question` + count + `" required>
          </div>
          <div class="uk-width-1-2@s">
              <input class="uk-input" type="text" placeholder="Choice A" name="rep` + count + `a" required>
          </div>
          <div class="uk-width-1-2@s">
              <input class="uk-input" type="text" placeholder="Choice B" name="rep` + count + `b" required>
          </div>
          <div class="uk-width-1-2@s">
              <input class="uk-input" type="text" placeholder="Choice C" name="rep` + count + `c" required>
          </div>
          <div class="uk-width-1-2@s">
              <input class="uk-input" type="text" placeholder="Choice D" name="rep` + count + `d" required>
          </div>
          <div class="uk-width-1-1">
            <div class="uk-inline">
              <div uk-form-custom="target: > * > span:first-child">
                  <span>The answer</span>
                  <select name="repQuiz` + count + `">
                      <option value="A">A</option>
                      <option value="B">B</option>
                      <option value="C">C</option>
                      <option value="D">D</option>
                  </select>
                  <button class="uk-button uk-button-default uk-width-1-1" type="button" tabindex="-1" required>
                      <span></span>
                      <span uk-icon="icon: chevron-down"></span>
                  </button>
              </div>
            </div>
          </div>
      </div>
  </div>
  `

  document.getElementById('quizForm').appendChild(div)
}
