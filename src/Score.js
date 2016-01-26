//▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
// UI

function Score(){
	this.redScore = 0;
	this.greenScore = 0;
	this.totalScore = 0;
}
module.exports = Score;

Score.prototype.draw = function(){
	pen(15);
	sprite(0xa0, 2, 109);
	print(this.redScore, 12, 110);
	sprite(0x80, 2, 120);
	print(this.greenScore, 12, 121);
	locate(13,21);
	print("Total: " + this.totalScore);
};

Score.prototype.updateScore = function (food) {
	if(food.status === "superAngry"){
		this.redScore += 1;
	} else {
		this.greenScore += 1;
	}

	this.totalScore += 1;
};