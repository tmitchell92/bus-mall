'use strict';
var totalVotes = 0;
var currentItems = [];
var itemsOnSecondToLastScreen = [];
var itemsOnPreviousScreen = [];
var images = [];
var items = [];
var allItems = [];
var allItemsNumClicked = [];
var leftPic;
var centerPic;
var rightPic;

/* This is the constructor function to make each item an object */
function Item(name, filepath) {
  this.name = name;
  this.filepath = filepath;
  this.numberOfTimesShown = 0;
  this.numberOfTimesClicked = 0;
  items.push(this);
  allItems.push(this);
}

var bag = new Item('Bag', 'img/bag.jpg');
var banana = new Item('Banana', 'img/banana.jpg');
var bathroom = new Item('Bathroom', 'img/bathroom.jpg');
var boots = new Item('Boots', 'img/boots.jpg');
var breakfast = new Item('Breakfast', 'img/breakfast.jpg');
var bubblegum = new Item('Bubblegum', 'img/bubblegum.jpg');
var chair = new Item('Chair', 'img/chair.jpg');
var cthulhu = new Item('Cthulhu', 'img/cthulhu.jpg');
var dogDuck = new Item('Dog Duck', 'img/dog-duck.jpg');
var dragon = new Item('Dragon', 'img/dragon.jpg');
var pen = new Item('Pen', 'img/pen.jpg');
var petSweep = new Item('Pet Sweep', 'img/pet-sweep.jpg');
var scissors = new Item('Scissors', 'img/scissors.jpg');
var shark = new Item('Shark', 'img/shark.jpg');
var sweep = new Item('Sweep', 'img/sweep.png');
var tauntaun = new Item('Tauntaum', 'img/tauntaun.jpg');
var unicorn = new Item('Unicorn', 'img/unicorn.jpg');
var usb = new Item('USB', 'img/usb.gif');
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

/*These functions let the next random images display when clicked on */
function handleClickLeft(){
  if (totalVotes > 25){
    hidePics();
  }
  else{
    totalVotes ++;
    leftPic.numberOfTimesClicked ++;
    imagesToHtml();
  }
}

function handleClickCenter(){
  if (totalVotes > 25){
    hidePics();
  }
  else{
    totalVotes ++;
    centerPic.numberOfTimesClicked ++;
    imagesToHtml();
  }
}

function handleClickRight(){
  if (totalVotes > 25){
    hidePics();
  }
  else{
    totalVotes ++;
    rightPic.numberOfTimesClicked ++;
    imagesToHtml();
  }
}

/* This actually lets the imgs be clicked */
function clickPics(){
  images[0].addEventListener('click', handleClickLeft);
  images[1].addEventListener('click', handleClickCenter);
  images[2].addEventListener('click', handleClickRight);
}

/* This will hide the pics, then generate chart data and table. */
function hidePics(){
  document.getElementById('leftPic').style.display = 'none';
  document.getElementById('centerPic').style.display = 'none';    document.getElementById('rightPic').style.display = 'none';
  getChartData();
  makeTable();

}

/* This starts the javascript */
imagesToHtml();
picsToID();
clickPics();
// hidePics();

/* This puts all the items number of times clicked into an array. */
function getChartData(){
  for (var i = 0; i < allItems.length; i++){
    console.log(allItems[i].numberOfTimesClicked);
    allItemsNumClicked[i]=(allItems[i].numberOfTimesClicked);
    console.log(allItemsNumClicked[i]);
  }
}

function makeTable(){
  var canvas = document.getElementById('chart-canvas');
  canvas.width = '500px';
  canvas.height = '500px';

  var ctx = canvas.getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'bar',
    responsive: true,

    data: {
      labels: ['banana', 'bag', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog duck', 'dragon', 'pen', 'pet sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water can', 'wine glass'],
      datasets: [
        {
          backgroundColor: [
            '#f0f',
            '#0f0',
            '#f00',
            '#0ff',
            'black',
            'white',
            'yellow',
            'brown',
            'violet',
            'blue',
            'red',
            'green',
            'pink',
            '#f0f',
            '#0f0',
            '#f00',
            '#0ff',
            'black',
            'white',
            'yellow',
            'brown',
            'violet',
            'blue',

          ],
          data: allItemsNumClicked
        },
      ]
    }
  });
}
