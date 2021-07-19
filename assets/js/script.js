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

    $(sQBtn).click(function(event){
        event.stopPropagation();
        $('#quiz-start').remove();
        startTimer();
        nextQuestion();
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
}

function nextQuestion(){    
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
        AnswerBtn = $('<input>')
        AnswerBtn.text(questions[i][index]);
        AnswerBtn.addClass('btn answerbutton');
        AnswerBtn.attr('type', 'button')
        AnswerBtn.attr('id', `btn${index}`);
        AnswerBtn.val(questions[i][index]);
        QuestUl.append(AnswerBtn);

    }

    //return the value of the clicked button
    $('input').click(function(event){
        event.stopPropagation();
        let answer = $(event.target).val();
        console.log(answer);
        answerCheck(answer);
        $(`#question-${i}`).remove()
        qIndex++;
        nextQuestion();
        //qIndex < questions.length ? nextQuestion() : displayScore();
    });


}

//Check if the Answer is Correct for the Indexed Quesiton
function answerCheck(AnswerToCheck){
    let i = qIndex

    if(AnswerToCheck !== correctAnswers[i]){
        timeLeft -= 10;
    } 
}

startQuiz();