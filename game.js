const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;

let availableQuesions = [];
let questions = [];

fetch("questions.json")
  .then((res) => {
    return res.json();
  })
  .then((loadedQuestions) => {
    questions = loadedQuestions;
    startGame();
  })
  .catch((err) => {
    console.error(err);
  });

// Can be set other values
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuesions = [...questions];
  getNewQuestion();
};

// getNewQuestion = () => {
//   if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
//     localStorage.setItem("mostRecentScore", score);
//     // Go to the end page
//     return window.location.assign("end.html");
//   }

//   questionCounter++;
//   progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;

//   // Update the progress bar
//   progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

//   const questionIndex = Math.floor(Math.random() * availableQuesions.length);
//   currentQuestion = availableQuesions[questionIndex];
//   question.innerText = currentQuestion.question;

//   choices.forEach((choice) => {
//     const number = choice.dataset["number"];
//     choice.innerText = currentQuestion["choice" + number];
//   });

//   availableQuesions.splice(questionIndex, 1);
//   acceptingAnswers = true;
// };

choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};

getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    // Go to the end page
    return window.location.assign("end.html");
  }

  questionCounter++;
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;

  // Update the progress bar
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerText = currentQuestion.question;

  // Check if the current question has a questionImage defined
  if (currentQuestion.questionImage && questionCounter <= 2) {
    const questionImageElement = document.getElementById("questionImage");
    questionImageElement.src = currentQuestion.questionImage;
    questionImageElement.style.display = "block";
  } else {
    // Hide the question image for other questions
    const questionImageElement = document.getElementById("questionImage");
    questionImageElement.style.display = "none";
  }

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

