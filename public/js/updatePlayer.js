const hideUpdatePlayerAlert = () => {
  const el = document.querySelector('.alert');
  if (el) el.parentElement.removeChild(el);
};

const showUpdatePlayerAlert = (type, msg) => {
  hideUpdatePlayerAlert();
  const markup = `<div class="alert alert--${type}">${msg}</div>`;
  document.querySelector('body').insertAdjacentHTML('afterbegin', markup);
  window.setTimeout(hideUpdatePlayerAlert, 5000);
};

// DOM elements
const updatePlayerForm = document.querySelector('.update-player-form');
const slugDataItem = document.getElementById('player-slug');

const updatePlayer = async (playerData) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: `https://ballingarryafcstats.cyclic.cloud/api/v1/players/${slugDataItem.dataset.slug}`,
      data: playerData,
    });
    console.log(res.data);

    if (res.data.status === 'success') {
      showUpdatePlayerAlert('success', 'Player updated!');
      window.setTimeout(() => {
        location.assign(`/players/${slugDataItem.dataset.slug}`);
      }, 1500);
    }
  } catch (error) {
    showUpdatePlayerAlert('error', error.response.data.data.message);
  }
};

if (updatePlayerForm) {
  updatePlayerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const slug = document.getElementById('slug').value;
    const dateOfBirth = document.getElementById('dateOfBirth').value;
    const position = document.getElementById('position').value;
    const debut = document.getElementById('debut').value;
    const firstGoal = document.getElementById('firstGoal').value;
    const honours = document.getElementById('honours').value;
    const playerObj = {
      firstName,
      lastName,
      slug,
      dateOfBirth,
      position,
      debut,
      firstGoal,
      honours,
    };
    // console.log(playerObj);
    updatePlayer(playerObj);
  });
}
