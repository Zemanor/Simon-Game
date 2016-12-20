function turn() {
    checkForWin();
    if (gameState.player1Turn === false) {
        return false;
    }
    gameState.player1Turn = false;
    addToPattern();
    cyclePattern();
    chgDisplay();
    reloadQueue();
    console.log(gameState.queue);
    setTimeout(function() {
        gameState.player1Turn = true;
    }, gameState.pattern.length * 800);
}

function cyclePattern() {
    var maxLoops = gameState.pattern.length - 1;
    var pushedBtn = -1;
    (function next() {
        if (pushedBtn++ >= maxLoops) return;
        setTimeout(function() {
            activateBtn(gameState.pattern[pushedBtn]);
            next();
        }, 600);
    })();

}

function reloadQueue() {
    gameState.queue = gameState.pattern.slice();
}

function queueIsFinished() {
    if (gameState.queue.length === 0) return true;
    else return false;
}

function callFnWithDelay(fn, delayTime) {
    setTimeout(fn, delayTime);
}

function p1CompareBtnPress(id) {
    if (!isP1Turn()) {
        return false;
    }
    if (gameState.queue[0] !== id) {
        if (gameState.strictEnabled) {
            wrongPattern();
            callFnWithDelay(resetGame, 1000);
        }
        else
            wrongPattern();
        reloadQueue();
    }
    else if (gameState.queue[0] === id) {
        rightPattern();
        isRoundComplete();
    }
}

function wrongPattern() {
    $(".display").text("!!");
    console.log("wrong button!!");
    cyclePatternDelayed();
    setTimeout(function() {
        chgDisplay();
    }, 1000);
}

function rightPattern() {
    console.log("pattern match!!");
    gameState.queue.shift();
}

function isRoundComplete() {
    if (queueIsFinished()) {
        console.log("round complete!");
        reloadQueue();
        setTimeout(function() {
            turn();
        }, 1000);
    }
}

function cyclePatternDelayed() {
    gameState.player1Turn = false;
    setTimeout(function() {
        cyclePattern();
        setTimeout(function() {
            gameState.player1Turn = true;
        }, gameState.pattern.length * 800 + 300);
    }, gameState.pattern.length * 800);
}

function chgDisplay() {
    $(".display").text(gameState.pattern.length);
}

function isP1Turn() {
    return gameState.player1Turn;
}

function startBtn() {
    if (gameState.running === false || gameState.gameStarted === true) {
        return false;
    }
    gameState.gameStarted = true;
    turn();
}

function strictBtn() {
    if (gameState.running === false || gameState.gameStarted === true) {
        return false;
    }
    if (gameState.strictEnabled === true) {
        gameState.strictEnabled = false;
        $(".dot").removeClass("strictEnabled");
    }
    else if (gameState.strictEnabled === false) {
        gameState.strictEnabled = true;
        $(".dot").addClass("strictEnabled");
    }
    console.log(gameState.strictEnabled);

}

function addToPattern() {
    gameState.pattern.push(returnRandBtnId());
}

function returnRandBtnId() {
    var ids = ["quadrant-Green", "quadrant-Red", "quadrant-Blue", "quadrant-Yellow"];
    var whichId = Math.ceil(Math.random() * 4 - 1);
    return ids[whichId];
}
/*---------------big buttons functionality (no unit tests)---------------*/
function activateBtn(id) {
    if (gameState.running === false) {
        return false;
    }
    if (id === "quadrant-Green") {
        greenBtn(id);
    }
    if (id === "quadrant-Red") {
        redBtn(id);
    }
    if (id === "quadrant-Blue") {
        blueBtn(id);
    }
    if (id === "quadrant-Yellow") {
        yellowBtn(id);
    }
}

function greenBtn(id) {
    $("#" + id).addClass('flashGreen');
    playAudio(1);
    setTimeout(function() {
        $("#" + id).removeClass('flashGreen');
    }, 400);
}

function redBtn(id) {
    $("#" + id).addClass('flashRed');
    playAudio(2);
    setTimeout(function() {
        $("#" + id).removeClass('flashRed');
    }, 400);
}

function blueBtn(id) {
    $("#" + id).addClass('flashBlue');
    playAudio(3);
    setTimeout(function() {
        $("#" + id).removeClass('flashBlue');
    }, 400);
}

function yellowBtn(id) {
    $("#" + id).addClass('flashYellow');
    playAudio(4);
    setTimeout(function() {
        $("#" + id).removeClass('flashYellow');
    }, 400);
}

function playAudio(num) {
    var audio = document.getElementById("audio" + num);
    audio.play();
}
/*----------------------------power switch----------------------------*/
function onOffSwitch() {
    if ($("#on-off-toggle").is(':checked')) {
        resetGame();
        powerOff();
    }
    else powerOn();
}

function powerOn() {
    $(".display").text("--");
    gameState.running = true;
}

function powerOff() {
    $(".display").text("");
    gameState.running = false;
    gameState.strictEnabled = false;
    $(".dot").removeClass("strictEnabled");
}
/*----------------------------When Game Is Won----------------------------*/
function checkForWin() {
    if ($(".display").text() === "20") {
        $(".display").text("win");
        gameState.player1Turn = false;
        winFlash();
        callFnWithDelay(resetGame, 2000);
    }
}

function resetGame() {
    gameState.pattern = [];
    gameState.queue = gameState.pattern;
    gameState.gameStarted = false;
    gameState.player1Turn = null;
    $(".display").text("--");
}

function winFlash() {
    $("#quadrant-Green").addClass('flashGreen');
    setTimeout(function() {
        $("#quadrant-Green").removeClass('flashGreen');
    }, 400);
    setTimeout(function() {
        $("#quadrant-Red").addClass('flashRed');
        setTimeout(function() {
            $("#quadrant-Red").removeClass('flashRed');
        }, 400);
    }, 400);
    setTimeout(function() {
        $("#quadrant-Blue").addClass('flashBlue');
        setTimeout(function() {
            $("#quadrant-Blue").removeClass('flashBlue');
        }, 400);
    }, 800);
    setTimeout(function() {
        $("#quadrant-Yellow").addClass('flashYellow');
        setTimeout(function() {
            $("#quadrant-Yellow").removeClass('flashYellow');
        }, 400);
    }, 1200);
    setTimeout(function() {
        $("#quadrant-Green").addClass('flashGreen');
        setTimeout(function() {
            $("#quadrant-Green").removeClass('flashGreen');
        }, 400);
    }, 1600);

}
