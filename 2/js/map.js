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
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
var featuresList = document.querySelector('.popup__features');
var featuresItems = document.querySelectorAll('.popup__feature');
var maxX = map.offsetWidth;

var cardPhotos = {
  width: 45,
  height: 35,
  alt: 'Фотография жилья'
};

//featuresList.removeChild(featuresItems);

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

var shuffle = function (arr) {
  arr.sort(function (a, b) {
    return Math.random() - 0.5;
  });
};

shuffle(OFFER_TITLE);


var createUserArray = function (max) {
  var userArray = [];
  for (var j = 1; j <= max; j++) {
    userArray.push(j);
  }
  return userArray;
};

var Users = createUserArray(MAX_USER);
// shuffle(userArray);
console.log(Users);

var getRandOrderArray = function (arr) {
  var j;
  var temp;
  for (var i = arr.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
  }
  return arr;
};

var getRandomArray = function (initialArr) {
  var RandomArray = [];
  var amount = getRandNum(initialArr.length);
  for (var i = 0; i < amount; i++) {
    RandomArray.push(initialArr[i]);
  }
  return RandomArray;
};

var ads = [];
var getAdsList = function () {

  var createAd = function () {
    var locationX = getRandNum(maxX);
    var locationY = getRandInRange(MIN_Y, MAX_Y);
    var ad = {
      'author': {
        'avatar': 'img/avatars/user0' + Users[i] + '.png'
        // 'avatar': 'img/avatars/user01.png'
      },
      'offer': {
        'title': OFFER_TITLE[i],
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

  for (var i = 0; i < MAX_USER; i++) {
    ads.push(createAd(i));
  }
};

getAdsList();

var pinRender = function (ad) {
  var pinElement = pinTemplate.cloneNode(true);
  var pinElementWidth = mapPin.offsetWidth;
  var pinElementHeight = mapPin.offsetHeight;
  var pinImage = pinElement.querySelector('img');

  pinElement.style = 'left:' + (ad.location.x - pinElementWidth / 2) + 'px; top: ' + (ad.location.y - pinElementHeight) + 'px';
  pinImage.src = ad.author.avatar;
  pinImage.alt = ad.offer.title;
  return pinElement;
};

var getCardFeatures = function (features) {
  var featuresItems = [];

  features.forEach(function (features) {
    var featuresItem = document.createElement('li');
    featuresItem.classList.add('popup__feature', 'popup__feature--' + features);
    featuresItems.push(featuresItem);
  });

  return featuresItems;
};

var getCardImages = function (images) {
  var cardImages = [];
  images.forEach(function (images) {
    var cardImage = document.createElement('img');
    cardImage.src = images;
    cardImage.width = cardPhotos.width;
    cardImage.height = cardPhotos.height;
    cardImage.alt = cardPhotos.alt;
    cardImage.classList.add('popup__photo');
    cardImages.push(cardImage);
  });

  return cardImages;
};

var renderElements = function (elements, parent) {
  elements.forEach(function (el) {
    parent.appendChild(el);
  });
};

var cardRender = function (ad) {
  var cardElement = cardTemplate.cloneNode(true);
  var cardFeatures = cardElement.querySelector('.popup__features');
  var cardPhotosWrapper = cardElement.querySelector('.popup__photos');
  var cardImage = cardElement.querySelector('img');
  cardElement.querySelector('.popup__title').textContent = ad.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = ad.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = ad.offer.price + '₽/ночь';
  cardElement.querySelector('.popup__type').textContent = ad.offer.type;
  cardElement.querySelector('.popup__text--capacity').textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;

  cardElement.querySelector('.popup__description').textContent = ad.offer.description;
  cardElement.querySelector('.popup__avatar').src = ad.author.avatar;

  renderElements(getCardFeatures(ad.offer.features), cardFeatures);
  renderElements(getCardImages(ad.offer.photos), cardPhotosWrapper);

  return cardElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < ads.length; i++) {
  fragment.appendChild(pinRender(ads[i]));
  mapPins.appendChild(fragment);
}

map.insertBefore(cardRender(ads[0]), mapFilters);

var userDialog = document.querySelector('.map');
userDialog.classList.remove('map--faded');
