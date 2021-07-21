let quizEl = $('#quiz');
let timerEl = $('#timer');

let gameDone = false;

let timeLeft = 100;

let qIndex = 0;

let totalCorrect = 0;
let totalWrong = 0;
let score = 0;

const QuestionsObjs = [
    {
        quest: "Commonly used data types DO NOT include: ",
        ans1: "strings",
        ans2: "booleans",
        ans3: "alerts",
        ans4: "numbers",
        correct: "alerts"
    },
    {
        quest: "Arrays in JavaScript can be used to store _____.",
        ans1: "numbers and strings",
        ans2: "other arrays",
        ans3: "booleans",
        ans4: "all of the above",
        correct: "all of the above"
    },
    {
        quest: "The condition in an if / else statement is enclosed within _____.",
        ans1: "quotes",
        ans2: "curly brackets",
        ans3: "parenthesis",
        ans4: "square brackets",
        correct: "parenthesis"
    },
    {
        quest: "String values must be enclosed within _____ when being assigned to variables",
        ans1: "commas",
        ans2: "curly brackets",
        ans3: "quotes",
        ans4: "parenthesis",
        correct: "quotes"
    }
    
]

//Start Quiz Function

function startQuiz(){
    //Create Start Quiz Page Elements
    let sQDiv = $('<div>');
    let sQH2 = $('<h2>');
    let sQText = $('<p>');
    let sQBtn = $('<button>')

    //Add Text to the Elements
    sQH2.text('Coding Quiz Challenge');
    sQText.text('Try to answer the following code-related questions within the time limit Keep in mind that incorrect answer will penalize your scrore/time by then seconds!');
    sQBtn.text('Start Quiz');

    //Append Elements to quizEl and add Attr
    sQDiv.attr('id', 'quiz-start')
    sQDiv.attr('class', 'start-page center')
    quizEl.append(sQDiv);
    
    sQH2.addClass('quiz-header retro');
    sQDiv.append(sQH2);
    
    sQText.attr('class', 'quiz-text');
    sQDiv.append(sQText);
    
    sQBtn.addClass('btn quiz-btn');
    sQDiv.append(sQBtn);

    //Start Timer and Proceed to Questions
    $(sQBtn).click(function(event){
        event.stopPropagation();
        $('#quiz-start').remove();
        timer();
        nextQuestion();
    });

}

startQuiz();

function timer(){

    // TODO: Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
    
    let timeInterval = setInterval(function () {
      if(!gameDone) {
        timeLeft--;
        timerEl.text('Time Left: ' + timeLeft);
        }

      if(timeLeft === 0 || timeLeft < 0){
        
        //Set timeLeft to 0
        timeLeft = 0;
        timerEl.text('Time Left: ' + timeLeft);

        //Prevent timer from going past zero
        clearInterval(timeInterval);

        //If Timer Hits Zero, Remove Current Element
        gameOver();

      }
      
    },1000);
}

function nextQuestion(){    
    let QuestDiv = $('<div>');
    let QuestH2 = $('<h2>');
    let QuestUl = $('<ol>');
    let AnswerBtn = $('<button>');

    //Add Text to the Elements
    QuestDiv.attr('id',`question-${qIndex}`);
    QuestDiv.addClass('question center');


    quizEl.append(QuestDiv);

    QuestH2.text(QuestionsObjs[qIndex].quest)
    QuestH2.addClass('retro')
    QuestDiv.append(QuestH2);

    QuestUl.addClass('ans-list')
    QuestDiv.append(QuestUl);

    //Create the Answers from the question array
    for (let index = 0; index < Object.keys(QuestionsObjs[qIndex]).length; index++) {
        
        //Create a dynamic variable to use for object key
        objKey = `ans${index}`;

        //Check if Object key exists in current object
        if(objKey in QuestionsObjs[qIndex]){

            //Create Answer button
            AnswerBtn = $('<input>');
            AnswerBtn.text(QuestionsObjs[qIndex][objKey]);
            AnswerBtn.addClass('btn');
            AnswerBtn.attr('type', 'button')
            AnswerBtn.attr('id', `btn${index}`);
            AnswerBtn.val(QuestionsObjs[qIndex][objKey]);

            QuestLi = $('<li>');
            QuestLi.addClass('ans-item')
            QuestLi.append(AnswerBtn);

            QuestUl.append(QuestLi);
        }
    }

    //return the value of the clicked button
    $('input').click(function(event){

        event.stopPropagation();

        //Creates answer value to pass through answerCheck function
        let answer = $(event.target).val();
        answerCheck(answer);

    });

}

