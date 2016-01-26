var WALL = 128;

//▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
// Food sprite

function Food(){
	this.status = "";
	this.x = -8;
	this.y = random(120);
	this.isEdible = true;
	this.hp = 1;
	
	this.sprite = [0x80,0x81,0x82,0x83,0x84];
	this.frame = 0;
	this.animSpeed = 0.1 + Math.random() * 0.2;
}
module.exports = Food;

Food.prototype.draw = function(){
	this.frame += this.animSpeed;
	if (this.frame >= this.sprite.length - 1){
		this.frame = 0;
	}
	sprite(this.sprite[Math.floor(this.frame)], this.x, this.y);
};

Food.prototype.destroy = function(foods){
	this.hp -= 1;

	if (this.hp <= 0) {
		var index = foods.indexOf(this);
		if (index === -1) return console.warn('food does not exist in foods array');
		foods.splice(index,1);
	}
};

Food.prototype.toss = function(paddle){

	if (btnp.left &&
		paddle.canEat(this) &&
		this.x >= paddle.x - paddle.width &&
		this.y >= paddle.y &&
		this.y <= paddle.y + paddle.height) {
				paddle.eat(this);
				return 'eaten';
		
	} else if (this.isAlive()) {
		this.move();
		return false;
	} else {
		return 'lost';
	}

};

Food.prototype.move = function() {
	this.x += 1;
};

Food.prototype.isAlive = function() {
	return this.x < WALL;
};

Food.prototype.changeState = function(state){
	this.status = state;
}
