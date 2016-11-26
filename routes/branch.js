/**
 * Created by satyateja on 11/19/2016.
 */
var express = require('express');
var mysql = require('./../db/mysql');
var ejs=require('ejs');

exports.getBranchById = function(req, res){
    var id = req.param("branch_id");
    var branch = "select * from company_branch where branch_id = '"+id+"'";
    mysql.fetchData(branch, function(err, results) {
        if (err) {
            throw err;
        } else {
            if (results.length > 0) {
                console.log(results);
                res.send({
                    "status": 200,
                    "message:": "branch search successful!",
                    "profile": results
                });
            }
            // render or error
            else {
                res.end('An error occurred');
                console.log(err);
            }
        }
    });
};

exports.getBranchByLocation = function(req, res){
    var location = req.param("location");
    var branch = "select * from company_branch where location = '"+location+"'";
    mysql.fetchData(branch, function(err, results) {
        if (err) {
            throw err;
        } else {
            if (results.length > 0) {
                console.log(results);
                res.send({
                    "status": 200,
                    "message:": "branch search successful!",
                    "profile": results
                });
            }
            // render or error
            else {
                res.end('An error occurred');
                console.log(err);
            }
        }
    });
};
exports.getAllBranches = function(req, res){
   // location = req.param("location");
    var branch = "select * from company_branch";
    mysql.fetchData(branch, function(err, results) {
        if (err) {
            throw err;
        } else {
            if (results.length > 0) {
                console.log(results);
                res.send({
                    "status": 200,
                    "message:": "branch search successful!",
                    "profile": results
                });
            }
            // render or error
            else {
                res.send({
                    "status": 10,
                    "message:": "branch search successful with empty result set!",
                    "profile": results
                });
            }
        }
    });
};

exports.addNewBranch = function(req, res){
    var Branch_Mobile_number = req.param(Branch_Mobile_number);
    var Branch_address = req.param(Branch_address);
    var Branch_email = req.param(Branch_email);
    var Branch_location = req.param(Branch_location);

    // location = req.param("location");
    var sql_query = "insert into company_branch(phone_number, address, email, location) values ('"+Branch_Mobile_number+"', '"+Branch_address+"', '"+ Branch_email +"', '"+ Branch_location +"')";
    mysql.fetchData(sql_query, function(err, results) {
        if (err) {
            throw err;
        } else {
               console.log(results);
                res.send({
                    "status": 200,
                    "message:": "new branch added!",
                    "profile": results
                });
            // render or error

        }
    });
};


exports.updateBranchInfo = function(req, res){
    var number  = req.param(number);
    var location  = req.param(location);
    var email  = req.param(email);
    var address   = req.param(address);

    var bool_number  = false;
    var bool_location  = false;
    var bool_email  = false;
    var bool_address = false;
    var bool_check_comma = false;

    if(number){
        bool_number = true;
    }
    if(location){
        bool_location = true;
    }
    if(email){
        bool_email = true;
    }
    if(address){
        bool_address = true;
    }
    var sql_query = "update customer set ";
    if(bool_Fname){
        if(bool_check_comma){
            sql_query = sql_query + ","
        }
        sql_query = sql_query + " number = '"+ number + "'";
        if(bool_check_comma == false){
            bool_check_comma = true;
        }
    }
    if(bool_Lname){
        if(bool_check_comma){
            sql_query = sql_query + ","
        }
        sql_query = sql_query + " address = '"+ address + "'";
        if(bool_check_comma == false){
            bool_check_comma = true;
        }
    }if(bool_age){
        if(bool_check_comma){
            sql_query = sql_query + ","
        }
        sql_query = sql_query + " email = '"+ email + "'";
        if(bool_check_comma == false){
            bool_check_comma = true;
        }
    }if(bool_gender){
        if(bool_check_comma){
            sql_query = sql_query + ","
        }
        sql_query = sql_query + " location = '"+ location + "'";
        if(bool_check_comma == false){
            bool_check_comma = true;
        }
    }
    sql_query = sql_query + " where SSN = '"+ SSN +"'";



    // location = req.param("location");
    //var sql_query = "insert into Customer values ('"+SSN+"', '"+Fname+"', '"+ Lname +"', '"+ age +"', '"+ gender +"', '"+ driving_license_number +"','"+ address +"')";
    if(number != "" || address != "" || email != "" || location != "" ) {
        mysql.fetchData(sql_query, function (err, results) {
            if (err) {
                throw err;
            } else {
                console.log(results);
                res.send({
                    "status": 200,
                    "message:": "new branch added!",
                    "profile": results
                });
                // render or error

            }
        });
    }
};