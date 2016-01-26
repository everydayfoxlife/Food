var Food = require('./Food');

var LIFETIME = 10000;

function AngryFood() {
	Food.call(this);

	this.status = 'angry';
	this.sprite = [0x90,0x91,0x92,0x93,0x94];
	this.hp = 2;

	this.speedX = 1;
	this.speedY = 1;

	this.timeLimit = Date.now() + LIFETIME;
}
inherits(AngryFood, Food);
module.exports = AngryFood;

AngryFood.prototype.move = function() {

	this.x += this.speedX;
	this.y += this.speedY;

	if (this.y > 120) {
		this.y = 120;
		this.speedY *= -1;
	}

	if (this.y < 0) {
		this.y = 0;
		this.speedY *= -1;
	}

	if (this.x >= 120){
		this.x = 120;
		this.speedX *= -1;
	}

	if (this.x < 0){
		this.x = 0;
		this.speedX *= -1;
	}

};

AngryFood.prototype.isAlive = function() {
	return (Date.now() < this.timeLimit);
};

AngryFood.prototype.changeState = function(state) {
	Food.prototype.changeState.call(this, state);

	if (state === "superAngry"){
		this.sprite = [0xa0,0xa1,0xa2,0xa3,0xa4];
		this.timeLimit = Date.now() + LIFETIME;
	}
}
