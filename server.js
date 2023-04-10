const app = require('./app');

const port = 1984;
app.listen(port, () => {
  console.log('App running on port: ' + port);
});
