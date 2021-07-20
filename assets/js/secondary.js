let scoreList = $('.score-list');
let newPlayerName = localStorage.getItem('player')
let newPlayerScore = localStorage.getItem('time');

let newPlayerArr = [newPlayerName,newPlayerScore];

let totalPlayerArr = [];

//Start Quiz Function

function showScores(){

    let scoreItem = $('<li>');
    
    //Push newPlayerArr to totalPlayerArr
    totalPlayerArr.push(newPlayerArr);

    //Storing totalPlayerArr to localStorage
    localStorage.setItem('totalPlayerArr', JSON.stringify(totalPlayerArr));
    // newPlayerArr = [];
    
    arr = JSON.parse(localStorage.getItem('totalPlayerArr'));

    localStorage.setItem('totalPlayerArr', JSON.stringify(arr));

    // Checks if the totalPlayerArr is blank

    // saveScoreToLocalStorage();

    if(totalPlayerArr[0][0] !== null){

        for (let i = 0; i < arr.length; i++) {
            scoreItem = $('<li>');
            scoreItem.addClass('score-item')
            scoreItem.text(arr[i][0] + ' - ' + arr[i][1]);
            scoreList.append(scoreItem);
        }
    }

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

function saveScoreToLocalStorage(){


}

showScores();