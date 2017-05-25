$(document).ready(function(){

	var startScreen;
	var gameDisplay;
	var counter = 30; 
	var questionArray = ["Who was the Spanish surrealist painter best known for his work The Persistence of Memory?" , "The Starry Night is an oil on canvas painted by which post-impressionist painter?" , "Which artist created the sculpture The Thinker?" , "Which painter started the impressionist movement?" , "Which artist is credited with developing linear perspective?" , "Who painted the famous Dutch Golden age painting The Night Watch?" , "Which artist is known for paintings containing mostly squares and rectangles?" , "After being injured in a street car accident, which artist painted mostly self portraits that depicted the suffering and pain of women?"];
	var answerArray = [["Salvador Dali" , "Joan Miro" , "Pablo Picasso" , "Salvador Dali" , "Francisco Goya"] , ["Vincent van Gogh" , "Paul Cezanne" , "Camile Pissarro" , "Paul Gauguin"] , ["Henri Matisse" , "Constantin Brancusi" , "Pablo Picasso" , "Auguste Rodin"] , ["Edgar Degas" , "Pierre-Auguste Renoir" , "Edouard Manet" , "Claude Monet"] , ["Giorgio Vasari" , "Ghiberti" , "Brunelleschi" ,  "Ambrogio Lorenzetti"] , ["Johannes Vermeer" , "Rembrandt van Rijn" , "Frans Hals" , "Hieronymus Bosch"] , ["Gustav Klimt" , "Piet Mondrian" , "Edvard Munch" , "Mark Rothko"] , ["Frida Kahlo" , "Georgia O'Keefe" , "Rene Magritte" , "Berthe Morisot"]];
	var correctAnswers = ["Salvador Dali" , "Vincent van Gogh" , "Auguste Rodin" , "Claude Monet" , "Brunelleschi" , "Rembrandt van Rijn" , "Piet Mondrian" , "Frida Kahlo"];
	var imageArray = ["<img class='center-block img-right' src='assets/images/memory.jpg'>", "<img class='center-block img-right' src='assets/images/starry.jpg'>", "<img class='center-block img-right' src='assets/images/thinker.jpg'>", "<img class='center-block img-right' src='assets/images/monet.jpg'>", "<img class='center-block img-right' src='assets/images/brun.jpg'>", "<img class='center-block img-right' src='assets/images/nightwatch.jpg'>", "<img class='center-block img-right' src='assets/images/piet.jpg'>", "<img class='center-block img-right' src='assets/images/kahlo.jpg'>"];
	var questionCounter = 0;
	var selecterAnswer;
	var questionTimer;
	var correctCount = 0;
	var incorrectCount = 0;
	var unansweredCount = 0;

	function displayStart() {
		startScreen = "<p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block start-button' href='#' role='button'>Start Quiz</a></p>";
		$("#mainDisplayArea").html(startScreen);
	}

	function resetGame() {
		questionCounter = 0;
		correctCount = 0;
		incorrectCount = 0;
		unansweredCount = 0;
		counter = 30;
		generateHTML();
		timerWrapper();
	}

	function generateHTML() {
		gameDisplay = "<p>Time Remaining: <span class='timer'>30</span></p> <h3 class='text-center' id='questions'>" + questionArray[questionCounter] + 
					  "</h3><p class='first-answer answer'>" + answerArray[questionCounter][0] + 
					  "</p><p class='answer'>" + answerArray[questionCounter][1] + 
					  "</p><p class='answer'>" + answerArray[questionCounter][2] + 
					  "</p><p class='answer'>" + answerArray[questionCounter][3] + "</p>";
		$("#mainDisplayArea").html(gameDisplay);
	}

	function endScreen() {
		gameDisplay = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + 
					  "</span></p><p class='text-center'>All done, here's how you did!</p>" + 
					  "<p class='summary-correct'>Correct Answers: " + correctCount + 
					  "</p><p>Wrong Answers: " + incorrectCount + 
					  "</p><p>Unanswered: " + unansweredCount + "</p>" + 
					  "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
		$("#mainDisplayArea").html(gameDisplay);
	}

	function timeOutLoss() {
		unansweredCount++;
		gameDisplay = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + 
					  "</span></p><p class='text-center'>You ran out of time!  The correct answer was: " + correctAnswers[questionCounter] + 
					  "</p>" + imageArray[questionCounter];
		$("#mainDisplayArea").html(gameDisplay);
		setTimeout(wait, 3000);
	}

	function correctAnswerSelect() {
		correctCount++;
		gameDisplay = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + 
					  "</span></p><p class='text-center'>Correct! The answer is: " + correctAnswers[questionCounter] + 
					  "</p>"+ imageArray[questionCounter];
		$("#mainDisplayArea").html(gameDisplay);
		setTimeout(wait, 3000);
	}

	function incorrectAnswerSelect() {
		incorrectCount++;
		gameDisplay = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + 
					  "</span></p><p class='text-center answer'>Wrong! The correct answer is: " + correctAnswers[questionCounter] + 
					  "</p>" + imageArray[questionCounter];
		$("#mainDisplayArea").html(gameDisplay);
		setTimeout(wait, 3000);
	}

	function wait() {
		if (questionCounter < 7) {
		questionCounter++;
		generateHTML();
		counter = 30;
		timerWrapper();
		}
		else {
			endScreen();
		}
	}

	function timerWrapper() {
		questionTimer = setInterval(thirtySeconds, 1000);
		function thirtySeconds() {
			if (counter === 0) {
				clearInterval(questionTimer);
				timeOutLoss();
			}
			if (counter > 0) {
				counter--;
			}
			$(".timer").html(counter);
		}
	}

	displayStart();


	//start button click event
	$("body").on("click", ".start-button", function(event){
		generateHTML();
		timerWrapper();

	});

	//click event for choosing answers
	$("body").on("click", ".answer", function(event){
		selectedAnswer = $(this).text();
		if(selectedAnswer === correctAnswers[questionCounter]) {
			clearInterval(questionTimer);
			correctAnswerSelect();
		}
		else {
			clearInterval(questionTimer);
			incorrectAnswerSelect();
		}
	}); 


	//click event for resetting game
	$("body").on("click", ".reset-button", function(event){
		resetGame();
	}); 

});







