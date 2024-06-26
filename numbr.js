upperLimit = 10;
theNumber = null;
lives = parseInt(upperLimit/4)+1;
points = 0;
levelUp = 0;

$(document).ready(function(){
	
	newGame();

});

function newGame() {
	$("#pts").html( points + " point" + (points !== 1 ? "s" : "") );
	thinkOfNumber();
	showNumbers();
	enableGame();
	lives = parseInt(upperLimit/4)+1;
}

function thinkOfNumber() {
	theNumber = Math.floor( Math.random() * upperLimit ) +1;
}

function showNumbers() {
	numberWrap = $("#numbers");
	numberWrap.html("");

	for ( let i=0 ; i!==upperLimit ; i++ ) {
		btn = $("<BUTTON></BUTTON>").addClass(["btn","btn-outline-primary","numbr","me-2"]).html( i+1 );
		btn.on("click",function(){
			makeGuess( $(this) );
		});
		numberWrap.append(btn);
	}
}

function enableGame() {
	$("#numbers").removeClass("higher").removeClass("lower").removeClass("correct").removeClass("game-over");
}

function makeGuess(btn) {
	guess = parseInt(btn.html());

	if ( guess !== theNumber ) {
		btn.removeClass("btn-outline-primary").addClass("btn-danger");
		lives--;
		if ( guess > theNumber ) {
			$("#numbers").addClass("lower");
			if ( lives !== 0 ) { setTimeout(enableGame,1000); }
		} else {
			$("#numbers").addClass("higher");
			if ( lives !== 0 ) { setTimeout(enableGame,1000); }
		}
	} else {
		btn.removeClass("btn-outline-primary").addClass("btn-success");
		points++;
		levelUp++;
		$("#numbers").addClass("correct");
		if ( levelUp === 5 ) {
			upperLimit = upperLimit + 5;
			levelUp = 0;
		}
		setTimeout(newGame,3000);
		return;
	}

	if ( lives === 0 ) {
		$("#numbers").addClass("game-over").attr("data-ans",theNumber);
		setTimeout(newGame,3000);
	}
}