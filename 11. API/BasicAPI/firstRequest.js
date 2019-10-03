var request = require("request");


// GETTING THE PAGE SOURCE OF THE SPECIFIED URL
request('http://www.reddit.com',function(error,response,body){
	if(error){
		console.log("Something Went Wrong!!");
		console.log(error);
	} else{
		if(response.statusCode == 200){
			// THINGS WORKED
			console.log(body);
		}
	}
})