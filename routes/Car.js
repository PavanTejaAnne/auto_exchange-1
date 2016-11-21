/**
 * Created by dhira on 11/19/2016.
 */
var express = require('express');
var mysql = require('./mysql');
var ejs=require('ejs');

exports.getCarbyCar_ID = function(req, res){
    var Vehicle_ID = req.param("Vehicle_ID");
    var Manufacturer = req.param("Manufacturer");
    var manufactured_year = req.param("manufactured_year");
    var model_no = req.param("model_no");
    var car_type = req.param("car_type");

    var bool_Vehicle_ID = false;
    var bool_Manufacturer = false;
    var bool_manufactured_year = false;
    var bool_model_no = false;
    var bool_car_type = false;
    var bool_end_check = false;

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
    var sql_query = "select * from Car where ";
    if(bool_Vehicle_ID){
        if(bool_end_check){
            sql_query = sql_query + " and ";
        }
    sql_query = sql_query + "vehicle_id = '"+Vehicle_ID+"'";
        if(bool_end_check == false){
            bool_end_check = true;
        }
    }
    if(bool_Manufacturer){
        if(bool_end_check){
            sql_query = sql_query + " and ";
        }
        sql_query = sql_query + "manufacture = '"+Manufacturer+"'";
        if(bool_end_check == false){
            bool_end_check = true;
        }
    }
    if(bool_manufactured_year){
        if(bool_end_check){
            sql_query = sql_query + " and ";
        }
        sql_query = sql_query + "manufactured_year = '"+manufactured_year+"'";
        if(bool_end_check == false){
            bool_end_check = true;
        }
    }
    if(bool_model_no){
        if(bool_end_check){
            sql_query = sql_query + " and ";
        }
        sql_query = sql_query + "model_no = '"+model_no+"'";
        if(bool_end_check == false){
            bool_end_check = true;
        }
    }
    if(bool_car_type){
        if(bool_end_check){
            sql_query = sql_query + " and ";
        }
        sql_query = sql_query + "car_type = '"+car_type+"'";
        if(bool_end_check == false){
            bool_end_check = true;
        }
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


exports.getCarbyManufacturer = function(req, res){
    Manufacturer = req.param("Manufacturer");
    var sql_query = "select * from Car where manufacture = '"+Manufacturer+"'";
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


exports.getCarbyManufactured_year = function(req, res){
    manufactured_year = req.param("manufactured_year");
    var sql_query = "select * from Car where manufactured_year = '"+manufactured_year+"'";
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


exports.getCarbyModel_No = function(req, res){
    model_no = req.param("model_no");
    var sql_query = "select * from Car where model_no = '"+model_no+"'";
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

exports.getCarbyCar_Type = function(req, res){
    car_type = req.param("car_type");
    var sql_query = "select * from Car where car_type = '"+car_type+"'";
    mysql.fetchData(sql_query, function(err, results) {
        if (err) {
            throw err;
        } else {
            if (results.length > 0) {
                console.log(results[0].model_no);
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
