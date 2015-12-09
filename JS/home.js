/**
 * Created by Alex on 11/3/2015.
 *copyright UML
 *last edited 11/18 at 12 am
 *alexander_cushing@student.uml.edu
 */


/*validator*/
jQuery.validator.setDefaults({
    debug: true,
    success: "valid"
});

$(document).ready(function () {
    /*validation to make sure the fields are filled out and only numbers*/
    $( "#multGraph" ).validate({
        rules: {
            /*first input*/
            "field": {
                required: true,
                number: true
            },
            /*second input*/
            "field2": {
                required: true,
                number: true
            },
            /*third input*/
            "field3": {
                required: true,
                number: true
            },
            /*fourth input*/
            "field4": {
                required: true,
                number: true
            }
        },
        /*message fields that will create a css style for the output and have text for specific errors:*/
        messages: {
            /*error output for first input**/
            "field": {
                required: "<br><small id=\"output\">Please type a number in the first box</small>",
                number: "<br><small id=\"output\">You must only input a number value in the first box</small>"
            },
            /*error output for 2nd input*/
            "field2": {
                required: "<br><small id=\"output\">Please type a number in the second box</small>",
                number: "<br><small id=\"output\">You must only input a number value in the second box</small>"
            },
            /*error output for 3rd input*/
            "field3": {
                required: "<br><small id=\"output\">Please type a number in the third box</small>",
                number: "<br><small id=\"output\">You must only input a number value in the third box</small>"
            },
            /*error output for 4th input*/
            "field4": {
                required: "<br><small id=\"output\">Please type a number in the fourth box</small>",
                number: "<br><small id=\"output\">You must only input a number value in the fourth box</small>"
            }
        },
        //errorElement : 'div',
        //errorLabelContainer: '.errorTxt'
    });
});

/*this function will set the text box values to the slider location value*/

function setToPointVal(){
    var one = document.getElementById('points').value; //this is the users slider value for the first number (etc all the way down to the 4th number)
    var two = document.getElementById('points2').value;
    var three = document.getElementById('points3').value;
    var four = document.getElementById('points4').value;
    var fone = document.getElementById('field').value; //this is the users inputted value for the first number (etc all the way down to the 4th number)
    var ftwo = document.getElementById('field2').value;
    var fthree = document.getElementById('field3').value;
    var ffour = document.getElementById('field4').value;


    document.getElementById('points').value = fone; //sets the value of slider to whatever the user inputted
    document.getElementById('points2').value = ftwo;//sets the value of slider to whatever the user inputted
    document.getElementById('points3').value = fthree;//sets the value of slider to whatever the user inputted
    document.getElementById('points4').value = ffour;//sets the value of slider to whatever the user inputted
}
/*this will set the slider location to the corresponding text box inputted value*/
function fillTextBox(){
    var one = document.getElementById('points').value; //this is the users slider value for the first number (etc all the way down to the 4th number)
    var two = document.getElementById('points2').value;
    var three = document.getElementById('points3').value;
    var four = document.getElementById('points4').value;
    var fone = document.getElementById('field').value; //this is the users inputted value for the first number (etc all the way down to the 4th number)
    var ftwo = document.getElementById('field2').value;
    var fthree = document.getElementById('field3').value;
    var ffour = document.getElementById('field4').value;


    document.getElementById('field').value = one; //sets the value of slider to whatever the user inputted
    document.getElementById('field2').value = two;//sets the value of slider to whatever the user inputted
    document.getElementById('field3').value = three;//sets the value of slider to whatever the user inputted
    document.getElementById('field4').value = four;//sets the value of slider to whatever the user inputted
}

