var FLOOR = 110;
var CEILING = 0;
var SPEED = 5;


//▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
// Paddle sprite

function Paddle(){
	this.status = "";
	this.y = 50;
	this.x = 115;
	this.color = 2;
	this.width = 8;
	this.height = 16;
	this.timeStamp = 0;
}
module.exports = Paddle;

Paddle.prototype.draw = function(){
	if (this.state === "red"){
		this.color = 15;
	}
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

Paddle.prototype.changeColor = function(status){
	this.status = status;

	if (this.status === "red"){
		TINA.Tween(this, ['color'])
		.to({color: 15},10)
		.start();

	} else this.color = 2;

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

Paddle.prototype.eat = function(food) {
	//TODO
};
