var express = require("express"),
mongoose = require("mongoose"),
passport = require("passport"),
User = require("./models/user"),
bodyParser = require("body-parser"),
LocalStrategy = require("passport-local"),
passportLocalMongoose = require("passport-local-mongoose");

mongoose.connext("mongodb://localhost/auth_demo_app");
var app = express();

app.set('view engine','ejs');
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({extended:true}));
app.use(require("express-session")({
	secret : "TRYING THE AUTHENTICATION FOR THE FIRST TIME",
	resave : false,
	saveUninitialized : false
}));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ROUTES

app.get("/",function(req,res){
	res.render("home");
})

app.get("/secret",isLoggedIn,function(req,res){
	res.render("secret");
})

// AUTH ROUTES
app.get("/register",function(req,res){
	res.render("register");
})
app.post("/register",function(req,res){
	User.register(new User({username:req.body.username}),req.body.password,function(err,user){
		if(err){
			return res.render("register");
		}
		passport.authenticate("local")(req,res,function(){
			res.redirect("secret");
		})
	})
});

// LOGIN ROUTES WITH MIDDLEWARE
app.get("/login",function(req,res){
	res.render("login");
})

app.post("/login",passport.authenticate("local",
	{
		successRedirect:"/secret",
		failureRedirect:"/login"
	}),function(req,res){

})

// LOGOUT
app.get("/logout",function(req,res){
	req.logout();
	res.redirect("/");
})

// MIDDLEWARE
function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}

app.listen(3000,function(){
	console.log("Server started at 3000");
})