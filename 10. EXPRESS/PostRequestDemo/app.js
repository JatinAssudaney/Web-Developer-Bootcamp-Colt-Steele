var express = require('express');
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");

var friends = ["Tony","Steve","Thor","Bruce","Scott"];

app.get("/",function(req,res){
	res.render("home");
})

app.post("/addFriend",function(req,res){
	var newfriend = req.body.newfriend;
	friends.push(newfriend);
	res.redirect("/friends");
})

app.get("/friends",function(req,res){
	
	res.render("friends",{friends : friends});
})

const PORT = process.env.PORT || 3000;
app.listen(PORT,process.env.IP,function(){
	console.log("Listening on Port "+PORT);
})