const hideDeleteSeasonAlert = () => {
  const el = document.querySelector('.alert');
  if (el) el.parentElement.removeChild(el);
};

const showDeleteSeasonAlert = (type, msg) => {
  hideDeleteSeasonAlert();
  const markup = `<div class="alert alert--${type}">${msg}</div>`;
  document.querySelector('body').insertAdjacentHTML('afterbegin', markup);
  window.setTimeout(hideDeleteSeasonAlert, 5000);
};

// DOM ELEMENTS
const deleteSeasonBtns = document.querySelectorAll('.delete-season');
const editSeasonBtns = document.querySelectorAll('.edit-season');
const deleteSeasonModal = document.querySelector('.delete-season-modal');
const cancelDeleteSeason = document.querySelector('.cancel-delete-season');
const deleteSeasonBtn = document.querySelector('.delete-season-btn');

const deleteSeason = async (seasonId) => {
  try {
    const res = await axios({
      method: 'DELETE',
      url: `https://ballingarryafcstats.cyclic.cloud/api/v1/seasons/${seasonId}`,
    });

    showDeleteSeasonAlert('success', 'Season deleted!');
    window.setTimeout(() => {
      //   location.assign('/');
      location.reload(true);
    }, 1500);
  } catch (error) {
    showDeleteSeasonAlert('error');
  }
};

if (deleteSeasonBtns) {
  deleteSeasonBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      deleteSeasonModal.classList.add('modal-show');
      if (deleteSeasonBtn) {
        deleteSeasonBtn.addEventListener('click', () => {
          deleteSeason(btn.dataset.season);
        });
      }
    });
  });
}

if (editSeasonBtns) {
  editSeasonBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      location.assign(
        `https://bgafc-stats.onrender.com/seasons/${btn.dataset.season}/edit/${btn.dataset.player}`
      );
    });
  });
}

if (cancelDeleteSeason) {
  cancelDeleteSeason.addEventListener('click', () => {
    deleteSeasonModal.classList.remove('modal-show');
  });
}
