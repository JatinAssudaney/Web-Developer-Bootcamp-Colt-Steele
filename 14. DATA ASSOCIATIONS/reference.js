					     // ONE TO MANY RELn. SINGLE USER MULTIPLE POSTS = OBJECT REFERENCING

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/data_association_blog_demo_2");

var Post = require("./models/post");
var User = require("./models/user");

/*  SHIFTED TO models folder
// POST = title, content

var postSchema = new mongoose.Schema({
	title : String,
	content : String
})

var Post = mongoose.model("Post",postSchema);
*/

/*
SHIFTED TO models folder
// USER = email, name

var userSchema = new mongoose.Schema({
	email : String,
	name : String,
	posts : [
  {
    type : mongoose.Schema.Types.ObjectId,
    ref: "Post"
  }
  ]
});
*/
var User = mongoose.model("User",userSchema);

// User.create({
//     email: "bob@gmail.com",
//     name: "Bob Belcher"
// });
/*

Post.create({
  title: "How to cook the best burger pt. 5",
  content: "blah blah blah"
}, function(err, post){
    User.findOne({email: "bob@gmail.com"}, function(err, foundUser){
        if(err){
            console.log(err);
        } else {
            foundUser.posts.push(post);
            foundUser.save(function(err, data){
                if(err){
                    console.log(err);
                } else {
                    console.log(data);
                }
            });
        }
    });
});

Post.create({
  title: "How to cook the best burger pt. 6",
  content: "blah blah blah Jibberish"
}, function(err, post){
    User.findOne({email: "bob@gmail.com"}, function(err, foundUser){
        if(err){
            console.log(err);
        } else {
            foundUser.posts.push(post);
            foundUser.save(function(err, data){
                if(err){
                    console.log(err);
                } else {
                    console.log(data);
                }
            });
        }
    });
});
*/

// Find user
// find all posts for that user

User.findOne({email: "bob@gmail.com"}).populate("posts").exec(function(err, user){
    if(err){
        console.log(err);
    } else {
        console.log(user);
    }
});