'use strict';
(function () {
  var adForm = document.querySelector('.ad-form');
  var adFormTimeIn = adForm.querySelector('#timein');
  var adFormTimeOut = adForm.querySelector('#timeout');
  var adFormType = adForm.querySelector('#type');
  var adFormPrice = adForm.querySelector('#price');
  var adFormRoomNumber = adForm.querySelector('#room_number');
  var adFormCapacity = adForm.querySelector('#capacity');

  window.form = {
    adForm: adForm,
    adFormTimeIn: adFormTimeIn,
    adFormTimeOut: adFormTimeOut,
    adFormType: adFormType,
    adFormPrice: adFormPrice,
    adFormRoomNumber: adFormRoomNumber,
    adFormCapacity: adFormCapacity
  };

  var OFFER_PRICE = {
    'palace': 10000,
    'flat': 1000,
    'house': 5000,
    'bungalo': 0
  };

  window.map.formHeader.setAttribute('disabled', true);
  window.map.formFeatures.setAttribute('disabled', true);

  window.map.formFieldsets.forEach(function (el) {
    el.setAttribute('disabled', true);
  });
  window.map.mapFieldsets.forEach(function (el) {
    el.setAttribute('disabled', true);
  });

  var mainPinStartY = Math.ceil(window.map.mainPin.offsetTop + window.pin.mainPinStartHeight / 2);
  var mainPinStartX = Math.ceil(window.map.mainPin.offsetLeft + window.pin.mainPinWidth / 2);
  window.map.adress.setAttribute('value', mainPinStartX + ' , ' + mainPinStartY);
  var onTimeInChange = function () {
    adFormTimeOut.value = adFormTimeIn.value;
  };
  var onTimeOutChange = function () {
    adFormTimeIn.value = adFormTimeOut.value;
  };
  var onFormTypeChange = function () {
    var minValue = OFFER_PRICE[adFormType.value];
    adFormPrice.placeholder = minValue;
    adFormPrice.min = minValue;
  };
  var maxCapacity = {
    '1': 1,
    '2': 2,
    '3': 3,
    '100': 0
  };
  var checkCapacity = function () {
    var roomsNumber = adFormRoomNumber.value;
    var capacity = adFormCapacity.value;
    var possibleCapacity = maxCapacity[roomsNumber];
    if (capacity > possibleCapacity) {
      adFormCapacity.setAttribute('disable', true);
      adFormCapacity.setCustomValidity('Недопустимое количество мест для выбранного числа комнат');
    } else if (capacity === '0' && possibleCapacity > 0) {
      adFormCapacity.setAttribute('disable', true);
      adFormCapacity.setCustomValidity('Недопустимое количество мест для выбранного числа комнат');
    } else {
      adFormCapacity.setAttribute('disable', false);
      adFormCapacity.setCustomValidity('');
    }
  };
  checkCapacity();
  var onFormCapacityChange = function () {
    checkCapacity();
  };
  adFormTimeIn.addEventListener('change', onTimeInChange);
  adFormTimeOut.addEventListener('change', onTimeOutChange);
  adFormType.addEventListener('change', onFormTypeChange);
  adFormCapacity.addEventListener('change', onFormCapacityChange);
  adFormRoomNumber.addEventListener('change', onFormCapacityChange);
})();
