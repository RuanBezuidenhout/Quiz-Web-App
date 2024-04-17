const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let quiestionCounter = 0
let availableQuestions = []

/*Array that contains the quiz questions*/
let questions = [
    {
        question: 'An organic compound is considered an alochol if it has what functional group?',
        choice1: 'Carbonyl',
        choice2: 'Hydroxyl',
        choice3: 'Alkyl',
        choice4: 'Aldehyde',
        answer: 2,
    },
    {
        question: 'How many keys does a classic piano have?',
        choice1: '88',
        choice2: '97',
        choice3: '44',
        choice4: '72',
        answer: 1,
    },
    {
        question: 'Whats is the largest country in the world?',
        choice1: 'Canada',
        choice2: 'United States',
        choice3: 'Russia',
        choice4: 'China',
        answer: 3,
    },
    {
        question: 'How far is the Moon from the Earth?',
        choice1: '11000 km',
        choice2: '97 360 km',
        choice3: '384 400 km',
        choice4: '569 600 km',
        answer: 3,
    },
    {
        question: 'where did the food dish called tempura originate from?',
        choice1: 'Japan',
        choice2: 'Portugal',
        choice3: 'Thailand',
        choice4: 'Korea',
        answer: 2,
    },
    {
        question: 'What is the best-selling video game called?',
        choice1: 'Minecraft',
        choice2: 'Grand Theft Auto V',
        choice3: 'World of Warcraft',
        choice4: 'Cyberpunk 2077',
        answer: 1,
    },
    {
        question: 'Which language is the most spoken language in the world?',
        choice1: 'English',
        choice2: 'German',
        choice3: 'Mandarin',
        choice4: 'Spanish',
        answer: 3,
    },
    {
        question: 'What year was the United Nations established?',
        choice1: '1897',
        choice2: '1969',
        choice3: '1929',
        choice4: '1945',
        answer: 4,
    },
    {
        question: 'What country drinks the most coffee per capita?',
        choice1: 'Finland',
        choice2: 'Switzerland',
        choice3: 'America',
        choice4: 'England',
        answer: 1,
    },
    {
        question: 'Which planet has the most moons?',
        choice1: 'Neptune',
        choice2: 'Mecury',
        choice3: 'Saturn',
        choice4: 'Jupiter',
        answer: 3,
    },
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 10

/* Function to enable and start quiz*/
startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

/* Function to keep track of score and randomized questions*/
getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostResentScore', score)
        return window.location.assign('End')
    }
    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

/* Check whether answer is correct or not */
choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return
        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']
        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if (classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }
        selectedChoice.parentElement.classList.add(classToApply)
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        }, 1000)
    })
})

incrementScore = num => {
    score += num
    scoreText.innerText = score
}

/* Calling function to start quiz*/
startGame()
