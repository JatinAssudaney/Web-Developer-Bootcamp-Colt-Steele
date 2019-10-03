var quit = true;
var todo = [];
while(quit){
	var input = prompt("Enter the choice");
	if(input === "new"){
		var newTask = prompt("Enter the new task");
		todo.push(newTask)
		console.log(newTask + " added to the list");
	}
	else if(input === "list"){
		console.log("**********");
		todo.forEach(function(task){
			console.log(todo.indexOf(task)+ " : " + task)
		})
		console.log("**********");
	}
	else if(input === "delete"){
		var index = prompt("Index of the task you wish to Delete");
		todo.splice(index, 1);
		console.log(index + " deleted from` the list");
	}
	else if(input === "quit"){
		console.log("OK! YOU QUIT THE APP")
		quit=false;
	}
	else{
		console.log("Wrong Input");
	}
}