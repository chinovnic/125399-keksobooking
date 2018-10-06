'use strict';
(function () {
  var DEBOUNCE_INTERVAL = 500;
  var lastTimeout;
  window.debounce = function (fun) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(fun, DEBOUNCE_INTERVAL);
  };
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
  var filterFeaturesElemetns = document.querySelectorAll('.map__feature');

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

  var getFilterParameterFeatures = function (ads, filterFormElement) {
    var currentFeatures = [];
    for (var i = 0; i < filterFormElement.length; i++) {
      var currentElementValue = filterFormElement[i].value;
      currentFeatures.push(currentElementValue);
    }
    var currentFeaturesSort = currentFeatures.sort();
    currentFeaturesSort.join();
    var adFeaturesArray = ads.offer.features.sort();
    adFeaturesArray.join();
    if (currentFeaturesSort === adFeaturesArray) {
      return true;
    } else {
      return false;
    }
  };

  var onFiltersChange = function () {
    var filtersAds = window.dataArray.filter(function (filtredData) {
      var adType = getFilterParameterType(filtredData, filterHousingTypeElement);
      var adRooms = getFilterParameterRooms(filtredData, filterHousingRoomsElement);
      var adPrice = getFilterParameterPrice(filtredData, filterHousingPriceElement);
      var adGuests = getFilterParameterGuests(filtredData, filterHousingGuestsElement);
      var adFeatures = getFilterParameterFeatures(filtredData, filterFeaturesElemetns);
      return adType && adRooms && adPrice && adGuests;
    });
    window.dataArrayCopy = filtersAds;
    window.debounce(window.showPins);
  };

  mapFiltersElement.addEventListener('change', onFiltersChange);

})();
