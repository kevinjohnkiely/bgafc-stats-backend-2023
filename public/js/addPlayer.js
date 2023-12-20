// import axios from 'axios';
const hideAddPlayerAlert = () => {
  const el = document.querySelector('.alert');
  if (el) el.parentElement.removeChild(el);
};

const showAddPlayerAlert = (type, msg) => {
  hideAddPlayerAlert();
  const markup = `<div class="alert alert--${type}">${msg}</div>`;
  document.querySelector('body').insertAdjacentHTML('afterbegin', markup);
  window.setTimeout(hideAddPlayerAlert, 5000);
};

// DOM ELEMENTS
const addPlayerForm = document.querySelector('.add-player-form');

const addPlayer = async (playerData) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://localhost:1984/api/v1/players',
      data: playerData,
    });

    if (res.data.status === 'success') {
      console.log(res.data.data.player.slug);
      showAddPlayerAlert('success', 'Player added!');
      window.setTimeout(() => {
        location.assign(`/players/${res.data.data.player.slug}`);
      }, 1500);
    }
  } catch (error) {
    showAddPlayerAlert('error', error.response.data.message);
  }
};

if (addPlayerForm) {
  addPlayerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const dateOfBirth = document.getElementById('dateOfBirth').value;
    const position = document.getElementById('position').value;
    const debut = document.getElementById('debut').value;
    const firstGoal = document.getElementById('firstGoal').value;
    const honours = document.getElementById('honours').value;
    const playerObj = {
      firstName,
      lastName,
      dateOfBirth,
      position,
      debut,
      firstGoal,
      honours,
    };
    addPlayer(playerObj);
  });
}
