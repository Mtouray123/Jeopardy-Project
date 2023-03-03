const game = document.getElementById("game");
const score1 = document.getElementById("score-track");
const score2 = document.getElementById("2nd-score-track");
const player1 = document.getElementById("score-track");
const player2 = document.getElementById("2nd-score-track");
let reset = document.getElementById("reset");
reset.onclick = function() {resetBoard()};
function resetBoard() {
  let reset = window.location.reload()
}
// creating teams by adding player and score to an array to loop through in future
// const teams = [[score1, player1][(score2, player2)]];
// let currentTeams = 0;
// looping through teams
// function switchingTeams() {
//   console.log(teams.length);
//   if (currentTeams < teams.length - 1) {
//     currentTeams++;
//   } else {
//     currentTeams = 0;
//   }
// }
let isPlayer1 = true;
let isPlayer2 = false;
let p1Score = 0;
let p2Score = 0;
const playerSpan = document.getElementById('player')
// tenary statement to span score to HTML
playerSpan.innerText = isPlayer1?"player1":"player2"
function teamSwitch(){
  if(isPlayer1 == true){
    isPlayer1 = false;
    isPlayer2 = true;
  }else{
    isPlayer1 = true;
    isPlayer2 = false;
  }
  playerSpan.innerText = isPlayer1?"player1":"player2"

}
// large array storing all questions genres and answers
const jeopardyCats = [
  {
    genre: "History",
    questionsArr: [
      {
        id: 0,
        question: "Where was Ghengis Khan Born",
        // answer: document.createElement('form')
        answers: ["Khazakstan", "Mongolia"],
        correct: "Mongolia",
        level: "Beginner",
        score: 100
      },
      {
        id: 1,
        question: "How old was Alexander the Great when he passed?",
        // answer: document.createElement('form')
        answers: ["28", "32"],
        correct: "32",
        level: "Intermediate",
        score: 200
      },
      {
        id: 2,
        question:
          "What was the name of Mao Zedong's plan to industrialize China?",
        // answer: document.createElement('form')
        answers: ["Great Leap Forward", "China Rising"],
        correct: "Great Leap Forward",
        level: "Advance",
        score: 300
      },
    ],
  },
  {
    genre: "Programming",
    questionsArr: [
      {
        id: 3,
        question: "Which is safer innerText or innerHTML?",
        // answer: document.createElement('form')
        answers: ["innerHTML", "innerText"],
        correct: "innerText",
        level: "Beginner",
        score: 100
      },
      {
        id: 4,
        question:
          "What is the name of the person who invented the language JavaScript?",
        // answer: document.createElement('form')
        answers: ['Brendan Eich', 'John Carmack'],
        correct: "Brendan Eich",
        level: "Intermediate",
        score: 200
      },
      {
        id: 5,
        question: "When was GitHub founded?",
        // answer: document.createElement('form')
        answers: ["2008", "2012"],
        correct: "2008",
        level: "Advance",
        score: 300
      },
    ],
  },
  {
    genre: "Culture",
    questionsArr: [
      {
        id: 6,
        question: "In what city was Michael Jackson born?",
        // answer: document.createElement('form')
        answers: ["Detroit, Michigan", "Gary, Indiana"],
        correct: "Gary, Indiana",
        level: "Beginner",
        score: 100
      },
      {
        id: 7,
        question: "What year was 1984 published by George Orwell?",
        // answer: document.createElement('form')
        answers: ["1984", "1949"],
        correct: "1949",
        level: "Intermediate",
        score: 200
      },
      {
        id: 8,
        question: "Who is on the Twenty Dollar Bill?",
        // answer: document.createElement('form')
        answers: ["Benjamin Franklin", "Andrew Jackson"],
        correct: "Andrew Jackson",
        level: "Advance",
        score: 300
      },
    ],
  },
  {
    genre: "Science",
    questionsArr: [
      {
        id: 9,
        question: "Name at least one main layer of the atmosphere.",
        // answer:document.createElement('form')
        answers: ["Troposphere", "Nexosphere",],
        correct: "Troposphere", 
        level: "Beginner",
        score: 100
      },
      {
        id: 10,
        question: "How many elements are in the periodic table?",
        // answer: document.createElement('form')
        answers: ["134", "118"],
        correct: "118",
        level: "Intermediate",
        score: 200
      },
      {
        id: 11,
        question: "How old is Earth? (According to 'science')",
        // answer: document.createElement('form')
        answers: ['11.7 billion years', '4.5 billion years'],
        correct: "4.5 billion years",
        level: "Advance",
        score: 300
      },
    ],
  },
];

