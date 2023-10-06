const hideDeletePlayerAlert = () => {
  const el = document.querySelector('.alert');
  if (el) el.parentElement.removeChild(el);
};

const showDeletePlayerAlert = (type, msg) => {
  hideDeletePlayerAlert();
  const markup = `<div class="alert alert--${type}">${msg}</div>`;
  document.querySelector('body').insertAdjacentHTML('afterbegin', markup);
  window.setTimeout(hideDeletePlayerAlert, 5000);
};

// DOM ELEMENTS
const deletePlayerBtns = document.querySelectorAll('.delete-player');
const editPlayerBtns = document.querySelectorAll('.edit-player');
const deletePlayerModal = document.querySelector('.delete-player-modal');
const cancelDeletePlayer = document.querySelector('.cancel-delete-player');
const deletePlayerBtn = document.querySelector('.delete-player-btn');

const deletePlayer = async (slug) => {
  try {
    const res = await axios({
      method: 'DELETE',
      url: `https://ballingarryafcstats.cyclic.cloud/api/v1/players/${slug}`,
    });

    showDeletePlayerAlert('success', 'Player deleted!');
    window.setTimeout(() => {
      location.assign('/');
    }, 1500);
  } catch (error) {
    showDeletePlayerAlert('error');
  }
};

if (deletePlayerBtns) {
  deletePlayerBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      deletePlayerModal.classList.add('modal-show');
      if (deletePlayerBtn) {
        deletePlayerBtn.addEventListener('click', () => {
          deletePlayer(btn.dataset.slug);
        });
      }
    });
  });
}

if (editPlayerBtns) {
  editPlayerBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      console.log(btn.dataset.slug);
      location.assign(
        `https://ballingarryafcstats.cyclic.cloud/players/${btn.dataset.slug}/edit`
      );
    });
  });
}

if (cancelDeletePlayer) {
  cancelDeletePlayer.addEventListener('click', () => {
    deletePlayerModal.classList.remove('modal-show');
  });
}
