'use strict';

var totalVotes = 0;
var votesLeft = 25;
var items = [];
var currentItems = [];
var itemsOnSecondToLastScreen = [];
var itemsOnPreviousScreen = [];
var images = [];
var leftPic
var centerPic
var rightPic

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

/* This genereates a random number */
function getRandomIndex(list) {
  return Math.floor(Math.random() * list.length);
}

/* This generates the objects using the constructor */
function genItems(){
  for (var i = 0; i < allItems.length; i++){
    var newItem = new Item(allItems[i]);
    items.push(newItem);
  }
}

/* This generates three random images */
function getThreeRandomImages(){
  items = items.concat(itemsOnSecondToLastScreen);
  itemsOnSecondToLastScreen = itemsOnPreviousScreen;
  itemsOnPreviousScreen = currentItems;
  currentItems = [];

  var nextItem = items.splice(getRandomIndex(items), 1);
  nextItem[0].numberOfTimesShown ++
  currentItems = currentItems.concat(nextItem);

  nextItem = items.splice(getRandomIndex(nextItem), 1);
  nextItem[0].numberOfTimesShown ++
  currentItems = currentItems.concat(nextItem);

  nextItem = items.splice(getRandomIndex(items), 1);
  nextItem[0].numberOfTimesShown ++
  currentItems = currentItems.concat(nextItem);

  return currentItems;
}

/* This puts images on html */
function imagesToHtml(){
  getThreeRandomImages();
  leftPic = currentItems[0];
  var img = document.getElementById('leftPic');
  img.src = leftPic.filepath;
  document.body.appendChild(img);

  centerPic = currentItems[1];
  img = document.getElementById('centerPic');
  img.src = centerPic.filepath;
  document.body.appendChild(img);

  rightPic = currentItems[2];
  img = document.getElementById('rightPic');
  img.src = rightPic.filepath;
  document.body.appendChild(img);
}

/* This pushes photos elements into an array */
function picsToID(){
  var leftPicID = document.getElementById('leftPic');
  var centerPicID = document.getElementById('centerPic');
  var rightPicID = document.getElementById('rightPic');
  images.push(leftPicID);
  images.push(centerPicID);
  images.push(rightPicID);
}

/* This is what happens when a img is clicked. */
// function handleClick(){
//   imagesToHtml();
//   items.numberOfTimesClicked ++
//   console.log(items)
// }

function handleClickLeft(){
  imagesToHtml();
  leftPic.numberOfTimesClicked ++
}

function handleClickCenter(){
  imagesToHtml();
  centerPic.numberOfTimesClicked ++
}

function handleClickRight(){
  imagesToHtml();
  rightPic.numberOfTimesClicked ++
}
/* This actually lets the imgs be clicked */
function clickPics(){
  // images[0].addEventListener('click', function(){ handleClick(images[0]));
  // console.log(images[0]);
  images[0].addEventListener('click', handleClickLeft);
  images[1].addEventListener('click', handleClickCenter);
  images[2].addEventListener('click', handleClickRight);
}

/* This starts the javascript */
function start(){
  genItems();
  imagesToHtml();
  picsToID();
  clickPics();
}

start();
