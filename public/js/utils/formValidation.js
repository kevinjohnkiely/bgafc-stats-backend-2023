const lgeApps = document.getElementById('lge_apps');
const lgeGoals = document.getElementById('lge_goals');

// lgeApps.addEventListener('click', () => {
//   if (lgeApps.value > 0) {
//     lgeGoals.removeAttribute('disabled', '');
//   }
//   if (lgeApps.value === 0) {
//     lgeGoals.setAttribute('disabled', '');
//   }
// });

lgeApps.addEventListener('change', () => {
  console.log(lgeApps.value);
  if (lgeApps.value > 0) {
    lgeGoals.removeAttribute('disabled', '');
  }
  if ((lgeApps.value === 0)) {
    alert('back to 0')
    lgeGoals.setAttribute('disabled', '');
  }
});
