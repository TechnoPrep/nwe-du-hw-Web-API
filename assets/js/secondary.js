let scoreList = $('.score-list');
let newPlayerName = localStorage.getItem('player');
let newPlayerScore = localStorage.getItem('time');

let newPlayerArr = [newPlayerName,newPlayerScore];

let tempArr = [];

//Start Quiz Function

function showScores(){

    let scoreItem = $('<li>');

    //Add values to tempArr only if condition is met
    if(newPlayerName !== null && newPlayerScore !== null ){

        //Pull tempArr containing values from totalPlayerArr localStorage
        tempArr = JSON.parse(localStorage.getItem('totalPlayerArr')) || [];

        //Push newPlayerArr to tempArr
        tempArr.push(newPlayerArr);

        //Push tempArr back 
        localStorage.setItem('totalPlayerArr', JSON.stringify(tempArr))
    }

    //Pull array from localStorage
    totalPlayerArr = JSON.parse(localStorage.getItem('totalPlayerArr')) || [];

    //Sort by the Highest Score
    sortedArr = totalPlayerArr.sort(function(a,b){
        return b[1] - a[1];
    })
    
    for (let i = 0; i < sortedArr.length; i++) {
        scoreItem = $('<li>');

        scoreItem.addClass('score-item')
        scoreItem.text(sortedArr[i][0] + ' - ' + sortedArr[i][1]);
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