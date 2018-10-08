'use strict';
(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var avatarInput = document.querySelector('.ad-form__field input[type=file]');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');
  var photoInput = document.querySelector('.ad-form__upload input[type=file]');
  var photoPreviewBlock = document.querySelector('.ad-form__photo');

  var loadPhotos = function (fileChooser, preview) {
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

  var createImage = function () {
    var newImage = document.createElement('img');
    photoPreviewBlock.appendChild(newImage);
    newImage.setAttribute('src', 'img/muffin-grey.svg');
    newImage.setAttribute('width', '70');
    newImage.setAttribute('height', '70');
  };

  createImage();

  var onAvatarChange = function () {
    loadPhotos(avatarInput, avatarPreview);
  };

  var onPhotoUpload = function () {
    var photoPreview = document.querySelector('.ad-form__photo img');
    loadPhotos(photoInput, photoPreview);
  };

  avatarInput.addEventListener('change', onAvatarChange);
  photoInput.addEventListener('change', onPhotoUpload);
})();
