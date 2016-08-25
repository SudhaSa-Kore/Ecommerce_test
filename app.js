var express = require('express');
var path = require('path');
var _ = require('lodash');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');
var htmlencode = require('htmlencode');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);


app.post('/searchResult/:actionName',function(req,res){
	res.writeHead(200,{'Content-Type':'application/json'});
	console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&',req.body);
	res.end(JSON.stringify({"actionExecuted":req.params.actionName,"fieldSent":req.body}));

}); 


app.get('/doctorsAvailablity',function(req,res){
	res.writeHead(200,{'Content-Type':'application/json'});
	res.end(JSON.stringify({
    "availablity": [
        {
            "fromDate": "26/08/2016",
            "toDate": "30/08/2016",
            "times": [
                {
                    "fromTime": "09:00",
                    "toTime": "12:00"
                },
                {
                    "fromTime": "14:00",
                    "toTime": "16:00"
                }
            ]
        },
        {
            "fromDate": "09/09/2016",
            "toDate": "13/09/2016",
            "times": [
                {
                    "fromTime": "08:30",
                    "toTime": "10:30"
                },
                {
                    "fromTime": "15:00",
                    "toTime": "18:00"
                }
             ]
        },

        {
            "fromDate": "23/10/2016",
            "toDate": "27/10/2016",
            "times": [
                {
                    "fromTime": "10:00",
                    "toTime": "13:00"
                },
                {
                    "fromTime": "16:00",
                    "toTime": "18:00"
            
                }
              ]
        },
        {
            "fromDate": "10/11/2016",
            "toDate": "15/11/2016",
            "times": [
                {
                    "fromTime": "09:30",
                    "toTime": "12:30"
                },
                {
                    "fromTime": "14:00",
                    "toTime": "17:00"
               }
               ]
         }
]
}));
});


app.get('/doctorsAvailable',function(req,res){
	res.writeHead(200,{'Content-Type':'application/json'});
	res.end(JSON.stringify({
    "doctorsDetails": [
        {
            "Name": "Dr X",
            "Qualification": "MBBS,MD,GYN,DGO,FICOG",
            "location": [
                {
                    "Location1": "Kondapur",
                    "Date1": {
                        "fromDate": "26/08/2016",
                        "toDate": "30/08/2016"
                    },
                    "Time1": {
                        "fromTime": "09:00",
                        "toTime": "12:00"
                    }
                }
            ]
        },
        {
            "Location2": "Gachibowli",
            "Date2": {
                "fromDate": "09/09/2016",
                "toDate": "13/09/2016"
            },
            "Time2": {
                "fromTime": "15:00",
                "toTime": "18:00"
            }
        }
    ]
}));
});

app.get('/patientCreate',function(req,res){
	res.writeHead(200,{'Content-Type':'application/json'});
	res.end(JSON.stringify({
  "patientId":"ABCD1234",
  "fullName":"Bill Gates",
  "gender":"male",
  "age":"35",
  "email":"billgates@microsoft.com",
  "mobile":"8179343535"
}));
});

app.get('/appointmentCreate',function(req,res){
	res.writeHead(200,{'Content-Type':'application/json'});
	res.end(JSON.stringify({
  "location": "Kondapur",
  "doctorName":"Dr SubbaRao",
  "appointmentType": "New Consultation",
  "appointmentDate": "26-08-2016",
  "appointmentTime":"14:00",
  "patientName":"Bill Gates",
  "patientId":"ABCD1234",
  "mobile":"8179343535",
  "age":"30",
  "gender":"male",
  "department":"Cardiology"
}));
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
  });
});
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
});
});


module.exports = app;