//Check answerToCheck against the selected objects 'correct' objKey
function answerCheck(AnswerToCheck){

    //AnswerToCheck !== QuestionsObj[i].correctAnswer
    //If Answer is wrong increment totalWrong to increase penalty
    if(AnswerToCheck !== QuestionsObjs[qIndex].correct){
        
        totalWrong++

        let decrease = totalWrong * 10;

        timeLeft -= decrease;

    } else {

        totalCorrect++;

    }

    //Remove Current Question
    $(`#question-${qIndex}`).remove()

    //Increment qIndex to advance to the next question
    qIndex++;

    //Prevent timeLeft from going below 0 by answer Questions incorrectly
    if(timeLeft < 0){
        timeLeft = 0;
    }

    // Check if there are any more quesitons
    // If false, display score
    if(qIndex < QuestionsObjs.length){
        //Advance To next Question
        nextQuestion();

    } else if(totalWrong === QuestionsObjs.length){
        
        //Pause Timer
        pauseTimer();

        //run timer
        timer();


    } else if(timeLeft < 0) {

        timer();

    }else {
        
        pauseTimer();
        
        //Display Score
        displayScore();
    }

}

function displayScore(){

    let scoreDiv = $('<div>');
    let scoreH2 = $('<h2>');
    let scoreH3 = $('<h3>');
    let scoreText = $('<p>');
    let scoreForm = $('<form>');
    let scoreFormText = $('<p>')
    let scoreFormLine = $('<p>')
    let scoreName = $('<input>');
    let scoreSubmit = $('<button>');

    let time = localStorage.getItem('time');

    let score = (totalCorrect + time) * 252;

    localStorage.setItem('score', score);
    
    //Add Text to the Elements
    scoreDiv.addClass('score center')
    quizEl.append(scoreDiv);

    scoreH2.text('You have completed the Quiz!');
    scoreH3.text('See Your score below!')
    scoreH2.addClass('score-header retro')
    scoreDiv.append(scoreH2);
    scoreH2.append(scoreH3);

    scoreText.text('Your Final Score is ' + localStorage.getItem('score'));
    scoreText.addClass('score-text')
    scoreDiv.append(scoreText);

    scoreDiv.append(scoreForm);
    scoreFormText.text('Enter Initials: ');
    scoreForm.append(scoreFormText);
    scoreForm.append(scoreName);
    scoreForm.append(scoreFormLine)
    scoreFormLine.append(scoreSubmit);

    scoreName.attr('id', 'initals');
    scoreName.attr('name', 'initials');
    scoreName.attr('type', 'text');
    scoreName.addClass('initials')
    

    scoreSubmit.attr('id', 'submit');
    scoreSubmit.addClass('btn');
    scoreSubmit.text('Submit');
    scoreSubmit.attr('type', 'submit');

    let playerEl = $('input[name=initials]');
    
    $('#submit').click(function(event){
        event.preventDefault();
        localStorage.setItem('player',playerEl.val());
        $(window).attr('location', 'highscores.html');
    });

}

function pauseTimer(){
    //Pause Timer
    gameDone = true
    //Display Timer Properly in Time Left
    timerEl.text('Time Left: ' + timeLeft);
    //Store Score in LocalStorage
    localStorage.setItem("time",timeLeft);
}

function gameOver(){

    $(`#question-${qIndex}`).remove();

    let gameOverDiv = $('<div>');
    let gameOverH2 = $('<h2>');
    let gameOverText = $('<p>');
    let gameOverSubmit = $('<button>');
    
    //Add Text to the Elements
    gameOverDiv.addClass('gameOver center')
    
    gameOverH2.text('GAME OVER!');
    gameOverH2.addClass('gameOver-header retro')

    gameOverText.text('Would you like to play again?');
    gameOverText.addClass('gameOver-text')

    gameOverSubmit.attr('id', 'try-again');
    gameOverSubmit.addClass('btn');
    gameOverSubmit.text('Try Again');

    quizEl.append(gameOverDiv);
    gameOverDiv.append(gameOverH2);
    gameOverDiv.append(gameOverText);
    gameOverDiv.append(gameOverSubmit);    


    // gameOverSubmit.attr('type', 'submit');
    
    $('#try-again').click(function(event){
        event.preventDefault();
        window.location.reload();
    });

}

