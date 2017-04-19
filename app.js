'use strict';
var totalVotes = 0;
var currentItems = [];
var itemsOnSecondToLastScreen = [];
var itemsOnPreviousScreen = [];
var images = [];
var items = [];
var allItems = [];
var allItemsNumClicked = [];
var allItemsNumShown = [];
var leftPic;
var centerPic;
var rightPic;
items = JSON.parse(localStorage.getItem('items'));
allItems = items;
if(items === null){
  items = [];

  new Item('Bag', 'img/bag.jpg');
  new Item('Banana', 'img/banana.jpg');
  new Item('Bathroom', 'img/bathroom.jpg');
  new Item('Boots', 'img/boots.jpg');
  new Item('Breakfast', 'img/breakfast.jpg');
  new Item('Bubblegum', 'img/bubblegum.jpg');
  new Item('Chair', 'img/chair.jpg');
  new Item('Cthulhu', 'img/cthulhu.jpg');
  new Item('Dog Duck', 'img/dog-duck.jpg');
  new Item('Dragon', 'img/dragon.jpg');
  new Item('Pen', 'img/pen.jpg');
  new Item('Pet Sweep', 'img/pet-sweep.jpg');
  new Item('Scissors', 'img/scissors.jpg');
  new Item('Shark', 'img/shark.jpg');
  new Item('Sweep', 'img/sweep.png');
  new Item('Tauntaum', 'img/tauntaun.jpg');
  new Item('Unicorn', 'img/unicorn.jpg');
  new Item('USB', 'img/usb.gif');
  new Item('Water Can', 'img/water-can.jpg');
  new Item('Wine Glass', 'img/wine-glass.jpg');
}


/* This is the constructor function to make each item an object */
function Item(name, filepath) {
  this.name = name;
  this.filepath = filepath;
  this.numberOfTimesShown = 0;
  this.numberOfTimesClicked = 0;
  items.push(this);
  allItems.push(this);
}

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

/* This puts all the items number of times clicked into an array. */
function getChartData(){
  for (var i = 0; i < allItems.length; i++){
    allItemsNumShown[i] = allItems[i].numberOfTimesShown;
    allItemsNumClicked[i] = allItems[i].numberOfTimesClicked;
    localStorage.setItem('items', JSON.stringify(allItems));
  }
}

function makeTable(){
  var canvas = document.getElementById('chart-canvas');
  canvas.width = '500px';
  canvas.height = '500px';

  var ctx = canvas.getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'bar',


    data: {
      labels: ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog duck', 'dragon', 'pen', 'pet sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water can', 'wine glass'],
      datasets: [
        {
          backgroundColor: [
            '#3568d9',
            '#fff461',
            '#000000',
            '#c1a118',
            '#63c8f1',
            '#16a72d',
            '#b81c1c',
            '#49eb3b',
            '#deee78',
            '#f41825',
            '#213dfb',
            '#b84e67',
            '#ff8819',
            '#828282',
            '#a46111',
            '#f00',
            '#0ff',
            '#535353',
            '#08106f',
            '#0c6b1e',

          ],
          label: 'click count',
          data: allItemsNumClicked,

        },
        {     label: 'Times viewed',
          data: allItemsNumShown, }
      ]
    }
  }
);
}
