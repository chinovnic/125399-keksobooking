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

  // var dataArrayCopy = window.dataArray.slice();
  // window.dataArrayCopy = dataArrayCopy;


  var getFilterParameterType = function (ads, filterFormElement) {
    return ads.offer.type === filterFormElement.value;
  };
  var getFilterParameterRooms = function (ads, filterFormElement) {
    return ads.offer.rooms === Number(filterFormElement.value);
  };
  var getFilterParameterGuests = function (ads, filterFormElement) {
    return ads.offer.guests === filterFormElement.value;
  };

  var getFilterParameterPrice = function (ads, filterFormElement) {
    var minPrice = housingPriceDictionary[filterFormElement.value].minPrice;
    var maxPrice = housingPriceDictionary[filterFormElement.value].maxPrice;
    return ads.offer.price >= minPrice && ads.offer.price <= maxPrice;
  };

  var filtredData = [];
  filtredData = window.dataArray;

  var filtersAds = filtredData.filter(function () {
    getFilterParameterType(filtredData, filterHousingTypeElement);
    getFilterParameterRooms(filtredData, filterHousingRoomsElement);
    getFilterParameterPrice(filtredData, filterHousingPriceElement);
    getFilterParameterGuests(filtredData, filterHousingGuestsElement);
  });

  var onFiltersChange = function () {
    filtersAds();
  };

  mapFiltersElement.addEventListener('change', onFiltersChange);

})();
