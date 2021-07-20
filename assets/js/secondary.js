let scoreList = $('.score-list');
let newPlayerName = localStorage.getItem('player');
let newPlayerScore = localStorage.getItem('time');

let newPlayerArr = [newPlayerName,newPlayerScore];

// let totalPlayerArr = [];

let tempArr = [];

//Start Quiz Function

function showScores(){

    let scoreItem = $('<li>');

    if(newPlayerName !== null && newPlayerScore !== null ){

        //Pull tempArr containing values from totalPlayerArr localStorage
        tempArr = JSON.parse(localStorage.getItem('totalPlayerArr')) || [];

        //Push newPlayerArr to tempArr
        tempArr.push(newPlayerArr);

        localStorage.setItem('totalPlayerArr', JSON.stringify(tempArr))
    }

    totalPlayerArr = JSON.parse(localStorage.getItem('totalPlayerArr')) || [];
    
    for (let i = 0; i < totalPlayerArr.length; i++) {
        scoreItem = $('<li>');

        scoreItem.addClass('score-item')
        scoreItem.text(totalPlayerArr[i][0] + ' - ' + totalPlayerArr[i][1]);
        scoreList.append(scoreItem);
    }

    tempArr = [];

    localStorage.removeItem('player');
    localStorage.removeItem('time');

    //Add Text to the Elements    

    $('#go-back').click(function(event){
        $(window).attr('location', 'index.html');

    });

    $('#clear').click(function(event){
        // Create something remove from localStorage
        localStorage.clear();
        $('.score-item').remove();
    });
    
}

showScores();