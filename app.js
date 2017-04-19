'use strict';

var totalVotes = 0;
var currentItems = [];
var itemsOnSecondToLastScreen = [];
var itemsOnPreviousScreen = [];
var images = [];
var leftPic;
var centerPic;
var rightPic;
var items =[];

/* This is the constructor function to make each item an object */
function Item(name, filepath) {
  // var splitName = name.split('.')[0];
  this.name = name;
  this.filepath = filepath;
  this.numberOfTimesShown = 0;
  this.numberOfTimesClicked = 0;
  items.push(this);
}

var bag = new Item('Bag', 'img/bag.jpg');
var bananaItem = new Item('Banana', 'img/banana.jpg');
var bathroomItem = new Item('Bathroom', 'img/bathroom.jpg');
var boots = new Item('Boots', 'img/boots.jpg');
var breakfast = new Item('Breakfast', 'img/breakfast.jpg');
var bubblegum = new Item('Bubblegum', 'img/bubblegum.jpg');
var chair = new Item('Chair', 'img/chair.jpg');
var cthulhu = new Item('Cthulhu', 'img/cthulhu.jpg');
var dogDuck = new Item('Dog Duck', 'img/dog-duck.jpg');
var dragon = new Item('Dragon', 'img/dragon.jpg');
var penItem = new Item('Pen', 'img/pen.jpg');
var petSweep = new Item('Pet Sweep', 'img/pet-sweep.jpg');
var scissors = new Item('Scissors', 'img/scissors.jpg');
var shark = new Item('Shark', 'img/shark.jpg');
var sweep = new Item('Sweep', 'img/sweep.png');
var tauntaun = new Item('Tauntaum', 'img/tauntaun.jpg');
var unicorn = new Item('Unicorn', 'img/unicorn.jpg');
var usbItem = new Item('USB', 'img/usb.gif');
var waterCan = new Item('Water Can', 'img/water-can.jpg');
var wineGlass = new Item('Wine Glass', 'img/wine-glass.jpg');



/* This genereates a random number */
function getRandomIndex(list) {
  return Math.floor(Math.random() * list.length);
}

/* This generates three random images */
function getThreeRandomImages(){
  items = items.concat(itemsOnSecondToLastScreen);
  itemsOnSecondToLastScreen = itemsOnPreviousScreen;
  itemsOnPreviousScreen = currentItems;
  currentItems = [];

  var nextItem = items.splice(getRandomIndex(items), 1);
  nextItem[0].numberOfTimesShown ++;
  currentItems = currentItems.concat(nextItem);

  nextItem = items.splice(getRandomIndex(nextItem), 1);
  nextItem[0].numberOfTimesShown ++;
  currentItems = currentItems.concat(nextItem);

  nextItem = items.splice(getRandomIndex(items), 1);
  nextItem[0].numberOfTimesShown ++;
  currentItems = currentItems.concat(nextItem);

  return currentItems;
}

/* This puts images on html */
function imagesToHtml(){
  getThreeRandomImages();
  leftPic = currentItems[0];
  var img = document.getElementById('leftPic');
  img.src = leftPic.filepath;

  centerPic = currentItems[1];
  img = document.getElementById('centerPic');
  img.src = centerPic.filepath;

  rightPic = currentItems[2];
  img = document.getElementById('rightPic');
  img.src = rightPic.filepath;
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

function handleClickLeft(){
  totalVotes ++;
  imagesToHtml();
  leftPic.numberOfTimesClicked ++;
}

function handleClickCenter(){
  totalVotes ++;
  imagesToHtml();
  centerPic.numberOfTimesClicked ++;
}

function handleClickRight(){
  totalVotes ++;
  imagesToHtml();
  rightPic.numberOfTimesClicked ++;
}
/* This actually lets the imgs be clicked */
function clickPics(){
  images[0].addEventListener('click', handleClickLeft);
  images[1].addEventListener('click', handleClickCenter);
  images[2].addEventListener('click', handleClickRight);
}

function hidePics(){
  if(totalVotes < 5){
    document.getElementById('images').style.display = 'block';
  }
  else {
    document.getElementById('images').style.display = 'none';
    console.log('ok');
  }
}
document.getElementById('images').style.display = 'none';

/* This starts the javascript */
// function start(){
// genItems();
imagesToHtml();
picsToID();
clickPics();
hidePics();


// start();

console.log(items);
// var allItemsNumClicked = []
// function getChartData(){
//   for (var i = 0; i < allItems.length; i++){
//   allItemsNumClicked.push(items[i].numberOfTimesClicked)
//
// }
// }
//
// function makeTable(){
// var canvas = document.getElementById('chart-canvas');
// canvas.width = '500px';
// canvas.height = '500px';
//
//
// var ctx = canvas.getContext('2d');
// var myChart = new Chart(ctx, {
//   type: 'bar',
//   responsive: true,
//
//   data: {
//   labels: ['banana', 'bag', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog duck', 'dragon', 'pen', 'pet sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water can', 'wine glass'],
//   datasets: [
//     {
//       backgroundColor: [
//         '#f0f',
//         '#0f0',
//         '#f00',
//         '#0ff',
//         'black',
//         'white',
//         'yellow',
//         'brown',
//         'violet',
//         'blue',
//         'red',
//         'green',
//         'pink',
//         '#f0f',
//         '#0f0',
//         '#f00',
//         '#0ff',
//         'black',
//         'white',
//         'yellow',
//         'brown',
//         'violet',
//         'blue',
//
//       ],
//       data: allItemsNumClicked
//     },
//   ]
// }
// })
// }
// getChartData()
// makeTable()
