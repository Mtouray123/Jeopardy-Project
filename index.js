// defining main variables for the game
const game = document.getElementById("game");
const score1 = document.getElementById("score-track");
const score2 = document.getElementById("2nd-score-track");
let reset = document.getElementById("reset");
// function to reset the buttons using the window scope
reset.onclick = function () { resetBoard() };
function resetBoard() {
  let reset = window.location.reload()
}
// creating teams by adding boolean variable to players 
let isPlayer1 = true;
let isPlayer2 = false;
let p1Score = 0;
let p2Score = 0;
const playerSpan = document.getElementById('player')
// tenary statement to span score to HTML
playerSpan.innerText = isPlayer1 ? "player1" : "player2"
// logic for a function to switch between players
function teamSwitch() {
  if (isPlayer1 == true) {
    isPlayer1 = false;
    isPlayer2 = true;
  } else {
    isPlayer1 = true;
    isPlayer2 = false;
  }
  playerSpan.innerText = isPlayer1 ? "player1" : "player2"

}
// large array storing all questions genres and answers
const jeopardyCats = [
  {
    genre: "History",
    questionsArr: [
      {
        // index id stored in every object for looping through
        id: 0,
        question: "Where was Ghengis Khan Born",
        correct: "Mongolia",
        level: "Beginner",
        score: 100
      },
      {
        id: 1,
        question: "How old was Alexander the Great when he passed?",
        correct: "32",
        level: "Intermediate",
        score: 200
      },
      {
        id: 2,
        question:
          "What was the name of Mao Zedong's plan to industrialize China?",
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
        correct: "innerText",
        level: "Beginner",
        score: 100
      },
      {
        id: 4,
        question:
          "What is the name of the person who invented the language JavaScript?",
        correct: "Brendan Eich",
        level: "Intermediate",
        score: 200
      },
      {
        id: 5,
        question: "When was GitHub founded?",
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
        correct: "Gary Indiana",
        level: "Beginner",
        score: 100
      },
      {
        id: 7,
        question: "What year was 1984 published by George Orwell?",
        correct: "1949",
        level: "Intermediate",
        score: 200
      },
      {
        id: 8,
        question: "Who is on the Twenty Dollar Bill?",
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
        correct: "Troposphere",
        level: "Beginner",
        score: 100
      },
      {
        id: 10,
        question: "How many elements are in the periodic table?",
        correct: "118",
        level: "Intermediate",
        score: 200
      },
      {
        id: 11,
        question: "How old is Earth? (According to 'science')",
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
  // creating card faces, card backs, columns, questions, and appending
  // Loops through questions within the categories
  category.questionsArr.forEach((question, index) => {
    const card = document.createElement("div");
    card.classList.add("card");
  // creates p elements and classes for front and back of the cards
    const p1 = document.createElement('p');
    p1.classList.add('front');
    const p2 = document.createElement('p');
    p2.classList.add('back');
    // sets text content to the current question we are looping through
    const textDiv = document.createElement('div')
    textDiv.textContent = question.question;
    // adding the text into the p2 element
    p2.appendChild(textDiv)
    let score = category.questionsArr[index].score
    card.setAttribute("data-id", question.id);
    // assigning numbers to back of cards
    // assigning innertext of p1 into the score
    p1.innerText = "$"+score
    // adding elements p1 and p2 to the cards
    card.appendChild(p1);
    card.appendChild(p2);
    // adding the cards into the columns that they exist in by their respective category
    column.append(card);
  });
}
console.log(jeopardyCats);

// Looping through the categories and creating a card for each category
jeopardyCats.forEach((category) => addCategory(category));
// creating flip variable for all cards within the category function
const flipping = document.querySelectorAll(".card");
function flipCard(event) {
  // added a classlist to the item
  this.classList.toggle("flip");
  // recieving id of the data attributes
  let id = event.target.getAttribute("data-id");
  console.log(id);
  // getting question from question array calling the getquestion function created
  let question = getQuestion(id);
  console.log(question);
  console.log(event.target);
  // setting values based off the current question
  document.getElementById('answer-text-button').setAttribute('data-id', id)
  document.getElementById('answer-text-button').setAttribute('data-card', event.target)
}
// Loops through the flipping variable and adds a event listener click to each card in the array
flipping.forEach((card) => card.addEventListener("click", flipCard));

// array for id's of question that has ALREADY been answered correctly 
let answeredQuestions = [];
// function to loop through questions and check if id is in answered question array
function checkIfAnswered(id) {
  for (let i = 0; i < answeredQuestions.length; i++) {
    if (id == answeredQuestions[i])
      return true;
  }
  return false;
}
// function used to prompt user to answer question
function answerQuestion(id) {
  // logic to check if the question has been answered already (by checking if it was passed into the array storing all answered questions)
  if (checkIfAnswered(id) == true) {
    alert('Answered Question Already')
    return;
  }
  // storing user's answer into a variable
  let answer = document.getElementById('answer-text').value
  console.log(answer);
  // getting the question and storing into variable
  let question = getQuestion(id);
  // getting correct answer from the answer object and storing into variable
  let correctAnswer = question.correct
  // checking if user's answer equals the correct answer
  if (answer == correctAnswer) {
    if (isPlayer1 == true) {
      // incrementing score up based off if it was answered by player1 or player2
      p1Score += question.score;
      console.log(p1Score);
      score1.innerText = "$"+p1Score
    } else {
      p2Score += question.score;
      score2.innerText = "$"+p2Score
    }
    // appending the id to the answered question array
    answeredQuestions.push(id)
    // callling the win state to see if player hit the score cap
    winState();
  }
  // calling a function to switch between players
  teamSwitch();
}
// function used to determine if the player has reached score cap
function winState() {
  if (p1Score >= 1200) {
    alert('Player 1 Wins!!')
  } else if (p2Score >= 1200) {
    alert('Player 2 Wins!!')
  }
}
console.log(flipping);
// adding onclick event to all cards and using flipCard function on it
