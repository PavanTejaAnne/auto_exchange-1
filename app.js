
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var customer = require('./routes/customer');
var branch = require('./routes/branch');
var Car = require('./routes/Car');
var Transaction = require('./routes/Transaction')
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

app.post('/api/getCustomerBySsn', customer.getCustomerBySsn);
app.post('/api/getCustomerByName', customer.getCustomerByName);
app.post('/api/getCustomerByLicense', customer.getCustomerByLicense);
app.post('/api/getBranchById', branch.getBranchById);
app.post('/api/getBranchByLocation', branch.getBranchByLocation);
app.post('/api/getCustomerHistory', customer.getCustomerHistory);
app.post('/api/getTransactionbyVehicleID', Transaction.getTransactionbyVehicle_ID);
app.post('/api/getTransactionbyTransactionDate', Transaction.getTransactionbyDate);
app.post('/api/getCarbyCar_ID', Car.getCarbyCar_ID);
app.post('/api/getCarbyManufacturer', Car.getCarbyManufacturer);
app.post('/api/getCarbyManufacturerd_year', Car.getCarbyManufactured_year);
app.post('/api/getCarbyModel_No', Car.getCarbyModel_No);
app.post('/api/getCarbyCar_Type', Car.getCarbyCar_Type);
/*app.post('/api/getIn_Stock_CarbyPrice', Car.getIn_Stock_CarbyPrice);
app.post('/api/getIn_Stock_CarbyBranch_ID', Car.getIn_Stock_CarbyBranch_ID);
app.post('/api/getIn_Stock_CarbyCar_ID', Car.getIn_Stock_CarbyCar_ID);
app.post('/api/getIn_Stock_CarbyManufacturer', Car.getIn_Stock_CarbyManufacturer);
app.post('/api/getIn_Stock_CarbyManufacturerd_year', Car.getIn_Stock_CarbyManufacturer);
app.post('/api/getIn_Stock_CarbyModel_No', Car.getIn_Stock_CarbyModel_No);
app.post('/api/getIn_Stock_CarbyCar_Type', Car.getIn_Stock_CarbyCar_Type);*/
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
