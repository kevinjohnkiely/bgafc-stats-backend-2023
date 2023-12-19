// DOM ELEMENTS
const searchPlayersForm = document.querySelector('.search-dashboard-form');

if (searchPlayersForm) {
  searchPlayersForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchTerm = document.getElementById('search_dash_players').value;

    location.assign(`/dashboard/search/${searchTerm}`);
  });
}