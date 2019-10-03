let guess = true;
while(guess){
	var num = Number(prompt("Enter the number as a guess"));
	if(num>7){
		alert("Too high");
	}
	else if(num<7){
		alert("Too Low");
	}
	else{
		guess = false;
		alert("Congratulations");

	}
}