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
	locate(2,19);
	println("Red: " + this.redScore);
	locate(2,20);
	println("Green " + this.greenScore);
	locate(2,21);
	print("Total: " + this.totalScore);
};

Score.prototype.updateScore = function (food) {
	if(food.status === "angry"){
		this.redScore += 1;
	} else {
		this.greenScore += 1;
	}

	this.totalScore += 1;
};