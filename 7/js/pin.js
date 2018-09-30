'use strict';
(function () {
  var mapPins = window.map.mapElement.querySelector('.map__pins');
  var mapFilters = window.map.mapElement.querySelector('.map__filters-container');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var pinRender = function (ad, i) {
    var pinElement = pinTemplate.cloneNode(true);
    var pinElementWidth = window.map.mapPin.offsetWidth;
    var pinElementHeight = window.map.mapPin.offsetHeight;
    var pinImage = pinElement.querySelector('img');

    pinElement.style = 'left:' + (ad.location.x - pinElementWidth / 2) + 'px; top: ' + (ad.location.y - pinElementHeight) + 'px';
    pinImage.src = ad.author.avatar;
    pinImage.alt = ad.offer.title;
    pinElement.setAttribute('data-index', i);

    pinElement.addEventListener('click', function (evt) {
      var elementIndex = evt.currentTarget.dataset.index;
      window.map.mapElement.insertBefore(window.card.cardRender(window.dataArray[elementIndex]), mapFilters);
    });

    return pinElement;
  };

  var fragment = document.createDocumentFragment();
  window.load(function () {
    var showPins = function () {
      for (var i = 0; i < window.dataArray.length; i++) {
        fragment.appendChild(pinRender(window.dataArray[i], i));
      }
      mapPins.appendChild(fragment);
    };
    window.showPins = showPins;
  });

})();
