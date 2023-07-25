// import axios from 'axios';
const hideAddPhotoAlert = () => {
  const el = document.querySelector('.alert');
  if (el) el.parentElement.removeChild(el);
};

const showAddPhotoAlert = (type, msg) => {
  hideAddPhotoAlert();
  const markup = `<div class="alert alert--${type}">${msg}</div>`;
  document.querySelector('body').insertAdjacentHTML('afterbegin', markup);
  window.setTimeout(hideAddPhotoAlert, 5000);
};

// DOM ELEMENTS
const addPhotoForm = document.querySelector('.add-photo-form');
const slugDataItem = document.getElementById('playerSlug');

const addPhoto = async (photoData) => {
  //   console.log(photoData);
  try {
    // const res = await axios({
    //   method: 'POST',
    //   url: `http://localhost:1984/api/v1/players/uploadphoto/${slugDataItem.dataset.slug}`,
    //   data: photoData,
    // });

    const res = await fetch(
      `http://localhost:1984/api/v1/players/uploadphoto/${slugDataItem.dataset.slug}`,
      {
        method: 'POST',
        body: JSON.stringify({
          data: photoData.x,
          fileName: photoData.fileNameStr,
        }),
        headers: { 'Content-type': 'application/json' },
      }
    );

    const response = await res.json();

    console.log(response);

    if (response.status === 'success') {
      showAddPhotoAlert('success', 'Photo added!');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (error) {
    showAddPhotoAlert('error', error.message);
  }
};

if (addPhotoForm) {
  addPhotoForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const theFile = document.getElementById('photo').files[0];
    const fileNameStr = theFile.name.split('.')[0];

    const reader = new FileReader();
    reader.readAsDataURL(theFile);
    reader.onloadend = () => {
      const x = reader.result;
      addPhoto({ x, fileNameStr });
    };

    // addPhoto(theFile);
  });
}
