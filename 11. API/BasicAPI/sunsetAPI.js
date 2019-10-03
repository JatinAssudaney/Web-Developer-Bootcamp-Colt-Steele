var request = require("request");
request('https://api.sunrise-sunset.org/json?lat=19.8968&lng=155.5828&date=today',function(error,response,body){
	if(!error && response.statusCode == 200){
		var parsedData = JSON.parse(body)
		console.log(parsedData["results"]["sunset"]);
	}
}); 
