// defining main variables for the game
const game = document.getElementById("game");
const score1 = document.getElementById("score-track");
const score2 = document.getElementById("2nd-score-track");
let reset = document.getElementById("reset");
// function to reset the buttons using the window scope
reset.onclick = function () { resetBoard() };
function resetBoard() {
  window.location.reload()
}
// creating teams by adding boolean variable to players 
let isPlayer1 = true;
let isPlayer2 = false;
let p1Score = 0;
let p2Score = 0;
const playerSpan = document.getElementById('player')
// ternary statement to span score to HTML
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
// large array storing all questions, genres and answers
const jeopardyCats = [
  {
    genre: "History",
    questionsArr: [
      {
        // stored index id in every object to effectively loop through the data to place within our cards
        id: 0,
        question: "After more than 150 years, he still remains the tallest US President ever",
        correct: "Abraham Lincoln",
        level: "Beginner",
        score: 100
      },
      {
        id: 1,
        question: "In August 2005 this devastating storm became the costliest natural disaster in US history",
        correct: "Hurricane Katrina",
        level: "Intermediate",
        score: 200
      },
      {
        id: 2,
        question: "This ancient leader established the largest land empire in history",
        correct: "Genghis Khan",
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
        question: "Cloud based service that helps developers store and manage their code",
        correct: "GitHub",
        level: "Intermediate",
        score: 100
      },
      {
        id: 4,
        question: "Used to store information to be referenced and manipulated in computer program",
        correct: "Variable",
        level: "Intermediate",
        score: 200
      },
      {
        id: 5,
        question: "Mechanisms that enable two software components to communicate with each other using a set of definitions and protocols",
        correct: "API",
        level: "Advance",
        score: 300
      },
    ],
  },
  {
    genre: "Pop Culture",
    questionsArr: [
      {
        id: 6,
        question: "Born in Gary Indiana, this mega star is widely regarded as the King of Pop",
        correct: "Michael Jackson",
        score: 100
      },
      {
        id: 7,
        question: "Seventh President of the United States and image printed on the twenty dollar bill",
        correct: "Andrew Jackson",
        score: 200
      },
      {
        id: 8,
        question: "This 1939 epic historical romance film was the highest grossing film adjusted with inflation ",
        correct: "Gone with the Wind",
        score: 300
      },
    ],
  },
  {
    genre: "Science",
    questionsArr: [
      {
        id: 9,
        question: "Made of layers of gases that surrounds a planet or celestial body.",
        correct: "Atmosphere",
        score: 100
      },
      {
        id: 10,
        question: "Self-replicating material that is present in nearly all living organisms",
        correct: "DNA",
        score: 200
      },
      {
        id: 11,
        question: "The amount of elements are found within the periodic table?",
        correct: "118",
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
console.log(getQuestion)
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
    p1.setAttribute("data-id", question.id);
    p2.setAttribute("data-id", question.id);
    textDiv.setAttribute("data-id", question.id);
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
  console.log(answerQuestion);

  // storing user's answer into a variable
  let answer = document.getElementById('answer-text').value
  console.log(answer);
  // getting the question and storing into variable
  let question = getQuestion(id);
  // getting correct answer from the answer object and storing into variable
  console.log(id);
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
  if (p1Score >= 1000) {
    alert('Player 1 Wins!!')
  } else if (p2Score >= 1000) {
    alert('Player 2 Wins!!')
  }
}
