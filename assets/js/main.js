let quizEl = $('#quiz');
let timerEl = $('#timer');

let gameDone = false;

let timeLeft = 100;
// let score = localStorage.getItem("time");

let qIndex = 0;

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
    quizEl.append(sQDiv);
    
    sQH2.attr('class', 'quiz-header');
    sQDiv.append(sQH2);
    
    sQText.attr('class', 'quiz-text');
    sQDiv.append(sQText);
    
    sQBtn.attr('class', 'quiz-btn');
    sQDiv.append(sQBtn);

    //Start Timer and Proceed to Questions
    $(sQBtn).click(function(event){
        event.stopPropagation();
        $('#quiz-start').remove();
        startTimer();
        nextQuestion();
    });

}

startQuiz();

//Start Timer Function
function startTimer(){

    // TODO: Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
    
    let timeInterval = setInterval(function () {
      if(!gameDone) {
        timeLeft--;
        timerEl.text('Time Left: ' + timeLeft);
        }
            
      if(timeLeft === 0){
  
        //prevent timer from going past zero
        clearInterval(timeInterval);

        //If Timer Hits Zero, Remove Current Element
        $(`#question-${qIndex}`).remove();

        //Display Score
        displayScore();
      }
      
    },1000);
}

function nextQuestion(){    
    let QuestDiv = $('<div>');
    let QuestH2 = $('<h2>');
    let QuestUl = $('<ol>');
    let AnswerBtn = $('<button>');

    let i = qIndex;

    //Add Text to the Elements
    QuestDiv.attr('id',`question-${i}`);
    quizEl.append(QuestDiv);

    // QuestH2.text(questions[i][0]);
    QuestH2.text(QuestionsObjs[i].quest)
    QuestDiv.append(QuestH2);

    QuestDiv.append(QuestUl);

    //Create the Answers from the question array
    for (let index = 0; index < Object.keys(QuestionsObjs[i]).length; index++) {
        
        //Create a dynamic variable to use for object key
        objKey = `ans${index}`;

        //Check if Object key exists in current object
        if(objKey in QuestionsObjs[i]){

            //Create Answer button
            AnswerBtn = $('<input>');
            AnswerBtn.text(QuestionsObjs[i][objKey]);
            AnswerBtn.addClass('btn answerbutton');
            AnswerBtn.attr('type', 'button')
            AnswerBtn.attr('id', `btn${index}`);
            AnswerBtn.val(QuestionsObjs[i][objKey]);
            QuestUl.append(AnswerBtn);
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

//Check if the Answer is Correct for the Indexed Quesiton
function answerCheck(AnswerToCheck){
    let i = qIndex

    //AnswerToCheck !== QuestionsObj[i].correctAnswer
    if(AnswerToCheck !== QuestionsObjs[i].correct){
        timeLeft -= 10;
    } 

    $(`#question-${i}`).remove()

    qIndex++;

    // Check if there are any more quesitons
    // If false, display score
    if(qIndex < QuestionsObjs.length){
        //Advance To next Question
        nextQuestion();
    } else {
        
        //Pause Timer
        gameDone = true;

        //Display Timer Properly in Time Left
        timerEl.text('Time Left: ' + timeLeft);

        //Store Score in LocalStorage
        localStorage.setItem("time",timeLeft);
        
        //Display Score
        displayScore();
    }

}

function displayScore(){

    let scoreDiv = $('<div>');
    let scoreH2 = $('<h2>');
    let scoreText = $('<p>');
    let scoreForm = $('<form>');
    let scoreFormText = $('<p>')
    let scoreName = $('<input>');
    let scoreSubmit = $('<button>');

    
    //Add Text to the Elements
    scoreDiv.addClass('score')
    quizEl.append(scoreDiv);

    scoreH2.text('You have compelted the Quiz! See Your score below!');
    scoreH2.addClass('score-header')
    scoreDiv.append(scoreH2);

    scoreText.text('Your Final Score is ' + localStorage.getItem('time'));
    scoreText.addClass('score-text')
    scoreDiv.append(scoreText);

    scoreDiv.append(scoreForm);
    scoreFormText.text('Enter Initials: ');
    scoreForm.append(scoreFormText);
    scoreForm.append(scoreName);
    scoreForm.append(scoreSubmit);

    scoreName.attr('id', 'initals');
    scoreName.attr('name', 'initials');
    scoreName.attr('type', 'text');
    

    scoreSubmit.attr('id', 'submit');
    scoreSubmit.text('Submit');
    // scoreSubmit.attr('type', 'submit');

    let playerEl = $('input[name=initials]');
    
    $('#submit').click(function(event){
        event.preventDefault();
        localStorage.setItem('player',playerEl.val());
        $(window).attr('location', 'highscores.html');
    });

}

