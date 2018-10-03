'use strict';
(function () {
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
    return ads.offer.guests === filterFormElement.value;
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
    console.log(window.dataArray);
    var filtersAds = window.dataArray.filter(function (filtredData) {
      var is_type = getFilterParameterType(filtredData, filterHousingTypeElement);
      var is_rooms = getFilterParameterRooms(filtredData, filterHousingRoomsElement);
      var is_price = getFilterParameterPrice(filtredData, filterHousingPriceElement);
      var is_guests = getFilterParameterGuests(filtredData, filterHousingGuestsElement);
      return is_type && is_rooms && is_price && is_guests;
    });
    window.dataArrayCopy = filtersAds;
    window.showPins();
  };

  mapFiltersElement.addEventListener('change', onFiltersChange);

})();
