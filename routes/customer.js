/**
 * Created by satyateja on 11/19/2016.
 */
var express = require('express');
var mysql = require('./mysql');
var ejs=require('ejs');

exports.getCustomerBySsn = function(req, res){
    ssn = req.param("ssn");
    var customer = "select * from Customer where SSN = '"+ssn+"'";
    mysql.fetchData(customer, function(err, results) {
            if (err) {
                throw err;
            } else {
                if (results.length > 0) {
                    console.log(results);
                    res.send({
                        "status": 200,
                        "message:": "login successful!",
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

exports.getCustomerByName = function(req, res){
    Fname = req.param("Fname");
    Lname = req.param("Lname");
    if(Fname == null){
        var customer = "select * from Customer where Lname = '"+Lname+"'";
    }
    else if(Lname == null){
        var customer = "select * from Customer where Fname = '"+Fname+"'";
    }
    else{
        var customer = "select * from Customer where Fname = '"+Fname+"' and Lname= '"+Lname+"'";
    }
    mysql.fetchData(customer, function(err, results) {
        if (err) {
            throw err;
        } else {
            if (results.length > 0) {
                console.log(results);
                res.send({
                    "status": 200,
                    "message:": "login successful!",
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

exports.getCustomerByLicense = function(req, res){
    license = req.param("License");
    var customer = "select * from Customer where driving_license_number = '"+license+"'";
    mysql.fetchData(customer, function(err, results) {
        if (err) {
            throw err;
        } else {
            if (results.length > 0) {
                console.log(results);
                res.send({
                    "status": 200,
                    "message:": "login successful!",
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