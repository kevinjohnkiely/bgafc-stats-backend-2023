const hideAlert = () => {
  const el = document.querySelector('.alert');
  if (el) el.parentElement.removeChild(el);
};

const showAlert = (type, msg) => {
  hideAlert();
  const markup = `<div class="alert alert--${type}">${msg}</div>`;
  document.querySelector('body').insertAdjacentHTML('afterbegin', markup);
  window.setTimeout(hideAlert, 5000);
};

// DOM ELEMENTS
const loginForm = document.querySelector('.login-form');
const logoutBtn = document.querySelector('.logout-user');

const login = async (username, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://localhost:1984/api/v1/users/login',
      data: {
        username,
        password,
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Logged in successfully!');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username-input').value;
    const password = document.getElementById('password-input').value;
    login(username, password);
  });
}

const logout = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: 'http://localhost:1984/api/v1/users/logout',
    });
    if ((res.data.status = 'success')) {
      // location.reload(true);
      location.assign('/logout');
    }
  } catch (error) {
    showAlert('error', 'Error logging out, please try again later!');
  }
};

if (logoutBtn) {
  logoutBtn.addEventListener('click', logout);
}