/*function that creates html code for the table to correctly make a multiplication table*/
function graphTabs() {
    var one = document.getElementById('points').value; //this is the users slider value for the first number (etc all the way down to the 4th number)
    var two = document.getElementById('points2').value;
    var three = document.getElementById('points3').value;
    var four = document.getElementById('points4').value;
    var myString = ":";
    var builder = "";
    var div = "";
    var divclose = "";


    var i;//first for loop and inner for loop
    var j;//outer for loop
    var array = [one, two, three, four]//the array for each of the 4 numbers
    var enterBreak = "<br>"//new line
    var openTable = "<table>";//new table
    var closeTable = "</table>";//end table
    var openRow = "<tr>";//new row
    var closeRow = "</tr>";//end row
    var openCol = "<th>";//new column
    var closeCol = "</th>";//end column
    var string = "<center>Results: ";//entered results
    var closeCenter = "</center>";//end center

    var dispSec = "<p id=\"result";
    dispSec+= y;
    dispSec+= "\"> </p>";

    document.getElementById("result").innerHTML += dispSec;


    myString = myString +" " + one+" x " + two+" x " + three+" x " + four;

    /*the following builder additions creates html code for a dynamic table creator, named according to each
     of the 4 parameters inputted  using text or the sliders for the table*/

    builder += "<li ";
    builder+="id=\"";
    builder+= x;
    builder+="\"><a href='#tab"
    builder += x;
    builder += "'>";
    //builder += "tab"+x ;
    builder+= "Tab "+x + myString;
    builder+="</a></li><br>";

    /*the following div var is for writing code that will be a div that is different for each graph that the user submits*/

    div += "<div class=\"tabContent\" id=\"tab";
    div += z;
    div +="\">";


    if (!isNaN(one) & !isNaN(two) & !isNaN(three) & !isNaN(four)) { //if any of thr input is non-numeric go to else

        if(!one|| !two|| !three|| !four){ //this checks if there is in fact input in the text box and if not it gives the message for the user to input something
            string = "please input number values, no empty space" + closeCenter;
            document.getElementById("result").innerHTML = string;
        }
        else {

            string = string + enterBreak + enterBreak;
            string = string + openTable; //opening the table

            string = string + openRow + openCol + " " + closeCol; //for (1,1) and starts a row
            for (j = 0; j < array.length; j++) //for the first row(printing the original four numbers)
            {
                string = string + openCol + array[j] + closeCol //prints the first number (i, 1)
            }

            string = string + closeRow;
            /*loop that goes through the array and makes a string to put into html*/
            /*actually creates html code for a table*/
            for (i = 0; i < array.length; i++) {
                string = string + openRow;
                string = string + openCol + array[i] + closeCol;
                for (j = 0; j < array.length; j++) {
                    string = string + openCol;
                    string = string + (array[j] * array[i]) + closeCol;
                }
                string = string + closeRow;
            }
            divclose+= "</div>";
            string = string + closeTable + "</center>";
            string = div + string + divclose;
            document.getElementById("result"+y).innerHTML = string;
        }
    }
    else{
        string = "please input number values only" + closeCenter;
        document.getElementById("result"+y).innerHTML = string;
    }

    z= z + 1;//adds to z
    document.getElementById("tabSetup").innerHTML += builder;//adds the builder string to the HTML file
    x= x + 1;//adds to x
    y=y+1;//adds to y
}

/*
function selectTab(num) {
    for (var i=1; i <= x; i++) {
        document.getElementById("tab" + i).className = "";
        document.getElementById("box" + i).className = "infobox";
    }
    document.getElementById("tab" + num).className = "selected";
    document.getElementById("box" + num).className = "infobox enabled";
}
*/
/*this is so that the user can see the value of each text box whether using the slider or box input form*/
function displayVal() {
    var one = document.getElementById('points').value; //this is the users slider value for the first number (etc all the way down to the 4th number)
    var two = document.getElementById('points2').value;
    var three = document.getElementById('points3').value;
    var four = document.getElementById('points4').value;
    document.getElementById("field").innerHTML = one;//these show in the text box, the value of the slider variable
    document.getElementById("field2").innerHTML = two;
    document.getElementById("field3").innerHTML = three;
    document.getElementById("field4").innerHTML = four;
}

/*JQuery tabs for creating tabs on the go*/
$(function (x) {
    $("#Mytabs").append(
        "<li><a href=tab +x></a>"
    );
    $("div#Mytabs").tabs("refresh");
});

function myDelete(){
    var val = document.getElementById('delete').value;
    var string="tab";
    string+=val;

    var final = document.getElementById(string);
    final.innerHTML = 'This graph has been deleted';
}