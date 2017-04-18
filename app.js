'use strict';

var totalVotes = 0;
var votesLeft = 25;
var items = [];
var oldItems = [];
var images = [];

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

/* This generates a number between 1 and 25 */
function getRandomNum() {
  var min = 0;
  var max = allItems.length;
  return Math.floor(Math.random() * (max - min)) + min;
};

/* This generates the objects using the constructor */
function genItems(){
  for (var i = 0; i < allItems.length; i++){
    var newItem = new Item(allItems[i]);
    items.push(newItem);
  }
}

/* This pushes images to html */
function imagesToHtml(){
  var leftPic = getRandomNum();
  oldItems.push(leftPic);
  var img = document.getElementById('leftPic');
  img.src = items[leftPic].filepath;
  document.body.appendChild(img);
  var centerPic = getRandomNum();
  while(centerPic === leftPic){
    centerPic = getRandomNum();
  }
  oldItems.push(centerPic);
  img = document.getElementById('centerPic');
  img.src = items[centerPic].filepath;
  document.body.appendChild(img);
  var rightPic = getRandomNum();
  while(rightPic === leftPic || rightPic === centerPic){
    rightPic = getRandomNum();
  }
  oldItems.push(rightPic);
  img = document.getElementById('rightPic');
  img.src = items[rightPic].filepath;
  document.body.appendChild(img);
}

/* This pushes photos elements into an array */
function picsToID(){
  var leftPicID = document.getElementById("leftPic");
  var centerPicID = document.getElementById("centerPic");
  var rightPicID = document.getElementById("rightPic");
  images.push(leftPicID)
  images.push(centerPicID)
  images.push(rightPicID)
}

/* This is what happens when a img is clicked. */
  function handleClick(){
    imagesToHtml();
}

/* This actually lets the imgs be clicked */
function clickPics(){
  images[0].addEventListener('click', handleClick)
  images[1].addEventListener('click', handleClick)
  images[2].addEventListener('click', handleClick)
}

/* This starts the javascript */
function start(){
  genItems();
  imagesToHtml();
  picsToID();
  clickPics();
}

start();
