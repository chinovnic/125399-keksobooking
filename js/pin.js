'use strict';
(function () {
  var mapPins = window.map.map.querySelector('.map__pins');
  var mapFilters = window.map.map.querySelector('.map__filters-container');
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
      window.map.map.insertBefore(window.card.cardRender(window.data.ads[elementIndex]), mapFilters);
    });

    return pinElement;
  };


  var fragment = document.createDocumentFragment();
  var showPins = function () {
    for (var i = 0; i < window.data.ads.length; i++) {

      fragment.appendChild(pinRender(window.data.ads[i], i));
    }
    mapPins.appendChild(fragment);
  };

  window.pin = {
    showPins: showPins
  };
})();
