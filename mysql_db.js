/**
 * Created by rishi on 11/19/16.
 */

var mysql = require('mysql');
var pool = null;

exports.connect = function(){
    pool = mysql.createPool({
        host : 'ec2-54-186-74-196.us-west-2.compute.amazonaws.com',
        user : 'cmpe_user',
        password : 'cmpe_user',
        database : 'auto_exchange',
        port : 3306
    });
}

exports.getPool = function(){
    return pool;
}


