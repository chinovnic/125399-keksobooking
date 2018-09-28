'use strict';
(function () {
  var adForm = document.querySelector('.ad-form');
  var adFormTimeIn = adForm.querySelector('#timein');
  var adFormTimeOut = adForm.querySelector('#timeout');
  var adFormType = adForm.querySelector('#type');
  var adFormPrice = adForm.querySelector('#price');
  var adFormRoomNumber = adForm.querySelector('#room_number');
  var adFormCapacity = adForm.querySelector('#capacity');
  var formHeader = document.querySelector('.ad-form-header');
  var formFieldsets = document.querySelectorAll('.ad-form__element');
  var mapFieldsets = document.querySelectorAll('.map__filter');
  var formFeatures = document.querySelector('.map__features');
  var adress = document.querySelector('#address');

  window.form = {
    adForm: adForm,
    adFormTimeIn: adFormTimeIn,
    adFormTimeOut: adFormTimeOut,
    adFormType: adFormType,
    adFormPrice: adFormPrice,
    adFormRoomNumber: adFormRoomNumber,
    adFormCapacity: adFormCapacity,
    formHeader: formHeader,
    formFieldsets: formFieldsets,
    mapFieldsets: mapFieldsets,
    formFeatures: formFeatures,
    adress: adress
  };

  var OFFER_PRICE = {
    'palace': 10000,
    'flat': 1000,
    'house': 5000,
    'bungalo': 0
  };

  formHeader.setAttribute('disabled', true);
  formFeatures.setAttribute('disabled', true);

  formFieldsets.forEach(function (el) {
    el.setAttribute('disabled', true);
  });
  mapFieldsets.forEach(function (el) {
    el.setAttribute('disabled', true);
  });

  var mainPinStartY = Math.ceil(window.pin.mainPin.offsetTop + window.pin.mainPinStartHeight / 2);
  var mainPinStartX = Math.ceil(window.pin.mainPin.offsetLeft + window.pin.mainPinWidth / 2);
  adress.setAttribute('value', mainPinStartX + ' , ' + mainPinStartY);
  adress.setAttribute('readonly', true);
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
