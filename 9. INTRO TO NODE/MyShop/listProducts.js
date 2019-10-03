var faker = require('faker');
 
var product = [];

for(var i = 0 ;i< 10;i++){
	product.push({
		name: faker.commerce.productName(),
		price : faker.commerce.price()
	});
	console.log(product[i]);
}

