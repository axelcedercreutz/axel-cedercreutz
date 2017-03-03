$(document).ready(function(){
	$('#submit-question').click(function(e){
		e.preventDefault();
		guessTheNumber();
	});
});
var randomInteger = getRandomInteger(0,10);
function getRandomInteger( min, max ) {
	return Math.floor((Math.random() * max) + 1);
};
function compareNumbers( first, second ) {

	if(first == second) {
		alert("You did it! Well done! Now you can try again");
		$('#submit-question').prop('disabled',false);
	}

	else {
		alert("Nope, not that one...");
		$('#submit-question').prop('disabled',false);
	}
}
function guessTheNumber() {

	var guessedNumber = $('#question').val();
	if(guessedNumber >= 1 && $('#question').val() <= 10) {
		$('#submit-question').prop('disabled',true);
		compareNumbers(guessedNumber,randomInteger);
		$('#question').val('');
		randomInteger = getRandomInteger(0,10);
	}

	else {
		alert("You fool, you didn't enter a valid number!!! Try again");
		$('#question').val('');
		$('#submit-question').prop('disabled',false);
	}
}