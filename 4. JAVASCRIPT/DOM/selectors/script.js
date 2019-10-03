// ID SELECTOR
var tag = document.getElementById("highlight");
console.log(tag);

// CLASS SELECTOR
var tags = document.getElementsByClassName("bolded");
console.log(tags[0]);

// TAG SELECTOR
var tags = document.getElementsByTagName("li");
console.log(tags[1]);

// CSS-SELECTOR i.e ALL THINGS BUT ONLY ONE IS RETURNED
var tag = document.querySelector("#highlight");
console.log(tag);
var tag = document.querySelector(".bolded");
console.log(tag);

// CSS-SELECTOR i.e ALL THINGS AND ALL ARE RETURNED
var tag = document.querySelectorAll(".bolded");
console.log(tag);