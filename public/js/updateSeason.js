const hideUpdateSeasonAlert = () => {
  const el = document.querySelector('.alert');
  if (el) el.parentElement.removeChild(el);
};

const showUpdateSeasonAlert = (type, msg) => {
  hideUpdateSeasonAlert();
  const markup = `<div class="alert alert--${type}">${msg}</div>`;
  document.querySelector('body').insertAdjacentHTML('afterbegin', markup);
  window.setTimeout(hideUpdateSeasonAlert, 5000);
};

// DOM elements
const updateSeasonForm = document.querySelector('.update-season-form');
const seasonDataItem = document.getElementById('seasonId');
const divisionSelect = document.getElementById('division');

const updateSeason = async (seasonData) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: `https://bgafc-stats-2023.cyclic.app/api/v1/seasons/${seasonDataItem.dataset.seasonid}`,
      data: seasonData,
    });

    if (res.data.status === 'success') {
      showUpdateSeasonAlert('success', 'Season updated!');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (error) {
    showUpdateSeasonAlert('error', error.response.data.data.message);
  }
};

if (updateSeasonForm) {
  updateSeasonForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const season = document.getElementById('season').value;
    //   const team = seasonPlayerId.dataset.team;
    const division = document.getElementById('division').value;
    const lge_apps = parseInt(document.getElementById('lge_apps').value);
    const lge_goals = parseInt(document.getElementById('lge_goals').value);
    const fai_apps = parseInt(document.getElementById('fai_apps').value);
    const fai_goals = parseInt(document.getElementById('fai_goals').value);
    const mjc_apps = parseInt(document.getElementById('mjc_apps').value);
    const mjc_goals = parseInt(document.getElementById('mjc_goals').value);
    const msc_apps = parseInt(document.getElementById('msc_apps').value);
    const msc_goals = parseInt(document.getElementById('msc_goals').value);
    const desc_apps = parseInt(document.getElementById('desc_apps').value);
    const desc_goals = parseInt(document.getElementById('desc_goals').value);
    const lgec_apps = parseInt(document.getElementById('lgec_apps').value);
    const lgec_goals = parseInt(document.getElementById('lgec_goals').value);
    const reidyc_apps = parseInt(document.getElementById('reidyc_apps').value);
    const reidyc_goals = parseInt(
      document.getElementById('reidyc_goals').value
    );
    const hoganc_apps = parseInt(document.getElementById('hoganc_apps').value);
    const hoganc_goals = parseInt(
      document.getElementById('hoganc_goals').value
    );
    const seasonObj = {
      season,
      // team,
      division,
      lge_apps,
      lge_goals,
      fai_apps,
      fai_goals,
      mjc_apps,
      mjc_goals,
      msc_apps,
      msc_goals,
      desc_apps,
      desc_goals,
      lgec_apps,
      lgec_goals,
      reidyc_apps,
      reidyc_goals,
      hoganc_apps,
      hoganc_goals,
    };
    updateSeason(seasonObj);
  });
}

// Code to ensure previous Division entry is loaded into dropdown list
const divSel = divisionSelect.dataset.divsel;
console.log(divSel);
const divisionArr = divisionSelect.childNodes;
divisionArr.forEach((element) => {
  if (element.value === divSel) {
    console.log('found');
    element.setAttribute('selected', '');
  }
});
