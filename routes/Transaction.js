/**
 * Created by dhira on 11/19/2016.
 */
var express = require('express');
var mysql = require('./mysql');
var ejs=require('ejs');

exports.getTransactionbyDate = function(req, res){
    Transaction_Date = req.param("Date");
    var customer = "select * from Transaction where transaction_date = '"+Transaction_Date+"'";
    mysql.fetchData(customer, function(err, results) {
        if (err) {
            throw err;
        } else {
            if (results.length > 0) {
                console.log(results);
                res.send({
                    "status": 200,
                    "message:": "transaction fetched by Date successfully!",
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

exports.getTransactionbyVehicle_ID = function(req, res){
    Vehicle_ID = req.param("Vehicle_ID");
    var customer = "select * from Transaction where transaction_vehicle_id = '"+Vehicle_ID+"'";
    mysql.fetchData(customer, function(err, results) {
        if (err) {
            throw err;
        } else {
            if (results.length > 0) {
                console.log(results);
                res.send({
                    "status": 200,
                    "message:": "transaction_vehicle_id fetched by transaction successfully!",
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