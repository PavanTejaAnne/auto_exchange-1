/**
 * Created by dhira on 11/19/2016.
 */
var express = require('express');
var mysql = require('./../db/mysql');
var ejs=require('ejs');
var timeUtil = require('../helper/timeutil');

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
    var ssn = req.query.ssn;
    var vin = req.query.vin;
    var list_price = req.query.list_price;
    var final_price = req.query.final_price;
    var model_no = req.query.model;
    var manufacturer = req.query.manufacturer;
    var old_license =req.query.old_license_plate;
    var new_license = req.query.new_license_plate;
    var year = req.query.manufactured_year;
    var type = req.query.car_type;
    var branch_id = req.query.branch_id;
    var date = timeUtil.getCurrentDateTime();

    var flag;
    var check_query = "select * from car where vin = '"+vin+"'";
    mysql.fetchData(check_query, function(err,results){
        if(err){
            throw err;
        }else{
            if(results.length > 0){
                flag = false;
            }
            else{
                flag = true;
            }
        }
    });

    var sql_query="";
    if(flag){
        sql_query = "insert into sells_to(sells_to_ssn, sells_to_branch_id) values('"+ ssn +"', '"+ branch_id +"');" +
            "insert into sells(sells_ssn, sells_vin, selling_date) values('"+ ssn +"', '"+ vin +"', '"+ date +"');" +
            "insert into in_stock_car(in_stock_vin, in_stock_price, in_stock_branch_id) values('"+ vin +"', "+ final_price +", '"+ branch_id +"');" +
            "insert into transaction(transaction_vin, transaction_date, list_price, final_price, old_license_plate, new_license_plate, is_sale) " +
            "values('"+ vin +"', '"+ date +"', "+ list_price +","+ final_price +",'"+ old_license +"', '"+ new_license +"',"+ true +");" +
            "insert into car(vin, manufacturer, model_no, manufactured_year, car_type) values('"+vin+"', '"+manufacturer+"', '"+model_no+"', '"+year+"', '"+type+"')";
    }
    else{
        sql_query = "insert into sells_to(sells_to_ssn, sells_to_branch_id) values('"+ ssn +"', '"+ branch_id +"');" +
            "insert into sells(sells_ssn, sells_vin, selling_date) values('"+ ssn +"', '"+ vin +"', '"+ date +"');" +
            "insert into in_stock_car(in_stock_vin, in_stock_price, in_stock_branch_id) values('"+ vin +"', "+ final_price +", '"+ branch_id +"');" +
            "insert into transaction(transaction_vin, transaction_date, list_price, final_price, old_license_plate, new_license_plate, is_sale) " +
            "values('"+ vin +"', '"+ date +"', "+ list_price +","+ final_price +",'"+ old_license +"', '"+ new_license +"',"+ true +");" ;
    }

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
};

exports.setTransactionBuy = function(req, res){
    var ssn = req.query.ssn;
    var vin = req.query.vin;
    var list_price = req.query.list_price;
    var final_price = req.query.final_price;
    var model_no = req.query.model;
    var manufacturer = req.query.manufacturer;
    var old_license =req.query.old_license_plate;
    var new_license = req.query.new_license_plate;

    var branch_id = req.session.branch_id;
    var date = timeUtil.getCurrentDateTime();

    var sql_query = "insert into buys_from(buys_from_ssn, buys_from_branch_id) values('"+ ssn +"', '"+ branch_id +"');" +
        "insert into buys (buys_ssn, buys_vin, buying_date) values('"+ ssn +"', '"+ vin +"', '"+ date +"');" +
        "delete from in_stock_car where in_stock_vin='"+ vin +"';" +
        "insert into transaction(transaction_vin, transaction_date, list_price, final_price, old_license_plate, new_license_plate, is_sale) " +
        "values('"+ vin +"', '"+ date +"', "+ list_price +", "+ final_price +", '"+ old_license +"', '"+ new_license +"',"+ false +");";
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
};