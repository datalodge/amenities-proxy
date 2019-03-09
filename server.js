const express = require('express');
const proxy = require('http-proxy-middleware');
const compression = require('compression')
const cors = require('cors')
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

app.use(cors())
app.use(compression())
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/amenities', proxy({
  target: 'http://localhost:3003',
  changeOrigin: true
}))


app.listen(port, () => {
  console.log(`I'm serving from http://localhost:${port}`);
});