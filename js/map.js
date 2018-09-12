'use strict';
var OFFER_TITLE = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var CHECKIN = ['12:00', '13:00', '14:00'];
var CHECKOUT = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var OFFER_TYPE = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalo': 'Бунгало'
};

var MIN_PRICE = 1000;
var MAX_PRICE = 1000000;
var MIN_ROOMS = 1;
var MAX_ROOMS = 5;
var MIN_USER = 1;
var MAX_USER = 8;
var MIN_Y = 130;
var MAX_Y = 630;
var minGuests = 1;
var maxGuests = 10;
var map = document.querySelector('.map--faded');
var mapPin = document.querySelector('.map__pin');
var mapPins = map.querySelector('.map__pins');
var mapFilters = map.querySelector('.map__filters-container');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var maxX = map.offsetWidth;

var getRandNum = function (num) {
  return Math.floor(Math.random() * (num + 1));
};

var getRandInRange = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var getParameterIndex = function (array) {
  var parameterIndex = Math.floor(Math.random() * array.length);
  return array[parameterIndex];
};

var getRandomArray = function (arr) {
  while (arr.length > 0) {
    var index = Math.floor(Math.random() * arr.length);
    arr.length--;
    var temp = arr[arr.length];
    arr[arr.length] = arr[index];
    arr[index] = temp;
  }
  return arr;
};

var getRandOrderArray = function (initialArr) {
  var RandOrderArray = [];
  for (var i = 0; i < initialArr; i++) {
    var RandIndex = getRandNum(initialArr.length);
    RandOrderArray.push(initialArr[RandIndex]);
  }
  return RandOrderArray;
};

var createAd = function (number) {
  var locationX = getRandNum(maxX);
  var locationY = getRandInRange(MIN_Y, MAX_Y);
  var ad = {
    'author': {
      'avatar': 'img/avatars/user{{0' + getRandInRange(MIN_USER, MAX_USER) + '}}.png'
    },
    'offer': {
      'title': getParameterIndex(OFFER_TITLE),
      'address': locationX + ', ' + locationY,
      'price': getRandInRange(MIN_PRICE, MAX_PRICE),
      'type': getParameterIndex(OFFER_TYPE),
      'rooms': getRandInRange(MIN_ROOMS, MAX_ROOMS),
      'guests': getRandInRange(minGuests, maxGuests),
      'checkin': getParameterIndex(CHECKIN),
      'checkout': getParameterIndex(CHECKOUT),
      'features': getRandomArray(FEATURES),
      'description': '',
      'photos': getRandOrderArray(PHOTOS)
    },
    'location': {
      'x': locationX,
      'y': locationY
    }
  };

  return ad;
};

var getAdsList = function () {
  var ads = [];
  for (var i = 1; i <= MAX_USER; i++) {
    ads.push(createAd(i));
  }
  return ads;
};

var fragment = document.createDocumentFragment();

var pinRender = function (ad) {
  var pinElement = pinTemplate.cloneNode(true);


  return pinElement;
};

var userDialog = document.querySelector('.map');
userDialog.classList.remove('map--faded');
