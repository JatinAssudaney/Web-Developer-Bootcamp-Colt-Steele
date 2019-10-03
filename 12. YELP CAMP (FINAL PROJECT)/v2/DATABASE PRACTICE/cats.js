var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/cat_app");

var catSchema = new mongoose.Schema({
	name : String,
	age : Number,
	temperament: String
});

var Cat = mongoose.model("Cat",catSchema);

// ADDING A NEW CAT TO THE DB

/*
var george = new Cat({
	name : "George",
	age : 11,
	temperament : "Grouchy"
});

var george = new Cat({
	name : "Mrs. Norris",
	age : 7,
	temperament : "Evil"
});

george.save(function(err,cat){
	if(err){
		console.log("Something Went Wrong!");
	}
	else{
		console.log("We Just saved a CAT to db");
		console.log(cat);
	}
})
*/

//                              OR

Cat.create({
	name: "Snow White",
	age : 15,
	temperament : "Bland"
},function(err,cat){
	if(err){
		console.log("OH NOOOO");
		console.log(err);
	}
	else{
		console.log(cat);
	}
})


// RETRIEVE ALL CATS FROM DB AND CONSOLE.LOG

/*
Cat.find({},function(err,cats){
	if(err){
		console.log("OH NOOOO");
		console.log(err);
	}
	else{
		console.log("All The CATS!");
		console.log(cats);
	}
})

*/
