var express = require("express");
// var request = require("request");
var app = express();
var bodyParser = require("body-parser");
const PORT = process.env.PORT || 3000;

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));

var campgrounds = [
{name : "Salmon Creek", image : "https://farm1.staticflickr.com/130/321487195_ff34bde2f5.jpg"},
{name : "Granite Hill", image : "https://farm6.staticflickr.com/5181/5641024448_04fefbb64d.jpg"},
{name : "Mountain Goat's Rest", image : "https://farm5.staticflickr.com/4067/4576229670_1fbf4102e6.jpg"}
];

app.get("/",function(req,res){
	res.render("landing");
})

app.get("/campgrounds",function(req,res){
	res.render("campgrounds",{campgrounds : campgrounds});
})

app.post("/campgrounds",function(req,res){
	var name = req.body.name;
	var image = req.body.image;
	var newCampground = {
		name : name,
		image : image
	}
	campgrounds.push(newCampground);
	res.redirect("/campgrounds")
})

app.get("/campgrounds/new",function(req,res){
	res.render("new")
})

app.listen(PORT,function(){
	console.log(`Listening at port ${PORT}`);
})