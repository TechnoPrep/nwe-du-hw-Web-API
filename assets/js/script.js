let quizEl = $('#quiz');
let timerEl = $('#timer');
let timeLeft = 100;

const questions = {q1:
    {
        quest1:{}
    }}

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
        // nextQuestion();
        startTimer(false);
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



startQuiz();