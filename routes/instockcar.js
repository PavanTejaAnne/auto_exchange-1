/**
 * Created by dhira on 11/19/2016.
 */
var express = require('express');
var mysql = require('./../db/mysql');
var ejs=require('ejs');
var logger = require('../helper/logger').getLogger();

exports.getAllIn_Stock_Cars = function(req, res){
    //var license = req.query.license;
    var customer = "select * from in_stock_car";
    logger.trace("Fetching all in_stock_cars");
    mysql.fetchData(customer, function(err, results) {
        if (err) {
            throw err;
        } else {
            if (results.length > 0) {
                console.log(results);
                res.send({
                    "status": 200,
                    "message:": "in_stock_cars search successful!",
                    "profile": results
                });
            }
            // render or error
            else {
                res.send({
                    "status": 10,
                    "message:": "search returned with empty records!",
                    "profile": results
                });
            }
        }
    });
};


exports.getInStockCar = function(req, res){
    var Vehicle_ID = req.query.Vehicle_ID;
    var Manufacturer = req.query.Manufacturer;
    var manufactured_year = req.query.manufactured_year;
    var model_no = req.query.model_no;
    var car_type = req.query.car_type;
    var In_Stock_price_start = req.query.In_Stock_price_start;
    var In_Stock_price_end = req.query.In_Stock_price_end;

    var In_Stock_branch_id = req.query.In_Stock_branch_id;

    var bool_Vehicle_ID = false;
    var bool_Manufacturer = false;
    var bool_manufactured_year = false;
    var bool_model_no = false;
    var bool_car_type = false;
    var bool_end_check = false;
    var bool_In_Stock_price_start = false;
    var bool_In_Stock_price_end = false;
    var bool_In_Stock_branch_id = false;

    if(Vehicle_ID != "" && Vehicle_ID != undefined){
        bool_Vehicle_ID = true;
    }
    if(Manufacturer != "" && Manufacturer != undefined){
        bool_Manufacturer = true;
    }
    if(manufactured_year != "" && manufactured_year != undefined){
        bool_manufactured_year = true;
    }
    if(model_no != "" && model_no != undefined){
        bool_model_no = true;
    }
    if(car_type != "" && car_type != undefined){
        bool_car_type = true;
    }
    if(In_Stock_price_start != "" || In_Stock_price_start != undefined){
        bool_In_Stock_price_start = true;
    }
    if(In_Stock_price_end != "" && In_Stock_price_end != undefined){
        bool_In_Stock_price_end = true;
    }
    if(In_Stock_branch_id != "" && In_Stock_branch_id != undefined){
        bool_In_Stock_branch_id = true;
    }
    var sql_query = "select * from car, in_stock_car where vin = in_stock_vin";
    if(bool_Vehicle_ID){
        sql_query = sql_query + " and vin = '"+Vehicle_ID+"'";
    }
    if(bool_Manufacturer){
        sql_query = sql_query + " and manufacturer = '"+Manufacturer+"'";
    }
    if(bool_manufactured_year){
        sql_query = sql_query + " and manufactured_year = '"+manufactured_year+"'";
    }
    if(bool_model_no){
        sql_query = sql_query + " and model_no = '"+model_no+"'";
    }
    if(bool_car_type){
        sql_query = sql_query + " and car_type = '"+car_type+"'";
    }
    if(bool_In_Stock_branch_id){
        sql_query = sql_query + " and in_stock_branch_id = '"+In_Stock_branch_id+"'";
    }
    if(bool_In_Stock_price_start){
        sql_query = sql_query + " and in_stock_price >= '"+In_Stock_price_start+"'";
    }
    if(bool_In_Stock_price_end){
        sql_query = sql_query + " and in_stock_price <= '"+In_Stock_price_end+"'";
    }


    console.log("bc :"+sql_query);
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
