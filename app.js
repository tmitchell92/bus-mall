'use strict';

var totalClicks = 0;
var clicksLeft = 25;
var items = [];
var threeRandNum = [];
var nums = [];

/* This is the constructor function to make each item an object */
function Item(name) {
  var splitName = name.split('.')[0];
  this.name = splitName;
  this.filepath = 'img/' + name ;
  this.numberOfTimesShown = 0;
  this.numberOfTimesClicked = 0;
}

/* An array of the items */
var allItems = ['bag.jpg','banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'usb.gif', 'water-can.jpg', 'wine-glass.jpg'
];

/* Puts number of items in an array */
for (var i = 0; i < allItems.length; i++){
  nums.push(i);
}

/* This generates a number between 1 and 25 */
function getRandomNum() {
  var min = 0;
  var max = allItems.length;
  return Math.floor(Math.random() * (max - min)) + min;
};

function genThreeNum(){
  for(var i = 0; i < 3; i++){
    var randNum = getRandomNum();
    if (randNum == threeRandNum[i]){
      // getRandomNum()
    }
    else {
      threeRandNum.push(randNum);
  }
}
}

/* This generates the objects using the constructor */
function genItems(){
  for (var i = 0; i < allItems.length; i++){
    var newItem = new Item(allItems[i]);
    items.push(newItem);
  }
}

/* This pushes images to html */
function imagesToHtml(){
  for (var i = 0; i < 3; i++){
    var randNum = getRandomNum()
    console.log(randNum)
    var img = document.createElement('IMG');
    img.src = items[randNum].filepath;
    document.body.appendChild(img);
  }
}




function start(){
  genItems();
  imagesToHtml();
}

start();
