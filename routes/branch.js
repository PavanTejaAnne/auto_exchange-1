/**
 * Created by satyateja on 11/19/2016.
 */
var express = require('express');
var mysql = require('./../db/mysql');
var ejs=require('ejs');
var logger = require('../helper/logger').getLogger();

exports.getBranchById = function(req, res){
    var id = req.query.branch_id;
    logger.trace("Fetching branch for branch ID "+ id);
    var branch = "select * from company_branch where branch_id = '"+id+"'";
    mysql.fetchData(branch, function(err, results) {
        if (err) {
            logger.error("Error fetching data "+ err);
        } else {
            if (results.length > 0) {
                logger.trace("Branch search successful");
                res.send({
                    "status": 200,
                    "message:": "Branch search successful!",
                    "profile": results
                });
            }
            // render or error
            else {
                logger.trace("No branch found");
                res.send({
                    "status": 10,
                    "message:": "No branch found!",
                    "profile": results
                });
            }
        }
    });
};

exports.deletebranch = function(req, res){
    var id = req.query.branch_id;
    var sql_query = "delete from company_branch where branch_id = '"+id+"'";
    logger.trace("Deleting branch by Id "+ id);
    mysql.fetchData(sql_query, function(err, results) {
        if (err) {
            logger.error("Error fetching data "+ err);
        } else {
            logger.trace("Branch deleted successfully");
            res.send({
                "status": 200,
                "message:": "Branch deleted successfully",
                "profile": results
            });
        }
    });

};


exports.getBranchByLocation = function(req, res){
    var location = req.query.location;
    var branch = "select * from company_branch where location = '"+location+"'";
    logger.trace("Fetching branch by Location "+ location);
    mysql.fetchData(branch, function(err, results) {
        if (err) {
            logger.error("Error fetching data "+ err);
        } else {
            if (results.length > 0) {
                logger.trace("Branch search successful");
                res.send({
                    "status": 200,
                    "message:": "branch search successful!",
                    "profile": results
                });
            }
            // render or error
            else {
                logger.trace("Branch search returned empty records");
                res.send({
                    "status": 10,
                    "message:": "search returned with empty records!",
                    "profile": results
                });
            }
        }
    });
};

exports.getAllBranches = function(req, res){
    var branch = "select * from company_branch";
    logger.trace("Fetching all branches");
    mysql.fetchData(branch, function(err, results) {
        if (err) {
            logger.error("Error fetching data "+ err);
        } else {
            if (results.length > 0) {
                logger.trace("All branch search successful");
                res.send({
                    "status": 200,
                    "message:": "branch search successful!",
                    "profile": results
                });
            }
            // render or error
            else {
                logger.trace("Search return empty records");
                res.send({
                    "status": 10,
                    "message:": "search returned with empty records!",
                    "profile": results
                });
            }
        }
    });
};

exports.addNewBranch = function(req, res){
    var branchMobileNumber = req.query.phone_number;
    var branchAddress = req.query.address;
    var branchEmail = req.query.email;
    var branchLocation = req.query.location;
    logger.trace("Adding new branch");
    // location = req.param("location");
    var sql_query = "insert into company_branch(phone_number, address, email, location) values ('"+branchMobileNumber+"', '"+branchAddress+"', '"+ branchEmail +"', '"+ branchLocation +"')";
    mysql.fetchData(sql_query, function(err, results) {
        if (err) {
            logger.error("Error fetching data "+ err);
        } else {
               logger.trace("New branch added successfully");
                res.send({
                    "status": 200,
                    "message:": "new branch added!",
                    "profile": results
                });
            // render or error

        }
    });
};


exports.updateBranchInfo = function(req, res){
    var branch_id = req.query.branch_id;
    var number  = req.query.phone_number;
    var location  = req.query.location;
    var email  = req.query.email;
    var address   = req.query.address;

    var bool_number  = false;
    var bool_location  = false;
    var bool_email  = false;
    var bool_address = false;
    var bool_check_comma = false;

    if(number){
        bool_number = true;
    }
    if(location){
        bool_location = true;
    }
    if(email){
        bool_email = true;
    }
    if(address){
        bool_address = true;
    }
    var sql_query = "update customer set ";
    if(bool_Fname){
        if(bool_check_comma){
            sql_query = sql_query + ","
        }
        sql_query = sql_query + " phone_number = '"+ number + "'";
        if(bool_check_comma == false){
            bool_check_comma = true;
        }
    }
    if(bool_Lname){
        if(bool_check_comma){
            sql_query = sql_query + ","
        }
        sql_query = sql_query + " address = '"+ address + "'";
        if(bool_check_comma == false){
            bool_check_comma = true;
        }
    }if(bool_age){
        if(bool_check_comma){
            sql_query = sql_query + ","
        }
        sql_query = sql_query + " email = '"+ email + "'";
        if(bool_check_comma == false){
            bool_check_comma = true;
        }
    }if(bool_gender){
        if(bool_check_comma){
            sql_query = sql_query + ","
        }
        sql_query = sql_query + " location = '"+ location + "'";
        if(bool_check_comma == false){
            bool_check_comma = true;
        }
    }
    sql_query = sql_query + " where branch_id = '"+ branch_id +"'";

    logger.trace("Updating branch info");
    // location = req.param("location");
    //var sql_query = "insert into Customer values ('"+SSN+"', '"+Fname+"', '"+ Lname +"', '"+ age +"', '"+ gender +"', '"+ driving_license_number +"','"+ address +"')";
    if(number != "" || address != "" || email != "" || location != "" ) {
        mysql.fetchData(sql_query, function (err, results) {
            if (err) {
                logger.error("Error fetching data "+ err);
            } else {
                logger.trace("Branch update successful");
                res.send({
                    "status": 200,
                    "message:": "Update branch successful!",
                    "profile": results
                });
                // render or error

            }
        });
    }
};

exports.updateSession = function (req, res) {
    logger.trace("Updating session with branch Id ");
    req.session.branch_id = req.query.branch_id;
    req.session.location = req.query.location;
    res.send({status: 200, message: "Updated", profile:{}});
};