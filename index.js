var started = false;
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;


$(document).keypress(e => {
    if(started && !restarted){
        nextSequence();
        restarted = true;
    } else if (!started) {
        if (e.key === "a" || e.key === "A") {
            nextSequence();
            started = true;            
        }
    }
});

$(".btn").click(e => {
    var userChosenColour = e.target.id;
    userClickedPattern.push(userChosenColour);
    animatePress(userChosenColour);
    playSound(userChosenColour);

    if (userClickedPattern.length === gamePattern.length) {
        if (arraysContent()) {
            userClickedPattern = [];
            nextSequence();
        } else {
            gameOver();
        }
    } else {
        checkUserClick();
    }
});

function gameOver() {
    $("#level-title").text("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over");
    playSound("wrong");
    setTimeout(e => {
        $("body").removeClass("game-over");
    }, 200);
    userClickedPattern = [];
    gamePattern = [];
    level = 0;
    restarted = false;
}

function checkUserClick() {
    if (userClickedPattern[userClickedPattern.length - 1] === gamePattern[userClickedPattern.length - 1]) {
        return true;
    } else {
        gameOver();
    }
}

function nextSequence() {
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    setTimeout(function () {
        $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
        playSound(randomChosenColour);
    }, 500);
}

function playSound(sound) {
    var audio = new Audio("sounds/" + sound + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function arraysContent() {
    for (i = 0; i < gamePattern.length; i++) {
        if (gamePattern[i] !== userClickedPattern[i]) {
            return false;
        }
    }
    return true;
}
