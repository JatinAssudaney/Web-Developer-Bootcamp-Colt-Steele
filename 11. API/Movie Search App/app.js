var express = require("express");
var request = require("request");
var app = express();

app.set("view engine","ejs")

app.get("/",function(req,res){
	res.render("search");
})


// http://www.omdbapi.com/?s=avengers&apikey=3e8b41d2

app.get("/results",function(req,res){
	var query = req.query.search;
	var url = "http://www.omdbapi.com/?s=" + query + "&apikey=3e8b41d2";
	request(url,function(error,response,body){
		if(!error && response.statusCode == 200){
			var Data = JSON.parse(body)
			// res.send(Data["Search"][3]["Title"]);
			res.render("results",{Data : Data});
		}
	}); 
})

app.listen(3000,function(){
	console.log("Listening at port 3000");
})