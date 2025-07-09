const questions = [
    {
        question: "What is the capital of France?",
        answers: [
            { text: "Berlin", correct: false },
            { text: "Madrid", correct: false },
            { text: "Paris", correct: true },
            { text: "Rome", correct: false },
        ],
    },
    {
        question: "What is the largest planet in our solar system?",
        answers: [
            { text: "Earth", correct: false },
            { text: "Jupiter", correct: true },
            { text: "Mars", correct: false },
            { text: "Saturn", correct: false },
        ],
    },
    {
        question: "Who wrote 'To Kill a Mockingbird'?",
        answers: [
            { text: "Harper Lee", correct: true },
            { text: "Mark Twain", correct: false },
            { text: "Ernest Hemingway", correct: false },
            { text: "F. Scott Fitzgerald", correct: false },
        ],
    },
];

const questionBox = document.querySelector(".question-box");
const answerButtons = document.querySelector(".answer-buttons");
const questionText = document.getElementById("question");
const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const submitButton = document.getElementById("submit-btn");
const restartButton = document.getElementById("restart-btn");

let currentQuestionIndex = 0;
let score = 0;
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
}

function showQuestion() {
    resetState();
    // Clear previous circles
    const oldCircle = questionBox.querySelector(".circle");
    if (oldCircle) {
        questionBox.removeChild(oldCircle);
    }
    let circle = document.createElement("div");
    circle.classList.add("circle");
    circle.style.display = "flex";
    let questionNumber = document.createElement("p");
    questionNumber.innerHTML = currentQuestionIndex + 1;
    circle.appendChild(questionNumber);
    questionBox.appendChild(circle);
    let currentQuestion = questions[currentQuestionIndex];
    questionText.innerHTML = currentQuestion.question;
    currentQuestion.answers.forEach((answer) => {
        const button = document.createElement("button");
        const checkbox = document.createElement("img");
        checkbox.src = "circle.png";
        checkbox.id = "checkbox";
        button.innerHTML = answer.text;
        button.appendChild(checkbox);
        button.classList.add("answer-btn");
        button.addEventListener("click", () => {
            // Remove focus from all buttons
            Array.from(answerButtons.children).forEach((btn) => {
                btn.classList.remove("focused");
            });
            // Add focus to the clicked button
            button.classList.add("focused");
            // Enable submit button
            submitButton.disabled = false;
        });
        button.dataset.correct = answer.correct;
        answerButtons.appendChild(button);
    });
    // Disable submit button until an answer is selected
    submitButton.disabled = true;
    submitButton.style.display = "block";
}

function resetState() {
    startButton.style.display = "none";
    nextButton.style.display = "none";
    restartButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function showResults() {}

startButton.addEventListener("click", () => {
    startQuiz();
});

restartButton.addEventListener("click", () => {
    startQuiz();
});

submitButton.addEventListener("click", () => {
    Array.from(answerButtons.children).forEach((button) => {
        const checkbox = button.querySelector("img");
        if (button.classList.contains("focused")) {
            if (checkbox) {
                if (button.dataset.correct === "false") {
                    button.classList.remove("focused");
                    checkbox.src = "incorrect.png";
                    checkbox.id = "incorrect";
                }
            }
        } else {
            if (button.dataset.correct === "false") {
                button.classList.add("locked");
            }
        }
        if (button.dataset.correct === "true") {
            checkbox.src = "correct.png";
            checkbox.id = "correct";
        }
        button.disabled = "true";
    });
    nextButton.style.display = "block";
    submitButton.style.display = "none";
});

nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResults();
    }
});
