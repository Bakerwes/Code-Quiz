var startButton = document.getElementById("start");
var questionSection = document.getElementById("question-section");
var questionEl = document.getElementById("question");
var optionsEl = document.getElementById("options");
var feedbackEl = document.getElementById("feedback");
var timeEl = document.getElementById("time");
var scoreEl = document.getElementById("points");
var scoreStringEl = document.getElementById("score")

// Initializes variables
var currentQuestion = 0;
var quizTimer;
var quizScore = 0;

// Sets the quiz timer
var quizTime = 90;

// Quiz questions and answers
var quizQuestions = [
    {
        question: "What is JavaScript?",
        options: [
            "A programming language used for creating interactive web pages and web applications",
            "A type of coffee",
            "A social media platform",
            "A type of car"],
        answer: "A programming language used for creating interactive web pages and web applications"
    },
    {
        question: "What are the primitive data types in JavaScript?",
        options: [
            "Number, String, Boolean, Null, Undefined, Symbol",
            "Apple, Banana, Orange, Pear",
            "Red, Blue, Green, Yellow",
            "Cat, Dog, Fish, Bird"
        ],
        answer: "Number, String, Boolean, Null, Undefined, Symbol"
    },
    {
        question: "What is an object in JavaScript?",
        options: [
            "A programming language used for creating interactive web pages and web applications",
            "A type of coffee",
            "A collection of key-value pairs used to represent complex data structures",
            "A type of car"
        ],
        answer: "A collection of key-value pairs used to represent complex data structures"
    },
    {
        question: "What is the difference between let and var in JavaScript?",
        options: [
            "let declares a block-scoped variable, while var declares a function-scoped variable",
            "let declares a function-scoped variable, while var declares a block-scoped variable",
            "There is no difference between let and var in JavaScript",
            "let is used for numbers, while var is used for strings"
        ],
        answer: "let declares a block-scoped variable, while var declares a function-scoped variable"
    },
    {
        question: "What is the purpose of the DOM in JavaScript?",
        options: [
            "To interact with the HTML and CSS of a web page",
            "To create animations on a web page",
            "To store data on a web page",
            "To play videos on a web page"
        ],
        answer: "To interact with the HTML and CSS of a web page"
    },
    {
        question: "What is the difference between == and === in JavaScript?",
        options: [
            "== checks for equality of value, while === checks for equality of value and type",
            "== checks for equality of type, while === checks for equality of value",
            "== and === are interchangeable in JavaScript",
            "== checks for equality of value and type, while === checks for equality of value"
        ],
        answer: "== checks for equality of value, while === checks for equality of value and type"
    },
    {
        question: "How do you declare a function in JavaScript?",
        options: [
            "Using the function keyword followed by the function name, parameter list, and function body",
            "Using the for loop",
            "Using the if statement",
            "Using the switch statement"
        ],
        answer: "Using the function keyword followed by the function name, parameter list, and function body"
    },
    {
        question: "What is the purpose of the 'this' keyword in JavaScript?",
        options: [
            "Refers to the variable that was last declared",
            "Refers to the next function in the call stack",
            "Refers to the previous function in the call stack",
            "Refers to the object that the function is a method of, or the global object if the function is not a method of an object" 
        ],
        answer: "Refers to the object that the function is a method of, or the global object if the function is not a method of an object"                                
    }
];

