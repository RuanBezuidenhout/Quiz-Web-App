const finalScore = document.querySelector('#finalScore')
const mostResentScore = localStorage.getItem('mostResentScore')

/* Get Final Score*/
finalScore.innerText = mostResentScore

const score = {
    score: mostResentScore,
}
