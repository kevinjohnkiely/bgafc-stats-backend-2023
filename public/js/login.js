/* eslint-disable */
// import axios from 'axios';

const login = async (username, password) => {
  console.log(username, password);
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://localhost:1984/api/v1/users/login',
      data: {
        username,
        password,
      },
    });
    console.log(res);
  } catch (err) {
    console.log(err.response.data);
  }
};

document.querySelector('.login-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const username = document.getElementById('username-input').value;
  const password = document.getElementById('password-input').value;
  login(username, password);
});
