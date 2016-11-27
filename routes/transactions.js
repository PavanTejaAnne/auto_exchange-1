/**
 * Created by dhira on 11/19/2016.
 */
var express = require('express');
var mysql = require('./../db/mysql');
var ejs=require('ejs');
var timeUtil = require('../helper/timeutil');

exports.getTransactionByDate = function(req, res){
    var transactionDate = req.query.date;
    transactionDate = timeUtil.formatDate(transactionDate);
    var sql_query = "select * from transaction where transaction_date = '"+ transactionDate+ "'";
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
    var vehicleID = req.query.vin;
    var sql_query = "select * from transaction where transaction_vin = '"+vehicleID+"'";
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
    var model_no = req.query.model_no;
    var manufacturer = req.query.manufacturer;
    var old_license =req.query.old_license_plate;
    var new_license = req.query.new_license_plate;
    var year = req.query.manufactured_year;
    var type = req.query.car_type;
    var branch_id = req.query.branch_id;

    var query_1 = "insert into sells_to(sells_to_ssn, sells_to_branch_id) values('"+ ssn +"', '"+ branch_id +"');";
    mysql.fetchData(query_1, function(err,results){
        if(err){
            throw err;
        }
    });

    var query_check = "select * from car where vin = '"+vin+"'";
    mysql.fetchData(query_check, function(err,results){
        if(err){
            throw err;
        }else{
            if(results.length > 0){
                var query_2 = "insert into sells(sells_ssn, sells_vin) values('"+ ssn +"', '"+ vin +"');" ;
                mysql.fetchData(query_2, function(err,results){
                    if(err){
                        throw err;
                    }
                });
                var query_3 = "insert into transaction(transaction_vin, list_price, final_price, old_license_plate, new_license_plate, is_sale) " +
                    "values('"+ vin +"', "+ list_price +","+ final_price +",'"+ old_license +"', '"+ new_license +"',"+ true +");" ;
                mysql.fetchData(query_3, function(err,results){
                    if(err){
                        throw err;
                    }
                });

                var query_4 = "insert into in_stock_car(in_stock_id, in_stock_vin, in_stock_price, in_stock_branch_id) values(1, '"+ vin +"', "+ final_price +", '"+ branch_id +"');" ;
                mysql.fetchData(query_4, function(err,results){
                    if(err){
                        throw err;
                    }else{
                        res.send({
                            "status": 200,
                            "message:": "transaction inserted successfully",
                            "profile": results
                        });
                    }
                });
            }
            else{
                var query_5 = "insert into car(vin, manufacturer, model_no, manufactured_year, car_type) values('"+vin+"', '"+manufacturer+"', '"+model_no+"', '"+year+"', '"+type+"')" ;
                mysql.fetchData(query_5, function(err,results){
                    if(err){
                        throw err;
                    }
                    else{
                        var query_2 = "insert into sells(sells_ssn, sells_vin) values('"+ ssn +"', '"+ vin +"');" ;
                        mysql.fetchData(query_2, function(err,results){
                            if(err){
                                throw err;
                            }
                        });
                        var query_3 = "insert into transaction(transaction_vin, list_price, final_price, old_license_plate, new_license_plate, is_sale) " +
                            "values('"+ vin +"', "+ list_price +","+ final_price +",'"+ old_license +"', '"+ new_license +"',"+ true +");" ;
                        mysql.fetchData(query_3, function(err,results){
                            if(err){
                                throw err;
                            }
                        });

                        var query_4 = "insert into in_stock_car(in_stock_id, in_stock_vin, in_stock_price, in_stock_branch_id) values(1, '"+ vin +"', "+ final_price +", '"+ branch_id +"');" ;
                        mysql.fetchData(query_4, function(err,results){
                            if(err){
                                throw err;
                            }else{
                                res.send({
                                    "status": 200,
                                    "message:": "Sell transaction inserted successfully",
                                    "profile": results
                                });
                            }
                        });
                    }
                });
            }
        }
    });

};

exports.setTransactionBuy = function(req, res){
    var ssn = req.query.ssn;
    var vin = req.query.vin;
    var list_price = req.query.list_price;
    var final_price = req.query.final_price;
    var model_no = req.query.model_no;
    var manufacturer = req.query.manufacturer;
    var old_license =req.query.old_license_plate;
    var new_license = req.query.new_license_plate;
    var branch_id = req.query.branch_id;

    var query_1 = "insert into buys_from(buys_from_ssn, buys_from_branch_id) values('"+ ssn +"', '"+ branch_id +"');";
    mysql.fetchData(query_1, function(err,results){
        if(err){
            throw err;
        }
    });

    var query_2 = "insert into buys (buys_ssn, buys_vin) values('"+ ssn +"', '"+ vin +"');";
    mysql.fetchData(query_2, function(err,results){
        if(err){
            throw err;
        }
    });

    var query_3 = "insert into transaction(transaction_vin, list_price, final_price, old_license_plate, new_license_plate, is_sale) " +
        "values('"+ vin +"', "+ list_price +","+ final_price +",'"+ old_license +"', '"+ new_license +"',"+ false +");" ;
    mysql.fetchData(query_3, function(err,results){
        if(err){
            throw err;
        }
    });

    var query_4 = "delete from in_stock_car where in_stock_vin='"+ vin +"';";
    mysql.fetchData(query_4, function(err,results){
        if(err){
            throw err;
        }else{
            res.send({
                "status": 200,
                "message:": "Buy transaction Inserted successfully!",
                "profile": results
            });
        }
    });
};