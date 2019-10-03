const express = require("express"),
app = express(),
bodyParser = require("body-parser"),
mongoose = require("mongoose")

// var request = require("request");

mongoose.connect("mongodb://localhost/yelp_camp_v2");
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));

// SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
	name: String,
	image : String,
	description : String
});

var Campground = mongoose.model("Campground",campgroundSchema);

/*
Campground.create(
{
	name : "Granite Hill", 
	image : "https://farm6.staticflickr.com/5181/5641024448_04fefbb64d.jpg",
	description : "This is a huge Granite Hill. No bathrooms. No water"
},function(err,campground){
	if(err){
		console.log(err);
	}
	else{
		console.log(campground);
	}
})

*/
app.get("/",function(req,res){
	res.render("landing");
})

app.get("/campgrounds",function(req,res){
	// GET ALL CAMPGROUNDS FROM DB
	Campground.find({},function(err,allCampgrounds){
		if(err){
			console.log(err);
		}
		else{
			res.render("index",{campgrounds:allCampgrounds});
		}
	})

	// res.render("campgrounds",{campgrounds : campgrounds});
})

app.post("/campgrounds",function(req,res){
	var name = req.body.name;
	var image = req.body.image;
	var description = req.body.description;
	var newCampground = {
		name : name,
		image : image,
		description : description
	}
	Campground.create(newCampground,function(err,newlyCreated){
		if(err){
			console.log(err);
		}
		else{
			res.redirect("/campgrounds");
		}
	})
	
})

app.get("/campgrounds/new",function(req,res){
	res.render("new")
})

app.get("/campgrounds/:id",function(req,res){
	var id = req.params.id;
	Campground.findById(id,function(err,foundCampground){
		if(err){
			console.log(err);
		}
		else{
			res.render("show",{campground:foundCampground})
		}
	})
})

app.listen(3000,function(){
	console.log("Listening at port 3000");
})