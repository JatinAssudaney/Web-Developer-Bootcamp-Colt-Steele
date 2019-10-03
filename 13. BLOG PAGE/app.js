const express = require("express"),
app = express(),
bodyParser = require('body-parser'),
expressSanitizer = require("express-sanitizer"),
methodOverride = require("method-override"),
mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/restful_blog_app");
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(expressSanitizer())

// SCHEMA
var blogSchema = new mongoose.Schema({
	title : String,
	image : String,
	body : String,
	created : {type : Date, default : Date.now()}
});

var Blog = mongoose.model("Blog",blogSchema);

/*
Blog.create({
	title : "Test Blog",
	image : "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
	body : "Cutest DOGS!!!"
})
*/

// RESTFUL ROUTES

app.get("/",function(req,res){
	res.redirect("/blogs")
})

// INDEX ROUTE

app.get("/blogs",function(req,res){
	Blog.find({},function(err,blogs){
		if(err){
			console.log(err);
		}
		else{
			res.render("index",{blogs:blogs});
		}
	})
})

// NEW ROUTE

app.get("/blogs/new",function(req,res){
	res.render("new");
})

// CREATE ROUTE

app.post("/blogs",function(req,res){
	// create blog after sanitizing data
	req.body.blog.body = req.sanitize(req.body.blog.body)

	Blog.create(req.body.blog,function(err,newBlog){
		if(err){
			console.log(err);
			res.render("new")
		}
		else{
			// redirect
			res.redirect("/blogs")
		}
	})
})

// SHOW ROUTE

app.get("/blogs/:id",function(req,res){
	var id = req.params.id;
	Blog.findById(id,function(err,foundBlog){
		if(err){
			res.redirect("/blogs");
		}
		else{
			res.render("show",{blog:foundBlog})
		}
	})
})

// EDIT ROUTE

app.get("/blogs/:id/edit",function(req,res){
	Blog.findById(req.params.id,function(err,foundBlog){
		if(err){
			res.redirect("/blog");
		}
		else{
			res.render("edit",{blog:foundBlog});
		}
	})
})

// UPDATE ROUTE

app.put("/blogs/:id",function(req,res){
	var id = req.params.id;
	req.body.blog.body = req.sanitize(req.body.blog.body)
	var newData = req.body.blog;
	Blog.findByIdAndUpdate(id,newData,function(err,updatedBlog){
		if(err){
			res.redirect("/blogs");
		}
		else{
			res.redirect("/blogs/"+id);
		}
	})
})

// DELETE ROUTE

app.delete("/blogs/:id",function(req,res){
	// destroy blog
	Blog.findByIdAndRemove(req.params.id,function(err){
		if(err){
			res.redirect("/blogs");
		}
		else{
			res.redirect("/blogs")
		}
	})
	// redirect
})

app.listen(3000,process.env.IP,function(){
	console.log("Listening at port 3000");
});
