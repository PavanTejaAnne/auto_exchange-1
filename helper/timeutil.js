/**
 * Created by rishi on 11/23/16.
 */

var dateFormat = require('dateformat');

exports.getCurrentDateTime = function(){
    var now = new Date();
    return dateFormat(now, "yyyy-mm-dd h:MM:ss");
};

exports.formatDate = function(dob) {
    var now = new Date(dob);
    return dateFormat(now, "mm-dd-yyyy");
};