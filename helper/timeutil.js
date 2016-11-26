/**
 * Created by rishi on 11/23/16.
 */

var dateFormat = require('dateformat');

exports.getCurrentDateTime = function(){
    var now = new Date();
    return dateFormat(now, "yyyy-mm-dd h:MM:ss");
};

exports.getExpiryDateTime = function(duration){
    console.log("Getting expiry date " + duration);
    var now = new Date();
    var expiryDate = now.setDate(now.getDate() + duration);
    return dateFormat(expiryDate, "yyyy-mm-dd h:MM:ss");
};

exports.formatDate = function(dob) {
    var now = new Date(dob);
    return dateFormat(now, "mm-dd-yyyy");
};