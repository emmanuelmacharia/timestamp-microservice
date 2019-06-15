// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var moment = require('moment');

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get('/api/timestamp/:date_string', function (req, res) {
  let dateString = req.params.date_string
  if(!(isNaN(dateString))){
    var time = moment.unix(dateString);
    if (time.isValid){
      var utcdate = moment.unix(dateString).format("MMM D, YYYY");
      var jsonObject = {"unix": dateString, "natural": utcdate}
      res.send(jsonObject);
    }
    else{
      var jsonObject = {"unix":null, "natural": "Invalid Date"}
      res.send(jsonObject);
    }
  }
  else{
    var time = moment(dateString);
    if(time.isValid()){
      var utcdate = (new Date(dateString).getTime())/1000;
      var jsonObject = {"unix": utcdate, "natural": dateString}
      res.send(jsonObject);
    }
    else{
      var jsonObject = {"unix":null, "natural": "Invalid Date"}
      res.send(jsonObject);
    }
  }
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
