/*
* Scrabble JS
* 12/7
* 5pm
* acushing@cs.uml.edu
* Alex Cushing worked with Tyler Bainbridge and James Erardi
* */
var THISISTHETOTALSCORE = 0;
var lettersOnDeck = 0;
var images = "";
var word = new Array(8); //the board where you put the tiles. this is for tracking the word
var tCount = 0;

var scores = [
    {"letter":"A", "value":1, "amount":9},
    {"letter":"B", "value":3, "amount":2},
    {"letter":"C", "value":3, "amount":2},
    {"letter":"D", "value":2, "amount":4},
    {"letter":"E", "value":1, "amount":12},
    {"letter":"F", "value":4, "amount":2},
    {"letter":"G", "value":2, "amount":3},
    {"letter":"H", "value":4, "amount":2},
    {"letter":"I", "value":1, "amount":9},
    {"letter":"J", "value":8, "amount":1},
    {"letter":"K", "value":5, "amount":1},
    {"letter":"L", "value":1, "amount":4},
    {"letter":"M", "value":3, "amount":2},
    {"letter":"N", "value":1, "amount":5},
    {"letter":"O", "value":1, "amount":8},
    {"letter":"P", "value":3, "amount":2},
    {"letter":"Q", "value":10, "amount":1},
    {"letter":"R", "value":1, "amount":6},
    {"letter":"S", "value":1, "amount":4},
    {"letter":"T", "value":1, "amount":6},
    {"letter":"U", "value":1, "amount":4},
    {"letter":"V", "value":4, "amount":2},
    {"letter":"W", "value":4, "amount":2},
    {"letter":"X", "value":8, "amount":1},
    {"letter":"Y", "value":4, "amount":2},
    {"letter":"Z", "value":10, "amount":1}
] //for scores


$(document).ready(function() {
    // printTable();
    populateBoard(); //randomly populates the board with tiles
    JQueryDragDrop(); //initializes the draggables and droppables

});

/**
 * *
 * @param word to convert into score using the array values in scores
 */
function updateScore(word) {
    var totalScore = 0;
    var scoreToAdd = 0;
    var doubleWord = 0;
    //var bool = false;
    //look through the array
    for (var i = 0; i < word.length; i++) {
        //find the letter in the scores array
        for (var j = 0; j < scores.length; j++) {
            //if it's here
            if (word[i] != "" && (word[i] == scores[j].letter)) {
                //if i == 2 (double letter score) then double the value
                if (i == 2) {
                    scoreToAdd = scores[j].value * 2;
                    totalScore += scoreToAdd;
                    //bool = true;
                }if (i == 5) {
                    //bool = false;
                    doubleWord++;
                    scoreToAdd = scores[j].value;
                    totalScore += scoreToAdd;
                }if(i!=2 && i!=5) //else, just add the score normally
                {
                    //if(bool!=true) {
                        totalScore += scores[j].value
                    //}
                }
            }
        }
    }
    if(doubleWord!=0)
    {
        totalScore = totalScore * 2;
    }
    //put it in the score div
    document.getElementById('score').innerHTML = totalScore.toString();
}

function JQueryDragDrop(){
    //allow the tiles to be dropped back on the rack
    $("#rack").droppable({ accept: '.rack_blocks', out:Letters});
    function Letters(event, ui){
        lettersOnDeck--;
    }

    //rack blocks (the letters) are draggable and snap to board blocks in the inside, if it's not a valid droppable then revert
    $( ".rack_blocks" ).draggable({ snap: ".board_blocks", snapMode: "inner", revert: 'invalid'/*, drag:reset*/ });

    /*function reset(event, ui){
        ui.draggable.draggable({revert:true});
    }*/
    //if they're being dragged , make that array slot blank
    function Drag (event, ui) {
        if(ui.draggable.attr("id") == word[$(this).attr("id")]) {
            //remove tile from board
            word[$(this).attr("id")] = ""; //make it blank
            tCount--;
            updateWord(word);
        }
    }

    //you can drag the rack blocks onto the board(.board_blocks)
    $(".board_blocks").droppable({ accept: '.rack_blocks', drop: Drop, out:Drag });

    //run this function when a tile is dropped
    function Drop(event, ui){
        var letter =  ui.draggable.prop('id');          //take the ID of the draggable(letter tile) and assign it to letter
        var element =  $(this).attr("id");              //take the ID of the droppable(the board tile) and assign it to element
        var number = parseInt(element);                 //make sure it's an int and not a string

        if(typeof word[number-1] === 'undefined' && typeof word[number+1] === 'undefined' && tCount!= 0)
        {
            //ui.draggable.draggable({revert:true});
            //tCount--;
            document.getElementById('word').innerHTML = "YOUR WORD MUST BE ONE STRING WITH NO SPACES";


        }else{
            tCount++;
            word[number] = letter;
            updateWord(word);
        }


    }
}
//refreshes the page to reset tiles and board
function refreshPage(){
    window.location.reload();
}

