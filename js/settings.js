/**
 * Each input has to have this structure to respect bootstrap css:
 *
 * <div>
 *      <label for "id"> </label>
 *      <input type = "text" id = "id" readonly>
 * </div>
 */

// eslint-disable-next-line no-unused-vars
const CreateUI = (function () {
    const FIELDS = [
        { id: 'pairNb', label: 'Pairs Found', type: 'text', readonly: true, value: 0 },
        { id: 'time', label: 'Time', type: 'text', readonly: true, value: '00:00:00' },
        { id: 'score', label: 'Score', type: 'text', readonly: true, value: 0 },
        { id: 'bestScore', label: ' Best Score', type: 'text', readonly: true, value: 0 }]

    class FieldBuilder {
        constructor (field) {
            this.field = field
        }

        createElement (tagName, attributes) {
            const htmlElement = document.createElement(tagName)

            Object.keys(attributes).forEach(key => {
                if (attributes[key] === true) {
                    htmlElement.setAttribute(key, '')
                } else {
                    htmlElement.setAttribute(key, attributes[key])
                }
            })
            return htmlElement
        }

        createFieldElement (tagName, attributes) {
            const htmlElement = this.createElement(tagName, attributes)
            htmlElement.setAttribute('name', attributes.id)
            return htmlElement
        }

        build () {
            const div = this.createElement('div', {})
            const label = this.createElement('label', { for: this.field.id })
            label.appendChild(document.createTextNode(this.field.label))
            div.appendChild(label)
            return div
        }
    }

    class InputFieldBuilder extends FieldBuilder {
        build () {
            const div = super.build()
            const input = this.createFieldElement('input', this.field)
            input.classList.add('form-control')
            input.classList.add('shadow-none')
            div.appendChild(input)
            return div
        }
    }

    class ButtonBuilder extends FieldBuilder {
        build () {
            const button = this.createFieldElement('button', this.field)
            button.classList.add('btn')
            button.classList.add('btn-block')
            return button
        }
    }

    class DivResultsBuilder extends FieldBuilder {
        build () {
            const div = this.createFieldElement('div', this.field)
            div.classList.add('p-3')
            div.classList.add('mb-2')
            div.classList.add('text-white')
            div.classList.add('margin-top')
            return div
        }
    }
    function init (htmlElementSettings) {
        // creating inputs
        for (let i = 0; i < FIELDS.length; i++) {
            htmlElementSettings.appendChild(new InputFieldBuilder(FIELDS[i]).build())
        }

        // creating button start
        const buttonStart = new ButtonBuilder({ id: 'start' }).build()
        buttonStart.textContent = 'Start'
        buttonStart.classList.add('btn-primary')
        const containerButton = new FieldBuilder().createFieldElement('div', { id: 'buttons' })
        containerButton.appendChild(buttonStart)
        htmlElementSettings.appendChild(containerButton)

        // creating Container and content of results of the game
        const containerResults = new FieldBuilder().createFieldElement('div', { id: 'result' })
        const congratulationMessage = new DivResultsBuilder({ id: 'congratulationMessage' }).build()
        const scoreResult = new DivResultsBuilder({ id: 'scoreResult' }).build()
        const timeResult = new DivResultsBuilder({ id: 'timeResult' }).build()
        const bestScoreResult = new DivResultsBuilder({ id: 'bestScoreResult' }).build()
        const divResult = [congratulationMessage, scoreResult, timeResult, bestScoreResult]
        for (let i = 0; i < divResult.length; i++) {
            containerResults.appendChild(divResult[i])
        }
        htmlElementSettings.appendChild(containerResults)
    }

    return { init: init }
})()
