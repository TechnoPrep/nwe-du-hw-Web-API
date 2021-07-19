let quizEl = $('#quiz');
let timerEl = $('#timer');


let timeLeft = 100;
let qIndex = 0;

const questions = [
    ['Commonly used data types DO NOT include: ','strings','booleans','alerts','numbers'],
    ['Arrays in JavaScript can be used to store _____.','numbers and strings', 'other arrays','booleans','all of the above'],
    ['The condition in an if / else statement is enclosed within _____.', 'quotes','curly brackets','parenthesis','square brackets'],
    ['String values must be enclosed within _____ when being assigned to variables', 'commas','curly brackets','quotes','parenthesis']
]

const correctAnswers = ['alerts','all of the above','parenthesis','quotes']

let answer = '';

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

    $(sQBtn).click(function(){
        $('#quiz-start').remove();
        startTimer();
        Question();
    });

    
}

//Start Timer Function
function startTimer(answerResult){

    // TODO: Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
    let timeInterval = setInterval(function () {
      timeLeft--;
      timerEl.text('Time Left: ' + timeLeft);
      
      
      if(timeLeft === 0){
  
        // timerEl.textContent = '';
  
        clearInterval(timeInterval);
  
      }
      //
    },1000);

    if(answerResult === false){
        timeLeft -= 10;
    }
}

function Question(){    
    let QuestDiv = $('<div>');
    let QuestH2 = $('<h2>');
    let QuestUl = $('<ul>');
    let AnswerBtn = $('<button>');

    let i = qIndex;

    //Add Text to the Elements
    QuestDiv.attr('id',`question-${i}`);
    quizEl.append(QuestDiv);

    QuestH2.text(questions[i][0]);
    QuestDiv.append(QuestH2);

    QuestDiv.append(QuestUl);

    //Create the Answers from the question array
    for (let index = 1; index < questions[i].length; index++) {
        AnswerBtn = $('<button>')
        AnswerBtn.text(questions[i][index]);
        AnswerBtn.addClass('btn answerbutton');
        AnswerBtn.attr('data-answer', `a-${index}`);
        AnswerBtn.attr('value', questions[i][index]);
        QuestUl.append(AnswerBtn);

    }

    $(AnswerBtn).click(function(event){
        answer = $(event.target).attr('answerbutton');
        console.log(answer);
    });


}



startQuiz();