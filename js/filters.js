'use strict';
(function () {
  var housingPriceDictionary = {
    'any': {
      minPrice: 0,
      maxPrice: Infinity
    },
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
  var filterFeaturesElements = document.querySelectorAll('.map__checkbox');
  var selectedFeatures = [];

  var getFilterParameterType = function (ads, filterFormElement) {
    return filterFormElement.value === 'any' || ads.offer.type === filterFormElement.value;
  };
  var getFilterParameterRooms = function (ads, filterFormElement) {
    return filterFormElement.value === 'any' || ads.offer.rooms === Number(filterFormElement.value);
  };
  var getFilterParameterGuests = function (ads, filterFormElement) {
    return filterFormElement.value === 'any' || ads.offer.guests === Number(filterFormElement.value);
  };
  var getFilterParameterPrice = function (ads, filterFormElement) {
    var minPrice = housingPriceDictionary[filterFormElement.value].minPrice;
    var maxPrice = housingPriceDictionary[filterFormElement.value].maxPrice;
    return filterFormElement.value === 'any' || (ads.offer.price >= minPrice && ads.offer.price <= maxPrice);
  };

  var updateFeatures = function () {
    selectedFeatures = [];
    filterFeaturesElements.forEach(function (current) {
      if (current.checked) {
        selectedFeatures.push(current.value);
      }
    });
  };

  var getFilterParameterFeatures = function (ads) {
    var where = ads.offer.features;
    var what = selectedFeatures;
    for (var i = 0; i < what.length; i++) {
      if (where.indexOf(what[i]) === -1) {
        return false;
      }
    }
    return true;
  };

  var onFiltersChange = function () {
    updateFeatures();
    var filtersAds = window.dataArray.filter(function (filtredData) {
      var adType = getFilterParameterType(filtredData, filterHousingTypeElement);
      var adRooms = getFilterParameterRooms(filtredData, filterHousingRoomsElement);
      var adPrice = getFilterParameterPrice(filtredData, filterHousingPriceElement);
      var adGuests = getFilterParameterGuests(filtredData, filterHousingGuestsElement);
      var adFeatures = getFilterParameterFeatures(filtredData);
      return adType && adRooms && adPrice && adGuests && adFeatures;
    });
    window.dataArrayCopy = filtersAds;
    window.utils.debounce(window.showPins);
  };

  mapFiltersElement.addEventListener('change', onFiltersChange);

})();