// Adds event listener to the start button
startButton.addEventListener("click", () => {
    startButton.style.display = "none"
    // Starts the timer
    quizTimer = setInterval(() => {
        quizTime--;
        if (quizTime < 0) {
            quizTime = 0;
            clearInterval(quizTimer);
            endQuiz();
        }
        timeEl.textContent = quizTime;
        if (quizTime === 0 && currentQuestion < quizQuestions.length) {
            clearInterval(quizTimer);
            endQuiz();
        }
    }, 1000);

    // Function for rendering the quiz questions
    function renderQuestion() {

        // Gets the current question from the array
        var question = quizQuestions[currentQuestion];

        // Sets the question text
        questionEl.textContent = question.question;

        // Clears the options element
        optionsEl.innerHTML = "";

        // Creates and appends an li element for each answer option
        question.options.forEach((option) => {
            var li = document.createElement("li");
            var button = document.createElement("button");
            button.textContent = option;
            li.appendChild(button);
            optionsEl.appendChild(li);

            // Adds event listener for each answer option
            button.addEventListener("click", () => {

                // Checks if the answer is correct
                if (option === question.answer) {
                    feedbackEl.textContent = "Correct!";
                    feedbackEl.style.color = "rgb(3, 228, 3)";
                    feedbackEl.style.fontWeight = "bold";
                    quizScore += 10;
                    scoreEl.textContent = quizScore;
                } else {
                    feedbackEl.textContent = "Oh no! You lost 10 seconds!";
                    feedbackEl.style.color = "red";
                    feedbackEl.style.fontWeight = "bold";
                    quizTime -= 10;
                }

                // Displays feedback for a brief moment
                setTimeout(() => {
                    feedbackEl.textContent = "";
                }, 2000);

                // Moves to the next question
                currentQuestion++;

                // Checks to see if the quiz is over
                if (currentQuestion >= quizQuestions.length || quizTime === 0) {
                    clearInterval(quizTimer);
                    endQuiz();
                } else {
                    renderQuestion();
                }
            });
        });

        // Check if the feedback for the last question should be hidden
        if (currentQuestion >= quizQuestions.length) {
            feedbackEl.style.display = "none";
        }
    }
// Hides highscore table
    var highScore = document.getElementById("highscores-container");
    highScore.style.display = "none";
    // Renders the first question
    renderQuestion();
});

