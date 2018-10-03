'use strict';
(function () {
  var DEBOUNCE_INTERVAL = 300;
  var lastTimeout;
  var housingPriceDictionary = {
    'low': {
      minPrice: 0,
      maxPrice: 10000
    },
    'middle': {
      minPrice: 10000,
      maxPrice: 50000
    },
    'high': {
      minPrice: 50000,
      maxPrice: Infinity
    }
  };
  var mapFiltersElement = document.querySelector('.map__filters');
  var filterHousingTypeElement = document.querySelector('#housing-type');
  var filterHousingPriceElement = document.querySelector('#housing-price');
  var filterHousingRoomsElement = document.querySelector('#housing-rooms');
  var filterHousingGuestsElement = document.querySelector('#housing-guests');

  var getFilterParameterType = function (ads, filterFormElement) {
    if (filterFormElement.value === 'any') {
      return true;
    }
    return ads.offer.type === filterFormElement.value;
  };
  var getFilterParameterRooms = function (ads, filterFormElement) {
    if (filterFormElement.value === 'any') {
      return true;
    }
    return ads.offer.rooms === Number(filterFormElement.value);
  };
  var getFilterParameterGuests = function (ads, filterFormElement) {
    if (filterFormElement.value === 'any') {
      return true;
    }
    return ads.offer.guests === Number(filterFormElement.value);
  };

  var getFilterParameterPrice = function (ads, filterFormElement) {
    if (filterFormElement.value === 'any') {
      return true;
    }
    var minPrice = housingPriceDictionary[filterFormElement.value].minPrice;
    var maxPrice = housingPriceDictionary[filterFormElement.value].maxPrice;
    return ads.offer.price >= minPrice && ads.offer.price <= maxPrice;
  };

  var onFiltersChange = function () {
    var filtersAds = window.dataArray.filter(function (filtredData) {
      var adType = getFilterParameterType(filtredData, filterHousingTypeElement);
      var adRooms = getFilterParameterRooms(filtredData, filterHousingRoomsElement);
      var adPrice = getFilterParameterPrice(filtredData, filterHousingPriceElement);
      var adGuests = getFilterParameterGuests(filtredData, filterHousingGuestsElement);
      return adType && adRooms && adPrice && adGuests;
    });
    window.dataArrayCopy = filtersAds;
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function () {
      window.showPins();
    }, DEBOUNCE_INTERVAL);
  };

  mapFiltersElement.addEventListener('change', onFiltersChange);

})();
