
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('client-sessions');

var home = require('./routes/home');
var customer = require('./routes/customer');
var branch = require('./routes/branch');
var car = require('./routes/car');
var in_stock_car = require('./routes/instockcar');
var transaction = require('./routes/transactions');
var app = express();

// all environments
//configure the sessions with our application
app.use(session({cookieName: 'session', secret: 'auto_exchange_session',
  duration: 30 * 60 * 1000,    //setting the time for active session
  activeDuration: 5 * 60 * 1000,  })); // setting time for the session to be active when the window is open // 5 minutes set currently

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

app.use('/', home);

app.post('/api/getCustomerBySsn', customer.getCustomerBySsn);
app.post('/api/getCustomerByName', customer.getCustomerByName);
app.post('/api/getCustomerByLicense', customer.getCustomerByLicense);
app.post('/api/getCustomerByEmail', customer.getCustomerByEmail);
app.post('/api/getCustomerByPhone', customer.getCustomerByPhone);
app.post('/api/getBranchById', branch.getBranchById);
app.post('/api/getBranchByLocation', branch.getBranchByLocation);
app.post('/api/getCustomerHistory', customer.getCustomerHistory);
app.post('/api/setTransactionSell', transaction.setTransactionSell);
app.post('/api/setTransactionBuy', transaction.setTransactionBuy);
app.post('/api/getTransactionbyVehicleID', transaction.getTransactionByVehicleId);
app.post('/api/getTransactionbyTransactionDate', transaction.getTransactionByDate);
app.post('/api/getCar', car.getCar);
app.post('/api/getIn_Stock_Car', in_stock_car.getInStockCar);
app.post('/api/getVehicleIDHistorybybranch', car.getVehicleIdByBranch);
app.post('/api/addNewCustomer',customer.addNewCustomer);
app.post('/api/addNewBranch', branch.addNewBranch);
app.post('/api/getAllBranches', branch.getAllBranches);
app.post('/api/getAllCustomer', customer.getAllCustomer);
app.post('/api/updateBranchInfo', branch.updateBranchInfo);
app.post('/api/updateCustomerInfo', customer.updateCustomerInfo);
app.post('/api/setCustomerPhoneNo', customer.setCustomerPhoneNo);
app.post('/api/updateCustomerPhoneNo', customer.updateCustomerPhoneNo);
app.post('/api/setCustomerEmail', customer.setCustomerEmail);
app.post('/api/updateCustomerEmail', customer.updateCustomerEmail);


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
