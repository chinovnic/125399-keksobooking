'use strict';
var OFFER_TITLE = ["Большая уютная квартира", "Маленькая неуютная квартира", "Огромный прекрасный дворец", "Маленький ужасный дворец", "Красивый гостевой домик", "Некрасивый негостеприимный домик", "Уютное бунгало далеко от моря", "Неуютное бунгало по колено в воде"];
var OFFER_TYPE = [palace, flat, house, bungalo];
var CHECKIN = ['12:00', '13:00', '14:00'];
var CHECKOUT = ['12:00', '13:00', '14:00'];
var FEATURES = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];
var PHOTOS = ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"];

var MIN_PRICE = 1000;
var MAX_PRICE = 1000000;
var MIN_ROOMS = 1;
var MAX_ROOMS = 5;
var MIN_USER = 1;
var MAX_USER = 8;

var getRandNum = function (num) {
  return Math.floor(Math.random() * (num + 1))
};

var getRandInRange = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var getParameterIndex = function(array) {
  var parameterIndex = Math.floor(Math.random() * array.length);
  return array[parameterIndex];
};

var getRandomArray = function (initialArr) {
  var RandomArray = [];
  var amount = getRandNum(initialArr.length);
  for (var i = 0; i < amount; i++) {
    RandomArray.push(initialArr[i]);
  }
  return RandomArray;
};

var getRandOrderArray = function (initialArr) {
  var RandOrderArray = [];
  for (var i = 0; i < initialArrt; i++) {
   var RandIndex = getRandNum(initialArr.length);
    RandOrderArray.push(initialArr[RandIndex]);
  }
  return RandOrderArray;
};

var ad =[
  {
    "author": {
      "avatar": 'img/avatars/user{{0' + getRandInRange(MIN_USER, MAX_USER) + '}}.png'
  },
  "offer": {
      "title": getParameterIndex(OFFER_TITLE),
      "address": getRandInRange(min, max) + ', ' + getRandInRange(min, max), //не ясно, откуда брать диапазон
      "price": getRandInRange(MIN_PRICE, MAX_PRICE),
      "type": getParameterIndex(OFFER_TYPE),
      "rooms":getRandInRange(MIN_ROOMS, MAX_ROOMS),
      "guests": getRandInRange(min, max),//не ясно, откуда брать диапазон
      "checkin": getParameterIndex(CHECKIN),
      "checkout": getParameterIndex(CHECKOUT),
      "features": getRandomArray(FEATURES),
      "description": '',
      "photos": getRandOrderArray(PHOTOS)
  }
//   "location": {
// «x»: случайное число, координата x метки на карте. Значение ограничено размерами блока, в котором перетаскивается метка.
//     «y»: случайное число, координата y метки на карте от 130 до 630.
// }
]


var userDialog = document.querySelector('.map');
userDialog.classList.remove('map--faded');
