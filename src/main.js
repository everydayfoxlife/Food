//▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
// Base values
var CEILING = 0;
var FLOOR = 110;
var WALL = 128;

var foods = [];
var foodAmt = 1;

//▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
// UI
function Score(){
	this.redScore = 0;
	this.greenScore = 0;
	this.totalScore = 0;
}

Score.prototype.draw = function(){
	pen(15);
	locate(2,19);
	println("Red: " + this.redScore)
	println("Green " + this.greenScore);
	print("Total: " + this.totalScore);
}

//▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
// Paddle sprite

function Paddle(){
	this.status = "";
	this.y = 50;
	this.x = 115;
	this.color = 1;
	this.width = 8;
	this.height = 16;
}

Paddle.prototype.draw = function(){

	paper(this.color);
	rectfill(this.x, this.y, this.width, this.height);
}

Paddle.prototype.move = function(){
	var speed = 5;

	if (btn.down && this.y < FLOOR){
		this.y += speed;
	} else if (btn.up && this.y > CEILING){
		this.y -= speed;
	}

}

Paddle.prototype.changeColor = function(status){
	this.status = status;

	if (this.status === "red"){
		TINA.Tween(this, ['color'])
		.to({color: 15},10)
		.start();

	} else this.color = this.color;

}

Paddle.prototype.eat = function(){
	var x = this.x;
	var moveX = this.x - 10;
	var timeStamp = Date.now();
	console.log(timeStamp);

	this.changeColor("red");

	TINA.Tween(this, ['x'])
				.to({x: moveX}, 10)
				.to({x: x}, 10)
				.start();
}


//▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
// Food sprite

function Food(){
	this.status = "";
	this.x = -8;
	this.y = random(120);
	this.color = 4;
	
	this.sprite = [0x80,0x81,0x82,0x83,0x84];
	this.frame = 0;
	this.animSpeed = 0.1 + Math.random() * 0.2;

	this.paddle = null;
	this.Score = null;
}

Food.prototype.draw = function(){
	this.frame += this.animSpeed;
	if (this.frame >= this.sprite.length){
		this.frame = 0;
	}
	sprite(this.sprite[Math.floor(this.frame)], this.x, this.y);
}

Food.prototype.changeStatus = function(status){
	this.status = status;

	if (this.status === "angry"){
		this.sprite = [0x90,0x91,0x92,0x93,0x94];
	} else {
		this.sprite = [0x80,0x81,0x82,0x83,0x84];
	}
}

Food.prototype.eaten = function(){

	if (this.x >= this.paddle.x - 20 &&
		this.y >= this.paddle.y &&
		this.y <= this.paddle.y + this.paddle.height){
		
		this.destroy();
		this.score.totalScore += 1;

		if (this.status === "angry"){
			this.score.redScore += 1;
		} else {
			this.score.greenScore += 1;
		}
	}

}

Food.prototype.destroy = function(){
	
	var index = foods.indexOf(this);

	if (index === -1) return console.warn('food does not exist in foods array');
	foods.splice(index,1);

}

Food.prototype.toss = function(){
	
	if (btnp.left &&
		this.x >= this.paddle.x - this.paddle.width &&
		this.y >= this.paddle.y &&
		this.y <= this.paddle.y + this.paddle.height){
		this.destroy();
	} else 
	if (this.x < WALL) {
		this.x += 1;
	}

	return;
}

var paddle = new Paddle();
var score = new Score();

function generateFood(){
	var food = new Food();

	if(random(3) === 0){
		food.changeStatus("angry");
	}

	foods.push(food);
	food.paddle = paddle;
	food.score = score;
}

function updateFood(){
	for (var j = 0; j < foods.length; j++){
		foods[j].draw();
		foods[j].toss();
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

	/*if (random(10) === 0){
		var index = random(foods.length - 1);
		var food = foods[index];
		food.changeStatus("angry");
	}*/

	if (foodSpawnCounter === 30) {
		generateFood();
		foodSpawnCounter = 0;
	}

	if (btnp.left) paddle.eat();

	updateFood();

};
