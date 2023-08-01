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
  try {
    // const res = await axios({
    //   method: 'POST',
    //   url: `https://bgafc-stats.onrender.com/api/v1/players/uploadphoto/${slugDataItem.dataset.slug}`,
    //   data: photoData,
    // });
    // https://bgafc-stats.onrender.com/api/v1/players
    // https://bgafc-stats.onrender.com/

    const res = await fetch(
      `https://bgafc-stats.onrender.com/api/v1/players/uploadphoto/${slugDataItem.dataset.slug}`,
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
        location.assign(`/players/${slugDataItem.dataset.slug}`);
      }, 1500);
    } else {
      let errorMsg = '';
      if (response.message === 'request entity too large') {
        errorMsg = 'Image file too large, please try smaller one.';
      }
      showAddPhotoAlert('error', errorMsg);
    }
  } catch (error) {
    showAddPhotoAlert('error', error.message);
  }
};

if (addPhotoForm) {
  addPhotoForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const theFile = document.getElementById('photo').files[0];

    if (!theFile) {
      showAddPhotoAlert('error', 'Please choose a photo!');
    }

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