//randomly pick tiles to add to board
function populateBoard()
{
    var letter;
    var random;
    var lettersToAdd  = 7 - lettersOnDeck;

    //we want seven tiles so add seven
    for(var i = 0; i < lettersToAdd; i++)
    {
        random = Math.floor((Math.random() * 25));      //random number 1-25
        letter = scores[random].letter;                 //letter = the letter at the random spot in the scores array
        console.log(random);
        $("#rack").append(" <img id=\""+ letter + "\" class=\"rack_blocks\" src=\"images/" + letter + ".png\">") //dynamically create images in the #rack div
        lettersOnDeck++;
    }
    lockWord();
    console.log(images);

    JQueryDragDrop(); //refresh the draggable code
}

//should be called lock down word but its not lol
function lockWord(){
    var object ="";
    //go through the entire word
    for(var i = 0; i <= word.length; i++)
    {
        //if the word slot isnt a letter do nothing
        if(typeof word[i] === 'undefined')
        {

        }else{ //if it's a letter find that ID and make it undraggable (locked)
            $("#" + word[i]).draggable( 'disable' )
        }
    }

}

//go through the board and search for a word
//this has a stupid parameter name
function updateWord(varDraggableId){
    var currentword = "";
    for(var i=0; i<varDraggableId.length; i++){
        if(typeof varDraggableId[i] === 'undefined')
        {

        }else{
            currentword+=varDraggableId[i];
        }
    }
    if(currentword)
    {
        document.getElementById('word').innerHTML = currentword;
        updateScore(word);
        submitWord();
    }
}

//for a table, not sure if ill use this
function printTable()
{
    var string = "";
    var blank = "class=\"board_blocks\" src=\"images/blank.png\">";
    string = string + "<br>";
    string = string + "<table>"; //opening the table
    var tableCell = 0;
    for(var i = 0; i<4; i++)
    {
        string = string + "<tr>";
        for(var j = 0; j<4; j++)
        {
            tableCell++;
            string = string + "<th>";
            string = string + "<img id=\"" + tableCell + "\"" + blank;
            string = string + "</th>";
        }
        string = string + "</tr>";
    }
    string = string + "</table>";
    console.log(string);
    document.getElementById('board').innerHTML = string;
}

// The dictionary lookup object
var dict = {};

// Do a jQuery Ajax request for the text dictionary
$.get( "dict/dictionary.txt", function( txt ) {
    // Get an array of all the words
    var words = txt.split( "\n" );

    // And add them as properties to the dictionary lookup
    // This will allow for fast lookups later
    for ( var i = 0; i < words.length; i++ ) {
        dict[ words[i] ] = true;

    }
});


// document.getElementById('word').innerHTML = cLabel;
//document.getElementById('word').innerHTML = label;

//submitting the next word function
function submitWord(){
    var cLable= word+" IS A CORRECT WORD!"
    var label = word + " IS NOT A WORD";
    findWord();
    var submittedWord = document.getElementById('word').innerHTML;
    console.log("submitted word: " + submittedWord);
    submittedWord = submittedWord.toLowerCase();
    if ( dict[submittedWord] ) {

        console.log("this is a real word!");
        document.getElementById('word').innerHTML = "this is a real word!";
    }else{
        console.log("this is a not a real word.");
        document.getElementById('word').innerHTML = "this is a not a real word: " + submittedWord;
    }

}

// Modified to only pass in one word, which can then be verified.
function findWord( word ) {
    // See if it's in the dictionary
    if ( dict[ word ] ) {
        // If it is, return that word
        return word;
    }

    // Otherwise, it isn't in the dictionary.
    return "_____";
}

function newTiles()
{
    if(document.getElementById('word').innerHTML === "this is a real word!")
    {
        THISISTHETOTALSCORE += parseInt(document.getElementById('score').innerHTML);
        document.getElementById('totalScore').innerHTML = "Total score: " + THISISTHETOTALSCORE;
        restart();
    }else{
        alert("Please submit a valid word and try again, ALSO MAKE SURE YOU LOCK YOUR WORD IN BEFORE YOU CLEAR THE WORD!");
    }

}

/**
 * refresh the hand and the board and the messages
 * this function is to restart utilized when moving to the next round
 */
function restart()
{
    var letter;
    var random;
    var lettersToAdd  = 7;
    var string ="";

    lettersOnDeck = 7;

    for(var i =0; i<word.length;i++)
    {
        word[i]="";
    }

    //we want seven tiles so add seven
    for(var i = 0; i < 7; i++)
    {
        random = Math.floor((Math.random() * 25));      //random number 1-25
        letter = scores[random].letter;                 //letter = the letter at the random spot in the scores array
        console.log(random);
        string = string + (" <img id=\""+ letter + "\" class=\"rack_blocks\" src=\"images/" + letter + ".png\">"); //dynamically create images in the #rack div
    }

    console.log(images);

    document.getElementById('rack').innerHTML = string;
    JQueryDragDrop(); //refresh the draggable code

    document.getElementById('score').innerHTML = " ";
    document.getElementById('word').innerHTML = " ";

}