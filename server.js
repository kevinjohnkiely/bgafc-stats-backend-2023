const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE_CONNECTION_STRING.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('DB connection was a success!');
  });

const app = require('./app');

const playerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'A player must have a first name!']
  },
  lastName: {
    type: String,
    required: [true, 'A player must have a last name!']
  },
  dateOfBirth: String,
  position: String,
  debut: String,
  firstGoal: String,
  honours: String
});

const Player = mongoose.model('Player', playerSchema);

const testPlayer = new Player({
  firstName: 'Kevin',
  lastName: 'Kiely',
  dateOfBirth: '29-11-1977',
  position: 'Forward',
  debut: 'sometime ago now',
  firstGoal: 'lasdjfksadj',
  honours: 'testing'
});

testPlayer
  .save()
  .then(doc => {
    console.log(doc);
  })
  .catch(err => {
    console.log('ERROR**8', err);
  });

const port = process.env.PORT || 1984;

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
