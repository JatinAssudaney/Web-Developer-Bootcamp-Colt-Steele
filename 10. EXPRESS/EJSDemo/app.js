var express = require('express');
var app = express();

app.use(express.static("public"));
app.set("view engine","ejs");


app.get("/",function(req,res){
	res.render("home");
})

app.get("/fallinlovewith/:dog",function(req,res){
	var dog = req.params.dog;
	res.render("love",{dogVar : dog});
})

app.get("/posts",function(req,res){
	var posts = [
		{title: "Post 1", author: "Susy"},
		{title: "My Adorable pet bunny", author: "Charlie"},
		{title: "Can you believe this pomsky", author: "Colt"}
	];
	res.render("posts",{posts : posts})

})



const PORT = process.env.PORT || 3000;
app.listen(PORT,process.env.IP,function(){
	console.log("Listening on Port "+PORT);
})

