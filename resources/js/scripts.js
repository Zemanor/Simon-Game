var gameState = {};
gameState.running = true; //on/off switch
gameState.strictEnabled = false; //strict mode
gameState.gameStarted = false; //start button
gameState.pattern = []; //push big button IDs onclick & then make a var that starts at 0 and increments per pattern item. Then run a function that checks pattern[variable] against the last pressed button. Simple and easy
gameState.player1Turn = null;
gameState.queue = gameState.pattern;

$(".quadrant").on("click", function() {
    var id = $(this).attr('id');
    if (gameState.player1Turn === false) {
        return false;
    }
    else if (gameState.player1Turn === null) {
         activateBtn(id);
    }
    else activateBtn(id); p1CompareBtnPress(id);
});

$(".on-off-switch").on("click", function() {
    onOffSwitch();
})
$(".btn-Start").on("click", function() {
    startBtn();
})
$(".btn-Strict").on("click", function() {
    strictBtn();
})




