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
                        "message:": "search successful!",
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
                    "message:": "search successful!",
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
                    "message:": "search successful!",
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

exports.getCustomerHistory = function(req, res){
    ssn = req.param("ssn");
    var history = "(select transaction_vehicle_id, transaction_date, list_price, final_price, old_license_number, new_license_number, operation" +
        "from Sells inner join Transaction on (transaction_date=Selling_Date and transaction_vehicle_id=Sells_vehicle_id)" +
        "where Sells_SSN='"+ssn+"')" +
        "union" +
        "(select transaction_vehicle_id, transaction_date, list_price, final_price, old_license_number, new_license_number, operation" +
        "from Buys_ inner join Transaction on (transaction_date=Buying_Date and transaction_vehicle_id=Buys_vehicle_id)" +
        "where Buys_SSN='"+ssn+"')";
    mysql.fetchData(history, function(err, results) {
        if (err) {
            throw err;
        } else {
            if (results.length < 5) {
                console.log(results);
                res.send({
                    "status": 200,
                    "message:": "history fetch successful!",
                    "profile": results,
                    "discount": 0
                });
            }
            if (results.length >= 5 && results.length < 10) {
                console.log(results);
                res.send({
                    "status": 200,
                    "message:": "history fetch successful!",
                    "profile": results,
                    "discount": 5
                });
            }
            if (results.length >= 10 && results.length < 15) {
                console.log(results);
                res.send({
                    "status": 200,
                    "message:": "history fetch successful!",
                    "profile": results,
                    "discount": 10
                });
            }
            if (results.length >= 15) {
                console.log(results);
                res.send({
                    "status": 200,
                    "message:": "history fetch successful!",
                    "profile": results,
                    "discount": 15
                });
            }
        }
    });
};

exports.getCustomerDiscount = function(req, res){
    ssn = req.param("ssn");
    var history = "(select transaction_vehicle_id, transaction_date, list_price, final_price, old_license_number, new_license_number, operation" +
        "from Sells inner join Transaction on (transaction_date=Selling_Date and transaction_vehicle_id=Sells_vehicle_id)" +
        "where Sells_SSN='"+ssn+"')" +
        "union" +
        "(select transaction_vehicle_id, transaction_date, list_price, final_price, old_license_number, new_license_number, operation" +
        "from Buys_ inner join Transaction on (transaction_date=Buying_Date and transaction_vehicle_id=Buys_vehicle_id)" +
        "where Buys_SSN='"+ssn+"')";
    mysql.fetchData(history, function(err, results) {
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