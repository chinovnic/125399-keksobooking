'use strict';
(function () {
  var GET_URL = 'https://js.dump.academy/keksobooking/data';
  var POST_URL = 'https://js.dump.academy/keksobooking';

  window.upload = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      onLoad(xhr.response);
    });

    xhr.open('POST', POST_URL);
    xhr.send(data);
  };
  window.load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.open('GET', GET_URL);

    xhr.addEventListener('load', function () {
      onLoad(xhr.response);
      var arr = JSON.parse(xhr.responseText);
      window.arr = arr;
    });

    xhr.send();
  };

})();
