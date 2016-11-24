/**
 * Created by satyateja on 11/19/2016.
 */
var express = require('express');
var mysql = require('./mysql');
var ejs=require('ejs');

exports.getBranchById = function(req, res){
    id = req.param("branch_id");
    var branch = "select * from Company_branch where branch_id = '"+id+"'";
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
    location = req.param("location");
    var branch = "select * from Company_branch where location = '"+location+"'";
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
exports.getallBranchs = function(req, res){
   // location = req.param("location");
    var branch = "select * from Company_branch";
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

exports.addnewBranch = function(req, res){
    Branch_Mobile_number = req.param(Branch_Mobile_number);
    Branch_address = req.param(Branch_address);
    Branch_email = req.param(Branch_email);
    Branch_location = req.param(Branch_location);

    // location = req.param("location");
    var sql_query = "insert into company_branch_1(number, address, email, location) values ('"+Branch_Mobile_number+"', '"+Branch_address+"', '"+ Branch_email +"', '"+ Branch_location +"')";
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


exports.updatebranchinfo = function(req, res){
    number  = req.param(number);
    location  = req.param(location);
    email  = req.param(email);
    address   = req.param(address);

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
    var sql_query = "update Customer set ";
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