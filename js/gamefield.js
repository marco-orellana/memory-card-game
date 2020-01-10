// eslint-disable-next-line no-unused-vars
const GameBuilder = (function () {
    'use strict'

    const CARDS = {
        fields: [
            { alt: 'blastoise', src: 'images/blastoise.jpg', id: 1 },
            { alt: 'charizard', src: 'images/charizard.jpg', id: 2 },
            { alt: 'eevee', src: 'images/eevee.jpg', id: 3 },
            { alt: 'hitmonchan', src: 'images/hitmonchan.jpg', id: 4 },
            { alt: 'ivysaur', src: 'images/ivysaur.jpg', id: 5 },
            { alt: 'mew', src: 'images/mew.jpg', id: 6 },
            { alt: 'mewtwo', src: 'images/mewtwo.jpg', id: 7 },
            { alt: 'pikachu', src: 'images/pikachu.jpg', id: 8 }
        ]
    }

    class ImageContainer {
        constructor (cards) {
            this.cards = cards
        }

        build (tagName, className) {
            const container = document.createElement(tagName)
            container.classList.add(className)

            return container
        }

        createFrontImage (tagName) {
            const imgElement = document.createElement(tagName)
            imgElement.setAttribute('src', './images/cardback.jpg')

            return imgElement
        }

        createBackImage (tagName, attributes) {
            const imgElement = document.createElement(tagName)
            const keys = Object.keys(attributes)

            keys.forEach(key => {
                imgElement.setAttribute(key, attributes[key])
            })

            return imgElement
        }

        createDivFlipper (tagName, containerClass, flipperClass) {
            const container = document.createElement(tagName)
            container.classList.add(containerClass)

            const flipper = document.createElement(tagName)
            flipper.classList.add(flipperClass)

            container.appendChild(flipper)

            return container
        }
    }

    class ImageBuilder extends ImageContainer {
        build () {
            const container = this.createDivFlipper('div', 'flip-container', 'flipper')
            const flipper = container.firstChild

            const frontContainer = super.build('div', 'front')
            const backContainer = super.build('div', 'back')

            const frontImg = this.createFrontImage('img')
            const backImg = this.createBackImage('img', this.cards)

            frontContainer.appendChild(frontImg)
            backContainer.appendChild(backImg)

            flipper.appendChild(frontContainer)
            flipper.appendChild(backContainer)

            return container
        }
    }

    function getRandomId (min, max) {
        min = Math.ceil(min)
        max = Math.floor(max)
        return Math.floor(Math.random() * (max - min)) + min
    }

    function countInArray (array, id) {
        let count = 0
        for (let i = 0; i < array.length; i++) {
            if (array[i] === id) {
                count++
            }
        }
        return count
    }

    function buildMemoryGame (root) {
        const cardIn = []
        let cardsFields

        for (let i = 0; i < 4; i++) {
            const divContainer = document.createElement('div')
            divContainer.classList.add('cards-container')
            for (let y = 0; y < 4; y++) {
                do {
                    cardsFields = CARDS.fields[getRandomId(0, 8)]
                    cardIn.push(cardsFields.id)
                } while (countInArray(cardIn, cardsFields.id) > 2)

                const imageBuilder = new ImageBuilder(cardsFields)

                divContainer.appendChild(imageBuilder.build())
            }

            root.appendChild(divContainer)
        }
        console.log(cardIn)
    }

    function createEventListenerToCard (flipCard) {
        const deck = document.getElementsByClassName('flipper')

        for (let i = 0; i < deck.length; i++) {
            deck[i].addEventListener('click', flipCard)
        }
    }

    function createEventListenerToStart (startGame) {
        const buttonStart = document.getElementById('start')
        buttonStart.addEventListener('click', startGame)
    }

    function removeEventListenerToStart (startGame) {
        const buttonStart = document.getElementById('start')
        buttonStart.removeEventListener('click', startGame)
    }

    function createEventListenerToStop (stopGame) {
        const buttonStop = document.getElementById('start')
        buttonStop.addEventListener('click', stopGame)
    }

    function removeEventListenerToStop (stopGame) {
        const buttonStop = document.getElementById('start')
        buttonStop.removeEventListener('click', stopGame)
    }

    function changeStartOrStop (id, addClassName, removeClassName, value) {
        const start = document.getElementById(id)
        start.classList.add(addClassName)
        start.classList.remove(removeClassName)
        start.innerHTML = value
    }

    function displayCardFast () {
        const deck = document.getElementsByClassName('flipper')

        for (let i = 0; i < deck.length; i++) {
            deck[i].classList.add('flip')
        }
        setTimeout(() => {
            for (let i = 0; i < deck.length; i++) {
                deck[i].classList.remove('flip')
            }
        }, 750)
    }

    function clearGame () {
        document.getElementById('gameField').innerHTML = ''
        const result = document.getElementById('result').childNodes
        for (let i = 0; i < result.length; i++) {
            result[i].textContent = ' '
            result[i].classList.remove('bg-success')
        }
    }

    return {
        init: function (redirection) {
            let isFlipped = false
            let isLock = false
            let firstEvent
            let secondEvent
            let firstCard
            let secondCard
            let clearTime
            let score = 0
            let pairFound = 0
            let seconds = 0
            let minutes = 0
            let hours = 0
            let bestScorelastGame = document.getElementById('bestScore').value

            buildMemoryGame(redirection)

            createEventListenerToStart(startGame)

            function startGame () {
                removeEventListenerToStart(startGame)
                createEventListenerToStop(stopGame)
                changeStartOrStop('start', 'btn-danger', 'btn-primary', 'Stop')
                displayCardFast()
                addTime()
                console.log('Start')
                createEventListenerToCard(flipCard)

                function flipCard () {
                    if (isLock) return
                    if (this === firstEvent) return
                    this.classList.add('flip')
                    if (!isFlipped) {
                        isFlipped = true
                        firstEvent = this
                        firstCard = this.getElementsByTagName('div')[1].firstChild.id
                    } else {
                        isFlipped = false
                        secondEvent = this
                        secondCard = this.getElementsByTagName('div')[1].firstChild.id

                        if (firstCard === secondCard) {
                            firstEvent.removeEventListener('click', flipCard)
                            secondEvent.removeEventListener('click', flipCard)

                            document.getElementById('score').value = score += 25
                            document.getElementById('pairNb').value = pairFound += 1
                        } else {
                            isLock = true
                            setTimeout(() => {
                                firstEvent.classList.remove('flip')
                                secondEvent.classList.remove('flip')
                                isLock = false
                            }, 1200)
                        }
                        if (pairFound === 8) {
                            clearTimeout(clearTime)
                            const result = document.getElementById('result').childNodes
                            for (let i = 0; i < result.length; i++) {
                                result[i].classList.add('bg-success')
                            }
                            changeStartOrStop('start', 'btn-secondary', 'btn-danger', 'Restart ?')
                            const secondsTotal = (hours * 3600) + (minutes * 60) + seconds
                            const finalScore = Math.round((score / secondsTotal) + score)
                            if (finalScore > bestScorelastGame) {
                                document.getElementById('bestScore').value = finalScore
                                bestScorelastGame = finalScore
                            }
                            const congratulationMessage = document.getElementById('congratulationMessage')
                            const scoreResult = document.getElementById('scoreResult')
                            const timeResult = document.getElementById('timeResult')
                            const bestScoreResult = document.getElementById('bestScoreResult')
                            document.getElementById('score').value = finalScore
                            congratulationMessage.textContent = 'Congratulation you found all pairs!'
                            scoreResult.textContent = 'Your Final Score = ' + finalScore
                            timeResult.textContent = 'Time = ' + document.getElementById('time').value
                            bestScoreResult.textContent = 'Best Score = ' + bestScorelastGame
                        }
                    }
                }
            }

            function stopGame () {
                score = 0
                pairFound = 0
                seconds = 0
                minutes = 0
                hours = 0

                clearGame()
                clearTimeout(clearTime)

                removeEventListenerToStop(stopGame)
                createEventListenerToStart(startGame)

                if (document.getElementById('start').classList.contains('btn-secondary')) {
                    changeStartOrStop('start', 'btn-primary', 'btn-secondary', 'Start')
                } else if (document.getElementById('start').classList.contains('btn-danger')) {
                    changeStartOrStop('start', 'btn-primary', 'btn-danger', 'Start')
                }

                buildMemoryGame(redirection)

                document.getElementById('time').value = '00:00:00'
                document.getElementById('score').value = score
                document.getElementById('pairNb').value = pairFound
                console.log('Stop')
            }

            function addTime () {
                seconds++
                if (seconds >= 60) {
                    seconds = 0
                    minutes++
                    if (minutes >= 60) {
                        minutes = 0
                        hours++
                    }
                }

                document.getElementById('time').value = (hours ? (hours > 9 ? hours : '0' + hours) : '00') +
                 ':' + (minutes ? (minutes > 9 ? minutes : '0' + minutes) : '00') + ':' + (seconds > 9 ? seconds : '0' + seconds)

                timer()
            }

            function timer () {
                clearTime = setTimeout(addTime, 1000)
            }
        }
    }
})()
