/**
 * Created by satyateja on 11/19/2016.
 */
var express = require('express');
var mysql = require('./../db/mysql');
var ejs=require('ejs');

exports.getCustomerBySsn = function(req, res){
    var ssn = req.query.ssn;
    var customer = "select * from customer where ssn = '" + ssn + "'";
    mysql.fetchData(customer, function(err, results) {
            if (err) {
                throw err;
            } else {
                console.log(results);
                res.send({
                    status: 200,
                    message: "Customer search successful!",
                    profile: results
                });
            }
    });
};

exports.getCustomerByName = function(req, res){
    Fname = req.param("Fname");
    Lname = req.param("Lname");
    if(Fname == null){
        var customer = "select * from customer where last_name = '"+Lname+"'";
    }
    else if(Lname == null){
        var customer = "select * from customer where first_name = '"+Fname+"'";
    }
    else{
        var customer = "select * from customer where first_name = '"+Fname+"' and last_name = '"+Lname+"'";
    }
    mysql.fetchData(customer, function(err, results) {
        if (err) {
            throw err;
        } else {
            if (results.length > 0) {
                console.log(results);
                res.send({
                    "status": 200,
                    "message:": "customer search successful!",
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

exports.getCustomerByLicense = function(req, res){
    license = req.param("License");
    var customer = "select * from customer where driving_license_number = '"+license+"'";
    mysql.fetchData(customer, function(err, results) {
        if (err) {
            throw err;
        } else {
            if (results.length > 0) {
                console.log(results);
                res.send({
                    "status": 200,
                    "message:": "customer search successful!",
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

exports.getCustomerHistory = function(req, res){
    ssn = req.param("ssn");
    var history = "(select transaction_vehicle_id, transaction_date, list_price, final_price, old_license_number, new_license_number, operation" +
        "from sells inner join transaction on (transaction_date = selling_date and transaction_vehicle_id = sells_vehicle_id)" +
        "where sells_ssn ='"+ssn+"')" +
        "union" +
        "(select transaction_vehicle_id, transaction_date, list_price, final_price, old_license_number, new_license_number, operation" +
        "from buys inner join transaction on (transaction_date = buying_date and transaction_vehicle_id = buys_vehicle_id)" +
        "where buys_ssn ='" +ssn+"')";
    mysql.fetchData(history, function(err, results) {
        if (err) {
            throw err;
        } else {
            if (results.length < 5) {
                console.log(results);
                res.send({
                    "status": 200,
                    "message:": "history fetch successful!",
                    "profile": results,
                    "discount": 0
                });
            }
            if (results.length >= 5 && results.length < 10) {
                console.log(results);
                res.send({
                    "status": 200,
                    "message:": "history fetch successful!",
                    "profile": results,
                    "discount": 5
                });
            }
            if (results.length >= 10 && results.length < 15) {
                console.log(results);
                res.send({
                    "status": 200,
                    "message:": "history fetch successful!",
                    "profile": results,
                    "discount": 10
                });
            }
            if (results.length >= 15) {
                console.log(results);
                res.send({
                    "status": 200,
                    "message:": "history fetch successful!",
                    "profile": results,
                    "discount": 15
                });
            }
        }
    });
};


exports.getAllCustomer = function(req, res){
   // license = req.param("License");
    var customer = "select * from customer";
    mysql.fetchData(customer, function(err, results) {
        if (err) {
            throw err;
        } else {
            if (results.length > 0) {
                console.log(results);
                res.send({
                    "status": 200,
                    "message:": "customer search successful!",
                    "profile": results
                });
            }
            // render or error
            else {
                res.send({
                    "status": 10,
                    "message:": "customer search successful with empty result set!",
                    "profile": results
                });
            }
        }
    });
};


exports.addNewCustomer = function(req, res){
    SSN  = req.param(SSN );
    Fname  = req.param(Fname );
    Lname  = req.param(Lname );
    age = req.param(age);
    gender  = req.param(gender);
    driving_license_number   = req.param(driving_license_number);
    address   = req.param(address);

    // location = req.param("location");
    var sql_query = "insert into customer values ('"+SSN+"', '"+Fname+"', '"+ Lname +"', '"+ age +"', '"+ gender +"', '"+ driving_license_number +"','"+ address +"')";
    mysql.fetchData(sql_query, function(err, results) {
        if (err) {
            throw err;
        } else {
            console.log(results);
            res.send({
                "status": 200,
                "message:": "new branch added!",
                "profile": results
            });
            // render or error

        }
    });
};

exports.updateCustomerInfo = function(req, res){
    SSN  = req.param(SSN);
    Fname  = req.param(Fname);
    Lname  = req.param(Lname);
    age = req.param(age);
    gender  = req.param(gender);
    driving_license_number   = req.param(driving_license_number);
    address   = req.param(address);

    var bool_SSN  = false;
    var bool_Fname  = false;
    var bool_Lname  = false;
    var bool_age = false;
    var bool_gender  = false;
    var bool_driving_license_number   = false;
    var bool_address   = false;
    var bool_check_comma = false;

    if(Fname){
        bool_Fname = true;
    }
    if(Lname){
        bool_Lname = true;
    }
    if(age){
        bool_age = true;
    }
    if(gender){
        bool_gender = true;
    }
    if(driving_license_number){
        bool_driving_license_number = true;
    }
    if(address){
        bool_address = true;
    }
    var sql_query = "update customer set ";
    if(bool_Fname){
        if(bool_check_comma){
            sql_query = sql_query + ","
        }
        sql_query = sql_query + " first_name = '"+ Fname + "'";
        if(bool_check_comma == false){
            bool_check_comma = true;
        }
    }
    if(bool_Lname){
        if(bool_check_comma){
            sql_query = sql_query + ","
        }
        sql_query = sql_query + " last_name = '"+ Lname + "'";
        if(bool_check_comma == false){
            bool_check_comma = true;
        }
    }if(bool_age){
        if(bool_check_comma){
            sql_query = sql_query + ","
        }
        sql_query = sql_query + " age = '"+ age + "'";
        if(bool_check_comma == false){
            bool_check_comma = true;
        }
    }if(bool_gender){
        if(bool_check_comma){
            sql_query = sql_query + ","
        }
        sql_query = sql_query + " gender = '"+ gender + "'";
        if(bool_check_comma == false){
            bool_check_comma = true;
        }
    }if(bool_driving_license_number){
        if(bool_check_comma){
            sql_query = sql_query + ","
        }
        sql_query = sql_query + " driving_license_number = '"+ driving_license_number + "'";
        if(bool_check_comma == false){
            bool_check_comma = true;
        }
    }if(bool_address){
        if(bool_check_comma){
            sql_query = sql_query + ","
        }
        sql_query = sql_query + " address = '"+ address + "'";
        if(bool_check_comma == false){
            bool_check_comma = true;
        }
    }
    sql_query = sql_query + " where ssn = '"+ SSN +"'";



    // location = req.param("location");
    //var sql_query = "insert into Customer values ('"+SSN+"', '"+Fname+"', '"+ Lname +"', '"+ age +"', '"+ gender +"', '"+ driving_license_number +"','"+ address +"')";
    if(Fname != "" || Lname != "" || age != "" || gender != "" || driving_license_number != "" || address != "" ) {
        mysql.fetchData(sql_query, function (err, results) {
            if (err) {
                throw err;
            } else {
                console.log(results);
                res.send({
                    "status": 200,
                    "message:": "Customer onfo updated",
                    "profile": results
                });
                // render or error

            }
        });
    }
};

exports.setCustomerPhoneNo = function(req, res){
    SSN = req.param("SSN");
    Mobile_No = req.param("Mobile_No");
    var customer = "insert into cus_mobile values ('"+SSN +"', '"+Mobile_No+"')";
    mysql.fetchData(customer, function(err, results) {
        if (err) {
            throw err;
        } else {
            console.log(results);
            res.send({
                "status": 200,
                "message:": "new phone added!",
                "profile": results
            });
        }
    });
};

exports.setCustomerEmail = function(req, res){
    SSN = req.param("SSN");
    Email = req.param("Email");
    var customer = "insert into cus_email values ('"+SSN +"', '"+Email+"')";
    mysql.fetchData(customer, function(err, results) {
        if (err) {
            throw err;
        } else {
            console.log(results);
            res.send({
                "status": 200,
                "message:": "new Email added!",
                "profile": results
            });
        }
    });
};

exports.updateCustomerPhoneNo = function(req, res){
    SSN = req.param("SSN");
    Mobile_No = req.param("Mobile_No");
    var customer = "update cus_mobile set mobile_no = '"+ Mobile_No+"' where cus_mobile_ssn = '"+SSN+"'";
    mysql.fetchData(customer, function(err, results) {
        if (err) {
            throw err;
        } else {
            console.log(results);
            res.send({
                "status": 200,
                "message:": "phone updated!",
                "profile": results
            });
        }
    });
};


exports.updateCustomerEmail = function(req, res){
    SSN = req.param("SSN");
    Email = req.param("Email");
    var customer = "update cus_mobile set Email = '"+ Email +"' where cus_email_ssn = '"+SSN+"'";
    mysql.fetchData(customer, function(err, results) {
        if (err) {
            throw err;
        } else {
            console.log(results);
            res.send({
                "status": 200,
                "message:": "email updated!",
                "profile": results
            });
        }
    });
};
