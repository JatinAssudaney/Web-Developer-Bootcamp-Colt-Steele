var express = require('express');
var app = express();

app.get('/',function(req,res){
	res.send("Hi there, welcome to my assignment!");
})

app.get('/speak/:animal',function(req,res){
	var animal = req.params.animal;
	// Better Solution
	var sounds = {
		pig : 'Oink',
		cow : 'Moo',
		dog : 'WOOF WOOF!',
		starfish : '...'
	}

	var sound = sounds[animal];

	res.send("The "+animal+" says "+sound);

	// if(animal === "pig"){
	// 	res.send("The "+animal+" says 'Oink'");
	// }
	// else if(animal === "cow"){
	// 	res.send("The "+animal+" says 'Moo'");
	// }
	// else if (animal === "dog") {
	// 	res.send("The "+animal+" says 'Woof Woof!'");
	// }
	// else{
	// 	res.send("Try another domestic animal");
	// }
})

app.get("/repeat/:message/:num",function(req,res){
	var message = req.params.message;
	var times = Number(req.params.num);
	var result = "";
	for(var i = 0; i<times ; i++){
		result += message + " ";
	}
	res.send(result);
})

app.get("*",function(req,res){
	res.send("Sorry, page not found...What are you doing with your life?")
})

app.listen(3000,function(){
	console.log("Serving app on port 3000");
})