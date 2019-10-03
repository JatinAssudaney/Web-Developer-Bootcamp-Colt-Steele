const express = require("express"),
app = express(),
bodyParser = require("body-parser"),
mongoose = require("mongoose"),
Campground = require("./models/campground"),
Comment = require("./models/comment")
seedDB = require("./seed")


// var request = require("request");

mongoose.connect("mongodb://localhost/yelp_camp_v5");
app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"));
app.use(bodyParser.urlencoded({extended:true}));


seedDB();

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
			res.render("campground/index",{campgrounds:allCampgrounds});
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
	res.render("campground/new")
})

app.get("/campgrounds/:id",function(req,res){
	var id = req.params.id;
	Campground.findById(id).populate("comments").exec(function(err,foundCampground){
		if(err){
			console.log(err);
		}
		else{
			res.render("campground/show",{campground:foundCampground})
		}
	})
})

// =====================
// 	  COMMENTS ROUTES
// =====================

app.get("/campgrounds/:id/comments/new",function(req,res){
	Campground.findById(req.params.id,function(err,campground){
		if(err) throw err;
		res.render("comments/new",{campground:campground});
	})
})

app.post("/campground/:id/comments",function(req,res){
	// LOOKUP CAMPGROUND BY ID
	Campground.findById(req.params.id,function(err,campground){
		if(err){ 
			console.log(err);
			res.redirect("/campgrounds");
		}
		else{
			// CREATE A NEW COMMENT
			Comment.create(req.body.comment,function(err,comment){
				if(err){
					console.log(err);
				}
				else{
					campground.comments.push(comment);
					campground.save();
					res.redirect("/campgrounds/"+campground._id);
				}
			})
		}
	})
})

app.listen(3000,function(){
	console.log("Listening at port 3000");
})