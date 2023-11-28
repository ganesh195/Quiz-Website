var questions = [
    {
        q: "Who is the Father of Compter",
        a: "Charles Babbage",
        b: "Ada Lovelace",
        c: "Ken Thompson",
        d: "Roland Carl",
        ans: "a",
        opt1: "b",
        opt2: "d"
    },
    {
        q: "Who invented C++",
        a: "Marian Stroustrup",
        b: "Annemarie Stroustrup",
        c: "Nicholas Edward Stroustrup",
        d: "Bjarne Stroustrup",
        ans: "d",
        opt1: "b",
        opt2: "c"
    },
    {
        q: "Who invented C",
        a: "Bill Ritchie",
        b: "John Ritchie",
        c: "Dennis Ritchie",
        d: "Lynn Ritchie",
        ans: "c",
        opt1: "a",
        opt2: "b"
    },
    {
        q: "Who invented Java",
        a: "Robert Sproull",
        b: "James Gosling",
        c: "Patrick Naughton",
        d: "Mike Sheridan",
        ans: "b",
        opt1: "a",
        opt2: "d"
    },
    {
        q: "Who invented JavaScript",
        a: "Mitchell Baker",
        b: "Chris Beard",
        c: "Brendan Eich",
        d: "Guido van Rossum",
        ans: "c",
        opt1: "a",
        opt2: "b"
    },
    {
        q: "Who invented Python",
        a: "Guido van Rossum",
        b: "Ben Casnocha",
        c: "Chris Yeh",
        d: "Reid Garrett",
        ans: "a",
        opt1: "c",
        opt2: "d"
    },
    {
        q: "Who invented PHP",
        a: "Zeev Suraski",
        b: "Andi Gutmans",
        c: "James Gosling",
        d: "Rasmus Lerdorf",
        ans: "d",
        opt1: "a",
        opt2: "c"
    },
    {
        q: "Who invented HTML",
        a: "Mike Berners-Lee",
        b: "Tim Berners-Lee",
        c: "Alice Berners-Lee",
        d: "Ben Berners-Lee",
        ans: "b",
        opt1: "a",
        opt2: "c"
    },
    {
        q: "Who invented CSS",
        a: "Robert Sproull",
        b: "James Gosling",
        c: "Patrick Naughton",
        d: "Håkon Wium Lie",
        ans: "d",
        opt1: "a",
        opt2: "b"
    },
    {
        q: "Who invented AI",
        a: "John Turing",
        b: "Joan Clarke",
        c: "Alan Turing",
        d: "Tommy Flowers",
        ans: "c",
        opt1: "a",
        opt2: "d"
    },
];

$("#quizBox").hide();
$("#restartQuiz").hide();
$("#nextQuestion").hide();

var pname = "";
var count = 0;
var cid = '';
var points = "";
var len = questions.length;

$("#startQuizBtn").click(function () {
    pname = $("#playerName").val();

    $("#startQuiz").hide();
    $("#quizBox").show();

    if (pname !== "") {
        $("#changePlayerName").text(pname);
    }
    else{
        alert("Please Enter your name");
        $("#quizBox").hide();
        $("#startQuiz").show();
    }

    loadQuestion();
    startTime();
});

function loadQuestion() {
    $("#q").text(questions[count].q);
    $("#a").val(questions[count].a);
    $("#b").val(questions[count].b);
    $("#c").val(questions[count].c);
    $("#d").val(questions[count].d);


    $("#questionNo").text(`Question No. ${count+1}/${len}`) 
}

$(".opt").click(function() {
    cid = $(this).attr("id");

    if(cid == questions[count].ans) {
        $(this).css("background","green");
        points++;
        $("#point").text(`Points: ${points}`);
    }
    else {
        $(this).css("background","red");
        $("#"+questions[count].ans).css("background","green").fadeOut().fadeIn();
    }

    $(".opt").prop("disabled","true");
    $("#nextQuestion").show();

});

$("#nextQuestion").click(function() {
    count++;

    $(".opt").css("background","");
    $(".opt").prop("disabled","");

    if (count >= len){
        $('#quizBox').hide();
        $('#restartQuiz').show();
        $('#finalPoints').text(`Final points: ${points}`);
    }
    else{
        loadQuestion();
    }

    $("#nextQuestion").hide();x

});

$("#restartQuizBtn").click(function() {
    $("#quizBox").show();
    $("#restartQuiz").hide();
    restartQuiz();
    loadQuestion(); 
    startTime();
    
    $("#lifeLine").prop("disabled","");
});

function restartQuiz() {
    count=0;
    points=0;

    $("#point").text("Points: 0");
    $("#questionNo").text(`Question No: ${count+1}/${len}`);

    clearInterval(quizTime);
    $("#time").text("00:00");

}

// $("#restartQuizBtn").click(function() {
//     $("#restartQuiz").hide();
//     $("#startQuiz").show();
// });

var totalmins = 0;
var convertedtosecs = 0;
var remainingmins = 0;
var remainingsecs = 0;
var quizTime = 0;

function startTime() {
    totalmins = 2;
    convertedtosecs = totalmins*60

    function timer() {
        convertedtosecs--;

        remainingmins = Math.floor(convertedtosecs/60);
        remainingsecs = convertedtosecs%60;

        if(remainingmins <=9 && remainingsecs >=0 ){
            remainingmins = "0"+remainingmins;
        }

        if(remainingsecs <=9 && remainingsecs >=0){
            remainingsecs = "0"+remainingsecs;
        }

        $("#time").text(`${remainingmins}:${remainingsecs}`);

        if(convertedtosecs == 0){
            clearInterval(quizTime);
            $("#restartQuiz").show();
            $("#quizBox").hide();
        }
    }
    quizTime = setInterval(timer,1000);
}


$("#lifeLine").click(function() {
    $("#"+questions[count].opt1).val("");
    $("#"+questions[count].opt2).val("");

    $("#"+questions[count].opt1).prop('disabled','true');
    $("#"+questions[count].opt2).prop("disabled",'true');

    $("#lifeLine").prop("disabled","true");
});