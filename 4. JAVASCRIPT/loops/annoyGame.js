var str = "yes";
var str1 = "yeah!"
let answer = true;
while(answer){
	var input = prompt("Are we There Yet");
	if(input === str || input === str1){
		answer = false;
		alert("We finally made it!")
	}
}
