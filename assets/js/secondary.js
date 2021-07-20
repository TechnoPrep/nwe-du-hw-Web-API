let scoreList = $('.score-list');

let newPlayerName = localStorage.getItem('player');
let newPlayerScore = localStorage.getItem('time');

let newPlayerObj = {};
let tempArr = [];

newPlayerObj.player = newPlayerName;
newPlayerObj.score = newPlayerScore;

//Start Quiz Function

function showScores(){

    let scoreItem = $('<li>');

    //Add values to tempArr only if condition is met
    if(newPlayerName !== null && newPlayerScore !== null ){

        //Pull tempArr containing values from totalPlayerArr localStorage
        tempArr = JSON.parse(localStorage.getItem('totalPlayerArr')) || [];

        //Push newPlayerArr to tempArr
        tempArr.push(newPlayerObj);

        //Push tempArr back 
        localStorage.setItem('totalPlayerArr', JSON.stringify(tempArr))
    }

    //Pull array from localStorage
    totalPlayerArr = JSON.parse(localStorage.getItem('totalPlayerArr')) || [];

    //Sort by the Highest Score
    sortedArr = totalPlayerArr.sort(function(a,b){
        return b.score - a.score;
    })
    
    //Create List Elements
    for (let i = 0; i < sortedArr.length; i++) {
        scoreItem = $('<li>');

        scoreItem.addClass('score-item')
        scoreItem.text(sortedArr[i].player + ' - ' + sortedArr[i].score);
        scoreList.append(scoreItem);
    }

    //clear tempArr and remove player and time from localStorage to not cause duplicates on page refresh
    tempArr = [];
    localStorage.removeItem('player');
    localStorage.removeItem('time');

    //Return to Home page
    $('#go-back').click(function(event){
        $(window).attr('location', 'index.html');
    });

    //Clear current Highscores.
    $('#clear').click(function(event){
        // Create something remove from localStorage
        localStorage.clear();
        $('.score-item').remove();
    });
    
}

showScores();