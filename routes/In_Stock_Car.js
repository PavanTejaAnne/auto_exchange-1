/**
 * Created by dhira on 11/19/2016.
 */
var express = require('express');
var mysql = require('./mysql');
var ejs=require('ejs');

exports.getInStockCar = function(req, res){
    var Vehicle_ID = req.param("Vehicle_ID");
    var Manufacturer = req.param("Manufacturer");
    var manufactured_year = req.param("manufactured_year");
    var model_no = req.param("model_no");
    var car_type = req.param("car_type");
    var In_Stock_price_start = req.param("In_Stock_price_start");
    var In_Stock_price_end = req.param("In_Stock_price_end");

    var In_Stock_branch_id = req.param("In_Stock_branch_id");

    var bool_Vehicle_ID = false;
    var bool_Manufacturer = false;
    var bool_manufactured_year = false;
    var bool_model_no = false;
    var bool_car_type = false;
    var bool_end_check = false;
    var bool_In_Stock_price_start = false;
    var bool_In_Stock_price_end = false;
    var bool_In_Stock_branch_id = false;

    if(Vehicle_ID != ""){
        bool_Vehicle_ID = true;
    }
    if(Manufacturer != ""){
        bool_Manufacturer = true;
    }
    if(manufactured_year != ""){
        bool_manufactured_year = true;
    }
    if(model_no != ""){
        bool_model_no = true;
    }
    if(car_type != ""){
        bool_car_type = true;
    }
    if(In_Stock_price_start != ""){
        bool_In_Stock_price_start = true;
    }
    if(In_Stock_price != ""){
        bool_In_Stock_price_end = true;
    }
    if(In_Stock_branch_id != ""){
        bool_In_Stock_branch_id = true;
    }
    var sql_query = "select * from Car where vehicle_id = In_Stock_vehicle_id";
    if(bool_Vehicle_ID){
        sql_query = sql_query + " and vehicle_id = '"+Vehicle_ID+"'";
    }
    if(bool_Manufacturer){
        sql_query = sql_query + " and manufacture = '"+Manufacturer+"'";
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
        sql_query = sql_query + " and In_Stock_branch_id = '"+In_Stock_branch_id+"'";
    }
    if(bool_In_Stock_price_start){
        sql_query = sql_query + " and In_Stock_price >= '"+In_Stock_price_start+"'";
    }
    if(bool_In_Stock_price_end){
        sql_query = sql_query + " and In_Stock_price <= '"+In_Stock_price_end+"'";
    }


    console.log(sql_query);
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
                res.end('An error occurred');
                console.log(err);
            }
        }
    });
};
