const game = document.getElementById('game');
const score1 = document.getElementById('score-track');
const score2 = document.getElementById('2nd-score-track');
const player1 = document.getElementById('score-track');
const player2 = document.getElementById('2nd-score-track');
let play = document.getElementById('play');
function playMusic() {
    let audio = Audio('');
}

// creating teams by adding player and score to an array to loop through in future
const teams = [
    [score1, player1]
    [score2, player2]
]
let currentTeams = 0;
// looping through teams
function switchingTeams(){
    console.log(teams.length);
    if(currentTeams < teams.length-1){
        currentTeams++;
    } else {
        currentTeams = 0;
    }
}


// large array storing all questions genres and answers
const jeopardyCats = [
    {
        genre: "History",
        questionsArr: [
            {
                question: "Where was Ghengis Khan Born",
                // answer: document.createElement('form')
                answers:['Khazakstan', 'Mongolia'],
                correct: 'Mongolia',
                level: 'Beginner'
                
            },
            {
                question:"How old was Alexander the Great when he passed?",
                // answer: document.createElement('form')
                answers:['28', '32'],
                correct:'32',
                level: 'Intermediate'
                
            },
            {
                question:"What was the name of Mao Zedong's plan to industrialize China?",
                // answer: document.createElement('form')
                answers:['Great Leap Forward', 'China Rising'],
                correct:'Great Leap Forward',
                level: 'Advance'
            }
        ]
    },
    {
        genre:"Programming",
        questionsArr: [
            {
                question: "Which is safer innerText or innerHTML?",
                // answer: document.createElement('form')
                answers:['innerHTML', 'innerText'],
                correct: 'innerText',
                level:'Beginner'
            },
            {
                question: "What is the name of the person who invented the language JavaScript?",
                // answer: document.createElement('form')
                answers:[],
                correct:'Brendan Eich',
                level: 'Intermediate'
            },
            {
                question: "When was GitHub founded?",
                // answer: document.createElement('form')
                answers:['2008', '2012'],
                correct:'2008',
                level: 'Advance'
            }
        ]
    },
    {
        genre: "Culture",
        questionsArr: [
            {
                question: "In what city was Michael Jackson born?",
                // answer: document.createElement('form')
                answers:['Detroit, MIchigan', 'Gary,Indiana'],
                correct:'Gary, Indiana',
                level: 'Beginner'
            },
            {
                question: "What year was 1984 published by George Orwell?",
                // answer: document.createElement('form')
                answers:['1984', '1949'],
                correct:'1949',
                level:'Intermediate'
            },
            {
                question:"Who is on the Twenty Dollar Bill?",
                // answer: document.createElement('form')
                answers:['Benajmin Franklin', 'Andrew Jackson'],
                correct:'Andrew Jackson',
                level:'Advance'
            }

        ]
    },
    {
        genre: "Science",
        questionsArr:[
            {
                question:"Name at least one main layer of the atmosphere.",
                // answer:document.createElement('form')
                answers:['Troposphere', ''],
                correct:['Troposphere', 'Stratosphere', 'Exosphere'],
                level: 'Beginner'
            },
            {
                question:"How many elements are in the periodic table?",
                // answer: document.createElement('form')
                answers:[],
                correct:['118'],
                level: 'Intermediate'
            },
            {
                question:"How old is Earth? (According to 'science')",
                // answer: document.createElement('form')
                answers:[],
                correct:['4.5 billion years'],
                level: 'Advance'

            }
        ]
    }
]
// function to loop through the jeopardy category
function addCategory(category){
    // created a new div and named it column to store the columns
    const column = document.createElement('div')
    // adding a class to the  column variable
    column.classList.add('genre-column')
    // creating a variable to store the titles of each subject
    const genreTitle = document.createElement('div')
    // added a class to the title variable
    genreTitle.classList.add('genre-title')
    // Setting the inner text to the subject variable
    genreTitle.innerText = category.genre


// adding columns and subjects to the original html
    column.appendChild(genreTitle)
    game.append(column)

    // creating cards
    category.questionsArr.forEach(question => {
    const card = document.createElement('div')
    card.classList.add('card')
    column.append(card)
    // assigning numbers to back of cards
    if(question.level === 'Beginner'){
        card.innerText = '100';
    }
    if(question.level === 'Intermediate'){
        card.innerText = '200';
    }
    if(question.level === 'Advance'){
        card.innerText = '300';
    }

})

};

jeopardyCats.forEach(category => addCategory(category))
// creating flips
const flipping = document.querySelectorAll('.card')
function flipCard() {
    this.classList.toggle('flip')
    console.log(this)
    flipping.setAttribute('data-question', jeopardyCats.questionsArr[0].question)
    flipping.setAttribute('data-answer-1', jeopardyCats.questionsArr[1].asnwer[0])
    flipping.setAttribute('data-answer-2', jeopardyCats.questionsArr[1])
    flipping.setAttribute('data-correct', jeopardyCats.questionsArr.correct)
    flipping.setAttribute('data-value', card.getInnerText())
}
console.log(flipping)

flipping.forEach(card => card.addEventListener('click', flipCard));