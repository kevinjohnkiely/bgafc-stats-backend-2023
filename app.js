const express = require('express');

const app = express();

app.use(express.json())

// app.get('/', (req, res) => {
//   res.status(200).json({

//   });
// });

app.get('/api/v1/players', (req, res) => {
    res.status(200).json({
        status: 'success',
        // results: data.players.length,
        data: {
            players: 'players'
        }
    })
})

app.post('/api/v1/players', (req, res) => {

})

const port = 1984;
app.listen(port, () => {
  console.log('App running on port: ' + port);
});
