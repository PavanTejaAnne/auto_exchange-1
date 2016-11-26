/**
 * Created by satyateja on 11/19/2016.
 */
var ejs= require('ejs');
var mysql = require('mysql');
var pool = null;
function getConnection(){
    // var connection = mysql.createConnection({
    //     host : 'ec2-54-149-150-222.us-west-2.compute.amazonaws.com',
    //     user : 'cmpe_user',
    //     password : 'cmpe_user',
    //     database : 'auto_exchange',
    //     port : 3306
    // });

    var connection = mysql.createConnection({
        host : 'localhost',
        user : 'root',
        password : 'password',
        database : 'auto_exchange',
        port : 3306
    });
    return connection;
}


function fetchData(sqlQuery, callback){

    console.log("\nSQL Query::"+sqlQuery);

    var connection=getConnection();

    connection.query(sqlQuery, function(err, rows, fields) {
        if(err){
            console.log("ERROR: " + err.message);
        }
        else
        {	// return err or result
            console.log("DB Results:"+rows);
            callback(err, rows);
        }
    });
    console.log("\nConnection closed..");
    connection.end();
}

exports.fetchData=fetchData;