// function to loop through questions and return based on matching ids
function getQuestion(id) {
  for (let i = 0; i < jeopardyCats.length; i++) {
    console.log(jeopardyCats[i].questionsArr);
    for (let j = 0; j < jeopardyCats[i].questionsArr.length; j++) {
      if (jeopardyCats[i].questionsArr[j].id == id)
        return jeopardyCats[i].questionsArr[j];
    }
  }
}


// function to loop through the jeopardy category
function addCategory(category) {
  // created a new div and named it column to store the columns
  const column = document.createElement("div");
  // adding a class to the  column variable
  column.classList.add("genre-column");
  // creating a variable to store the titles of each genre
  const genreTitle = document.createElement("div");
  // added a class to the title variable
  genreTitle.classList.add("genre-title");
  // Setting the inner text to the genre variable
  genreTitle.innerText = category.genre;

  // adding columns and genres to the original html
  column.appendChild(genreTitle);
  game.append(column);

  // creating cards
  category.questionsArr.forEach((question, index) => {
    const card = document.createElement("div");
    card.classList.add("card");
    const p1 = document.createElement('p');
    p1.classList.add('front');
    const p2 = document.createElement('p');
    p2.classList.add('back');
    const textDiv = document.createElement('div')

    textDiv.textContent = question.question;
    p2.appendChild(textDiv)
    // adding buttons
    const div = document.createElement('div')
    const button1 = document.createElement('button')
    const button2 = document.createElement('button')
    button1.classList.add('button-1')
    button2.classList.add('button-2')
    // console.log(jeopardyCats[0].questionsArr[0].answers[0]);
    
    button1.textContent = category.questionsArr[index].answers[0]
    button2.textContent = category.questionsArr[index].answers[1]
    div.appendChild(button1)
    div.appendChild(button2)
    p2.appendChild(div)
    let correct = category.questionsArr[index].correct
    let score = category.questionsArr[index].score
    button1.onclick = function(){ buttonClick(button1.textContent, correct, score, card)}
    button2.onclick = function(){ buttonClick(button2.textContent, correct, score, card)}
    card.setAttribute("data-id", question.id);
  
    // assigning numbers to back of cards
    p1.innerText = score
    card.appendChild(p1);
    card.appendChild(p2);
    column.append(card);
  });
  // identifying if button clicked is right or wrong
  
}

function buttonClick(answer, correct, score, card){
console.log(answer);
console.log(correct);
  if(answer == correct){
    if(isPlayer1 == true){
      p1Score += score;
      console.log(p1Score);
      score1.innerText = p1Score
    }else{
      p2Score += score;
      score2.innerText =p2Score
    }
    disableQuestion(card)
  }
  teamSwitch()
}

function disableQuestion(card){
  let childNodes = card.getElementsByTagName('*');
for (let node of childNodes) {  
    node.disabled = true;
}
}
// appending questions to the back of card
console.log(jeopardyCats);

jeopardyCats.forEach((category) => addCategory(category));
console.log(jeopardyCats);
// creating flips
const flipping = document.querySelectorAll(".card");
function flipCard(event) {
  if(event.target.tagName == 'BUTTON' ){
    return;
  }
  this.classList.toggle("flip");
  // console.log(jeopardyCats.questionsArr[0]);
  let id = event.target.getAttribute("data-id");
  console.log(id);
  let question = getQuestion(id);
  console.log(question);

  event.target.setAttribute("data-question", question.question);
  event.target.setAttribute("data-answers", question.answers);
  event.target.setAttribute("data-correct-answer", question.correct);
}


console.log(flipping);

flipping.forEach((card) => card.addEventListener("click", flipCard));
