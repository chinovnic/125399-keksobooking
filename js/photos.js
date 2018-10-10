'use strict';
(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var avatarInput = document.querySelector('.ad-form__field input[type=file]');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');
  var photoInput = document.querySelector('.ad-form__upload input[type=file]');
  var photoPreviewBlock = document.querySelector('.ad-form__photo');
  var photosContainer = document.querySelector('.ad-form__photo-container');

  var loadPhoto = function (fileChooser, preview) {
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        preview.src = reader.result;
      });
      reader.readAsDataURL(file);
    }
  };

  function clearPhotos() {
    var photos = document.querySelectorAll('.ad-form__photo');
    photos.forEach(function(item) {
      item.remove();
    });
  }

  var loadSomePhotos = function (fileChooser, preview, parentBlock) {
    var filesArray = fileChooser.files;
    clearPhotos();
    for(item in filesArray) {
      console.log(item);
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        var photoPreviewClone = preview.cloneNode(true);
        var img = photoPreviewClone.querySelector('img')
        var newImage = document.createElement('img');
        photoPreviewClone.appendChild(newImage);
        parentBlock.appendChild(photoPreviewClone);
      });
      reader.readAsDataURL(file);

    }
    console.log(filesArray, 'filesArray');

    // for (var i = 0; i < filesArray.length; i++) {
    //   var fileName = filesArray[i].name.toLowerCase();
    //   var matches = FILE_TYPES.some(function (it) {
    //     return fileName.endsWith(it);
    //   });
    //   if (matches) {
    //     reader.addEventListener('load', function (evt) {
    //       var photoPreviewClone = preview.cloneNode(true);

    //       parentBlock.appendChild(photoPreviewClone);
    //     });
    //     if (i > 0) {
    //     //   var photoPreviewAll = document.querySelectorAll('.ad-form__photo');
    //     //   photoPreviewAll[0].classList.add('visually-hidden');
    //     }
    //     reader.readAsDataURL(filesArray[i]);

    //     console.log(filesArray[i]);
    //   }
    // }
    // photoPreviewBlock.classList.add('visually-hidden');
  };

  var createImage = function () {
    var newImage = document.createElement('img');
    photoPreviewBlock.appendChild(newImage);
    newImage.setAttribute('src', 'img/muffin-grey.svg');
    newImage.setAttribute('width', '70');
    newImage.setAttribute('height', '70');
  };
  createImage();

  var onAvatarChange = function () {
    loadPhoto(avatarInput, avatarPreview);
  };

  var onPhotoUpload = function () {
    loadSomePhotos(photoInput, photoPreviewBlock, photosContainer);
  };

  avatarInput.addEventListener('change', onAvatarChange);
  photoInput.addEventListener('change', onPhotoUpload);
})();
