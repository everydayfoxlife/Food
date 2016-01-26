var Paddle = require('./Paddle');
var Food = require('./Food');
var AngryFood = require('./AngryFood');
var Score = require('./Score');

//▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
// Base values

var foods = [];
var foodAmt = 1;

var paddle = new Paddle();
var score = new Score();

function generateFood(){
	var food;

	if (random(3) === 0){
		food = new AngryFood();
	} else {
		food = new Food();
	}

	foods.push(food);
}

function updateFood(){
	for (var i = foods.length - 1; i >= 0; i--){
		var food = foods[i];
		food.draw();
		var foodState = food.toss(paddle);
		if (foodState === 'eaten') {
			score.updateScore(food);
			food.destroy(foods);
		} else if (foodState === 'lost') {
			food.destroy(foods);
		}
	}
}

//▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
// Update is called once per frame

var foodSpawnCounter = 0;

exports.update = function () {

	paper(14);
	cls();
	score.draw();

	paddle.draw();
	
	paddle.move();
	
	foodSpawnCounter++;

	if (foodSpawnCounter === 30) {
		generateFood();
		foodSpawnCounter = 0;
	}

	if (btnp.left) paddle.bite();

	updateFood();


};
