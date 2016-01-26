var FLOOR = 110;
var CEILING = 0;
var SPEED = 5;
var COLOR_DEFAULT = 1;
var COLOR_UPDATE = 15;


//▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
// Paddle sprite

function Paddle(){
	this.status = "";
	this.y = 50;
	this.x = 115;
	this.color = COLOR_DEFAULT;
	this.width = 8;
	this.height = 16;
	this.timeStamp = 0;

	this.greenCounter = 0;
	this.redCounter = 0;
}
module.exports = Paddle;

Paddle.prototype.draw = function(){
	paper(this.color);
	rectfill(this.x, this.y, this.width, this.height);
};

Paddle.prototype.move = function(){
	if (btn.down && this.y < FLOOR){
		this.y += SPEED;
	} else if (btn.up && this.y > CEILING){
		this.y -= SPEED;
	}
};

Paddle.prototype.bite = function(){
	var now = Date.now();
	if (this.timeStamp + 300 > now) return;
	this.timeStamp = now;

	var x = this.x;
	var moveX = x - 10;
	
	TINA.Tween(this, ['x'])
		.to({x: moveX}, 10)
		.to({x: x}, 10)
		.start();

};

Paddle.prototype.canEat = function (food) {

	if (food.status === "angry") {
		return (this.greenCounter >= 2);
	} else if (food.status === "superAngry") {
		return true;
	} else {
		// normal food
		return true;
	}
};

Paddle.prototype.changeState = function (){
	if (this.greenCounter >= 2) {
		this.color = COLOR_UPDATE;
	} else {
		this.color = COLOR_DEFAULT;
	}
};

Paddle.prototype.eat = function(food) {
	if (food.status === "angry") {
		this.redCounter += 1;
		this.greenCounter -= 2;
		food.changeState("superAngry");
	} else {
		this.greenCounter += 1;
	}
	this.changeState();
};