function endQuiz() {
    // Stops the timer
    clearInterval(quizTimer);

    // Hides the score
    scoreStringEl.style.display = "none";
    scoreEl.style.display = "none";

    // Displays the quiz results
    var percentageScore = (quizScore / 80) * 100;
    questionSection.innerHTML = "";
    questionEl.textContent = "Quiz complete!";
    optionsEl.innerHTML = "";
    var resultEl = document.createElement("p");
    resultEl.textContent = "Final Score: " + quizScore + "/80 or " + percentageScore + "% ";
    resultEl.style.paddingBottom = "10px"
    questionSection.appendChild(resultEl);

    // Displays feedback for the quiz
    var feedback = document.createElement("p");
    feedback.textContent = "Thanks for taking the quiz!";
    feedback.style.paddingBottom = "10px"
    questionSection.appendChild(feedback);

    // Show save score button when quiz is finished or time is up
    var saveScoreButton = document.getElementById("save-score");
    saveScoreButton.style.display = "flex"

    // Adds a "New Game" button
    var newGameButton = document.createElement("button");
    newGameButton.textContent = "New Game";
    newGameButton.addEventListener("click", () => {

        // Reloads the page to start a new game
        location.reload();
    });

    // Creates a new div to hold the new game and save score buttons
    var buttonContainer = document.createElement("div");
    buttonContainer.appendChild(newGameButton);
    buttonContainer.appendChild(saveScoreButton);

    // Appends the button container to the body of the HTML document
    document.body.appendChild(buttonContainer);

    // Applies the CSS properties from the start button to the new game and save score buttons
    newGameButton.style.backgroundColor = "blue";
    newGameButton.style.color = "white";
    newGameButton.style.border = "none";
    newGameButton.style.fontSize = "16px";
    newGameButton.style.cursor = "pointer";
    newGameButton.style.borderRadius = "5px";
    newGameButton.style.padding = "10px 20px";
    newGameButton.style.transition = "transform 0.2s ease-in-out";
    newGameButton.style.transform = "scale(1)";

    saveScoreButton.style.backgroundColor = "blue";
    saveScoreButton.style.color = "white";
    saveScoreButton.style.border = "none";
    saveScoreButton.style.fontSize = "16px";
    saveScoreButton.style.cursor = "pointer";
    saveScoreButton.style.borderRadius = "5px";
    saveScoreButton.style.padding = "10px 20px";
    saveScoreButton.style.marginLeft = "40px";
    saveScoreButton.style.transition = "transform 0.2s ease-in-out";
    saveScoreButton.style.transform = "scale(1)";

    // Adds a mouseover event listener to the buttons
    newGameButton.addEventListener("mouseover", function () {
        newGameButton.style.transform = "scale(0.9)";
        newGameButton.style.backgroundColor = "rgb(113, 19, 201)"
    });
    saveScoreButton.addEventListener("mouseover", function () {
        saveScoreButton.style.transform = "scale(0.9)";
        saveScoreButton.style.backgroundColor = "rgb(113, 19, 201)"
    });

    // Adds a mouseout event listener to the save score button
    newGameButton.addEventListener("mouseout", function () {
        newGameButton.style.transform = "scale(1.0)";
        newGameButton.style.backgroundColor = "blue";
    });
    saveScoreButton.addEventListener("mouseout", function () {
        saveScoreButton.style.transform = "scale(1.0)";
        saveScoreButton.style.backgroundColor = "blue";
    });

    // Some additional styling to the button container
    buttonContainer.style.display = "flex";
    buttonContainer.style.justifyContent = "center";
    buttonContainer.style.marginTop = "20px";

    // Add event listener to save score button
    saveScoreButton.addEventListener("click", function () {
        // Prompt user for initials
        var initials = prompt("Enter your initials:");
        
        // Allows the user to chose any letter but not a number
        if (/^[a-zA-Z]+$/.test(initials) && initials.length > 0) {
            
            // Saves the score to local storage
            var scoreObject = { initials: initials, score: quizScore };
            var scores = JSON.parse(localStorage.getItem("scores") || "[]");
            scores.push(scoreObject);
            localStorage.setItem("scores", JSON.stringify(scores));
            // Save the initials
            alert("Your score has been saved!");
            saveScoreButton.style.display = "none";
        } else {
            // Invalid input
            alert("Please enter valid initials (letters only and not empty).");
        }
    });
    
 // Hides highscore table
    highScore.style.display = "none";
    
}
// Populate the high scores table
function displayHighScores() {
    var scores = JSON.parse(localStorage.getItem("scores") || "[]");
    var tableBody = document.querySelector("#highscores-table tbody");
    tableBody.innerHTML = "";
    scores.forEach(function (scoreObject) {
        var row = document.createElement("tr");
        var initialsCell = document.createElement("td");
        initialsCell.textContent = scoreObject.initials;
        var scoreCell = document.createElement("td");
        scoreCell.textContent = scoreObject.score + "/80";
        row.appendChild(initialsCell);
        row.appendChild(scoreCell);
        tableBody.appendChild(row);
    });
}

// Clear the high scores from local storage and update the table
function clearHighScores() {
    localStorage.removeItem("scores");
    displayHighScores();
}

// Add event listener to the clear scores button
var clearScoresBtn = document.querySelector("#clear-scores-btn");
clearScoresBtn.addEventListener("click", clearHighScores);

// Display the high scores table
displayHighScores();

clearScoresBtn.style.backgroundColor = "blue";
clearScoresBtn.style.color = "white";
clearScoresBtn.style.border = "none";
clearScoresBtn.style.fontSize = "13px";
clearScoresBtn.style.cursor = "pointer";
clearScoresBtn.style.marginTop = "20px"
clearScoresBtn.style.borderRadius = "5px";
clearScoresBtn.style.padding = "5px 10px";
clearScoresBtn.style.transition = "transform 0.2s ease-in-out";
clearScoresBtn.style.transform = "scale(1)";

clearScoresBtn.addEventListener("mouseover", function () {
    clearScoresBtn.style.transform = "scale(0.9)";
    clearScoresBtn.style.backgroundColor = "rgb(113, 19, 201)"
});
clearScoresBtn.addEventListener("mouseout", function () {
    clearScoresBtn.style.transform = "scale(1.0)";
    clearScoresBtn.style.backgroundColor = "blue"
});
