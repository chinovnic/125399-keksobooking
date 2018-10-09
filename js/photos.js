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

  var loadSomePhotos = function (fileChooser, preview, parentBlock) {
    var filesArray = fileChooser.files;
    var reader = new FileReader();
    var photoPreviewClone = preview.cloneNode(true);
    for (var i = 0; i < filesArray.length; i++) {
      var fileName = filesArray[i].name.toLowerCase();
      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });
      if (matches) {
        reader.addEventListener('load', function (evt) {
          //судя по всему, я не обращаюсь к тому блоку, который вставляю
          photoPreviewClone.backgroundImage = 'url(' + evt.target.result + ')';
          parentBlock.appendChild(photoPreviewClone);
        });
        if (i > 0) {
        //   var photoPreviewAll = document.querySelectorAll('.ad-form__photo');
        //   photoPreviewAll[0].classList.add('visually-hidden');
        }
        reader.readAsDataURL(filesArray[i]);
        //Ошибку выдает, когда пытаюсь загрузить сразу несколько файлов. В этом месте он видит их сразу все, а не только отекущий
        console.log(filesArray[i]);
      }
    }
    photoPreviewBlock.classList.add('visually-hidden');
  };

  var onAvatarChange = function () {
    loadPhoto(avatarInput, avatarPreview);
  };

  var onPhotoUpload = function () {
    loadSomePhotos(photoInput, photoPreviewBlock, photosContainer);
  };

  avatarInput.addEventListener('change', onAvatarChange);
  photoInput.addEventListener('change', onPhotoUpload);
})();
