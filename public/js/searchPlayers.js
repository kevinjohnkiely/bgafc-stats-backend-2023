// DOM ELEMENTS
const searchPlayersForm = document.querySelector('.search-player-form');

if (searchPlayersForm) {
  searchPlayersForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchTerm = document.getElementById('search_players').value;

    location.assign(`/players/search/${searchTerm}`);
  });
}
