/**
 * Created by dhira on 11/19/2016.
 */
var express = require('express');
var mysql = require('./mysql');
var ejs=require('ejs');

exports.getCar = function(req, res){
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
    var sql_query = "select * from Car ";
    if(bool_Vehicle_ID){
        if(bool_end_check){
            sql_query = sql_query + "and ";
        }
        if(bool_end_check == false){
            sql_query = sql_query + "where ";
            bool_end_check = true;
        }
    sql_query = sql_query + "vehicle_id = '"+Vehicle_ID+"'";

    }
    if(bool_Manufacturer){
        if(bool_end_check){
            sql_query = sql_query + "and ";
        }
        if(bool_end_check == false){
            sql_query = sql_query + "where ";
            bool_end_check = true;
        }
        sql_query = sql_query + "manufacture = '"+Manufacturer+"'";

    }
    if(bool_manufactured_year){
        if(bool_end_check){
            sql_query = sql_query + "and ";
        }
        if(bool_end_check == false){
            sql_query = sql_query + "where ";
            bool_end_check = true;
        }
        sql_query = sql_query + "manufactured_year = '"+manufactured_year+"'";

    }
    if(bool_model_no){
        if(bool_end_check){
            sql_query = sql_query + "and ";
        }
        if(bool_end_check == false){
            sql_query = sql_query + "where ";
            bool_end_check = true;
        }
        sql_query = sql_query + "model_no = '"+model_no+"'";

    }
    if(bool_car_type){
        if(bool_end_check){
            sql_query = sql_query + "and ";
        }
        if(bool_end_check == false){
            sql_query = sql_query + "where ";
            bool_end_check = true;
        }
        sql_query = sql_query + "car_type = '"+car_type+"'";

    }

  //  sql_query = sql_query + ";";

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
                res.send({
                    "status": 10,
                    "message:": "transaction fetched by successfully with empty line returned!",
                    "profile": results
                });
            }
        }
    });
};


