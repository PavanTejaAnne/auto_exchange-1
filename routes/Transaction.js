/**
 * Created by dhira on 11/19/2016.
 */
var express = require('express');
var mysql = require('./mysql');
var ejs=require('ejs');

exports.getTransactionbyDate = function(req, res){
    Transaction_Date = req.param("Date");
    var sql_query = "select * from Transaction where transaction_date = '"+Transaction_Date+"'";
    mysql.fetchData(sql_query, function(err, results) {
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
                res.send({
                    "status": 10,
                    "message:": "transaction fetched by successfully with empty line returned!",
                    "profile": results
                });
            }
        }
    });
};

exports.getTransactionbyVehicle_ID = function(req, res){
    Vehicle_ID = req.param("Vehicle_ID");
    var sql_query = "select * from Transaction where transaction_vehicle_id = '"+Vehicle_ID+"'";
    mysql.fetchData(sql_query, function(err, results) {
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
                res.send({
                    "status": 10,
                    "message:": "transaction fetched by successfully with empty line returned!",
                    "profile": results
                });
            }
        }
    });
};

exports.setTransactionSell = function(req, res){
    ssn = req.param("ssn");
    branch_id = req.param("branch_id");
    date = req.param("date");
    vehicle_id = req.param("vehicle_id");
    list_price = req.param("customer_price");
    final_price = req.param("dealer_price");
    model_no = req.param("model_no");
    manufacture = req.param("manufacture");
    old_license =req.param("old_license");
    new_license = req.param("new_license");
    var sql_query = "insert into Sells_to(sells_to_SSN, Sells_to_branch_id) values('"+ssn+"', '"+branch_id+"');" +
        "insert into Sells(Sells_SSN, Sells_vehicle_id, Selling_Date) values('"+ssn+"', '"+vehicle_id+"', '"+date+"');" +
        "insert into In_Stock_car(In_Stock_vehicle_id, In_Stock_price, In_Stock_branch_id) values('"+vehicle_id+"', '"+final_price+"', '"+branch_id+"');" +
        "insert into Transaction(transaction_date, list_price, final_price, old_license_number, new_license_number, Operation) " +
        "values('"+date+"', '"+list_price+"', '"+final_price+"', '"+old_license+"', '"+new_license+"', 'Sell');";
    mysql.fetchData(sql_query, function(err, results) {
        if (err) {
            throw err;
        } else {
            res.send({
                "status": 200,
                "message:": "Sell Transaction Inserted successfully!",
                "profile": results
            });
        }
    });
}

exports.setTransactionBuy = function(req, res){
    ssn = req.param("ssn");
    branch_id = req.param("branch_id");
    date = req.param("date");
    vehicle_id = req.param("vehicle_id");
    list_price = req.param("customer_price");
    final_price = req.param("dealer_price");
    model_no = req.param("model_no");
    manufacture = req.param("manufacture");
    old_license =req.param("old_license");
    new_license = req.param("new_license");
    var sql_query = "insert into Buys_from(Buys_from_SSN, Buys_from_branch_id) values('"+ssn+"', '"+branch_id+"');" +
        "insert into Buys_(Buys_SSN, Buys_vehicle_id, Buying_Date) values('"+ssn+"', '"+vehicle_id+"', '"+date+"');" +
        "delete from In_Stock_car where In_Stock_vehicle_id='"+vehicle_id+"';" +
        "insert into Transaction(transaction_vehicle_id, transaction_date, list_price, final_price, old_license_number, new_license_number, Operation) " +
        "values('"+vehicle_id+"', '"+date+"', '"+list_price+"', '"+final_price+"', '"+old_license+"', '"+new_license+"', 'Buy');";
    mysql.fetchData(sql_query, function(err, results) {
        if (err) {
            throw err;
        } else {
            res.send({
                "status": 200,
                "message:": "Buy Transaction Inserted successfully!",
                "profile": results
            });
        }
    });
}