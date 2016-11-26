/**
 * Created by dhira on 11/19/2016.
 */
var express = require('express');
var mysql = require('./../db/mysql');
var ejs=require('ejs');

exports.getTransactionByDate = function(req, res){
    var Transaction_Date = req.param("Date");
    var sql_query = "select * from transaction where transaction_date = '"+Transaction_Date+"'";
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

exports.getTransactionByVehicleId = function(req, res){
    var Vehicle_ID = req.param("Vehicle_ID");
    var sql_query = "select * from transaction where transaction_vehicle_id = '"+Vehicle_ID+"'";
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
    var ssn = req.param("ssn");
    var branch_id = req.param("branch_id");
    var date = req.param("date");
    var vehicle_id = req.param("vehicle_id");
    var list_price = req.param("customer_price");
    var final_price = req.param("dealer_price");
    var model_no = req.param("model_no");
    var manufacture = req.param("manufacture");
    var old_license =req.param("old_license");
    var new_license = req.param("new_license");
    var sql_query = "insert into sells_to(sells_to_ssn, sells_to_branch_id) values('"+ssn+"', '"+branch_id+"');" +
        "insert into sells(sells_ssn, sells_vin, selling_date) values('"+ssn+"', '"+vehicle_id+"', '"+date+"');" +
        "insert into in_stock_car(in_stock_vin, in_stock_price, in_stock_branch_id) values('"+vehicle_id+"', '"+final_price+"', '"+branch_id+"');" +
        "insert into transaction(transaction_date, list_price, final_price, old_license_plate, new_license_plate, operation) " +
        "values('"+date+"', '"+list_price+"', '"+final_price+"', '"+old_license+"', '"+new_license+"', 'sell');";
    mysql.fetchData(sql_query, function(err, results) {
        if (err) {
            throw err;
        } else {
            res.send({
                "status": 200,
                "message:": "Sell transaction Inserted successfully!",
                "profile": results
            });
        }
    });
}

exports.setTransactionBuy = function(req, res){
    var ssn = req.param("ssn");
    var branch_id = req.param("branch_id");
    var date = req.param("date");
    var vehicle_id = req.param("vehicle_id");
    var list_price = req.param("customer_price");
    var final_price = req.param("dealer_price");
    var model_no = req.param("model_no");
    var manufacture = req.param("manufacture");
    var old_license =req.param("old_license");
    var new_license = req.param("new_license");
    var sql_query = "insert into buys_from(buys_from_ssn, buys_from_branch_id) values('"+ssn+"', '"+branch_id+"');" +
        "insert into buys (buys_ssn, buys_vin, buying_date) values('"+ssn+"', '"+vehicle_id+"', '"+date+"');" +
        "delete from in_stock_car where in_stock_vin='"+vehicle_id+"';" +
        "insert into transaction(transaction_vehicle_id, transaction_date, list_price, final_price, old_license_plate, new_license_plate, operation) " +
        "values('"+vehicle_id+"', '"+date+"', '"+list_price+"', '"+final_price+"', '"+old_license+"', '"+new_license+"', 'Buy');";
    mysql.fetchData(sql_query, function(err, results) {
        if (err) {
            throw err;
        } else {
            res.send({
                "status": 200,
                "message:": "Buy transaction Inserted successfully!",
                "profile": results
            });
        }
    });
}