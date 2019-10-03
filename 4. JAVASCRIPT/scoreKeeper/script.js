var p1 = document.getElementById("p1");
var p2 = document.getElementById("p2");
var p1Display = document.querySelector("#p1Display");
var p2Display = document.querySelector("#p2Display");
var p1score = 0;
var p2score = 0;
var numInput = document.querySelector("input[type='number']");
var gameOver = false;
var winningScore = 5;
var reset = document.querySelector("#reset");
var value = document.querySelector("#limit")
p1.addEventListener("click",function(){
	if(!gameOver){
		p1score++;
		if(p1score === winningScore){
			p1Display.classList.add("winner");
			gameOver = true;
		}
	}
	p1Display.textContent = p1score;
})

p2.addEventListener("click",function(){
	if(!gameOver){
		p2score++;
		if(p2score === winningScore){
			p2Display.classList.add("winner");
			gameOver = true;
		}
	}
	p2Display.textContent = p2score;
})

reset.addEventListener("click",resetGame)

function resetGame(){
	p1score = 0;
	p2score = 0;
	gameOver = false;
	p1Display.textContent = p1score;
	p2Display.textContent = p2score;
	p1Display.classList.remove("winner");
	p2Display.classList.remove("winner");
}

numInput.addEventListener("change",function(){
	value.textContent = this.value;
	winningScore = Number(this.value);
	resetGame();
})