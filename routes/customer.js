/**
 * Created by satyateja on 11/19/2016.
 */
var express = require('express');
var mysql = require('./../db/mysql');
var ejs=require('ejs');
var logger = require('../helper/logger').getLogger();

exports.getCustomerBySsn = function(req, res){
    var ssn = req.query.ssn;
    var customer = "select * from customer where ssn = '" + ssn + "'";
    logger.trace("Fetching customer by SSN "+ ssn);
    mysql.fetchData(customer, function(err, results) {
            if (err) {
                logger.error("Error fetching data "+ err);
            } else {
                var customer_1 = "select * from cus_mobile where cus_mobile_ssn = '" + ssn + "'";
                mysql.fetchData(customer_1, function(err, results_1) {
                    if (err) {
                        logger.error("Error fetching data "+ err);
                    } else {
                        var customer_2 = "select * from cus_email where cus_email_ssn = '" + ssn + "'";
                        mysql.fetchData(customer_2, function(err, results_2) {
                            if (err) {
                                logger.error("Error fetching data "+ err);
                            } else {
                                logger.trace("Customer search successful");
                                res.send({
                                    "status": 200,
                                    "message:": "customer search successful!",
                                    "profile": results,
                                    "profile_mobile": results_1,
                                    "profile_email": results_2
                                });
                            }
                        });
                    }
                });
            }
    });
};

exports.getCustomerByName = function(req, res){
    var first_name = req.query.first_name;
    var last_name = req.query.last_name;
    var customer = "";
    if(first_name == null){
        customer = "select * from customer where last_name = '"+last_name+"'";
    }
    else if(last_name == null){
        customer = "select * from customer where first_name = '"+first_name+"'";
    }
    else{
        customer = "select * from customer where first_name = '"+first_name+"' and last_name = '"+last_name+"'";
    }
    logger.trace("Fetching customer by name "+ first_name + " " + last_name);
    mysql.fetchData(customer, function(err, results) {
        if (err) {
            logger.error("Error fetching data "+ err);
        } else {
            if (results.length > 0) {
                logger.trace("Customer search successful");
                res.send({
                    "status": 200,
                    "message:": "customer search successful!",
                    "profile": results
                });
            }
            // render or error
            else {
                logger.trace("Customer search empty");
                res.send({
                    "status": 10,
                    "message:": "search returned with empty records!",
                    "profile": results
                });
            }
        }
    });
};

exports.getCustomerByLicense = function(req, res){
    var license = req.query.license;
    var customer = "select * from customer where driving_license_number = '"+license+"'";
    logger.trace("Fetching customer by License "+ license);
    mysql.fetchData(customer, function(err, results) {
        if (err) {
            logger.error("Error fetching data "+ err);
        } else {
            if (results.length > 0) {
                logger.trace("Customer search successful");
                res.send({
                    "status": 200,
                    "message:": "Customer search successful!",
                    "profile": results
                });
            }
            // render or error
            else {
                logger.trace("Customer search empty");
                res.send({
                    "status": 10,
                    "message:": "Search returned with empty records!",
                    "profile": results
                });
            }
        }
    });
};

exports.getCustomerByEmail = function(req, res){
    var email = req.query.email;
    var customer = "select * from customer where ssn in " +
        "(select distinct cus_email_ssn from cus_email where email = '"+email+"')";
    logger.trace("Fetching customer by email "+ email);
    mysql.fetchData(customer, function(err, results) {
        if (err) {
            logger.error("Error fetching data "+ err);
        } else {
            if (results.length > 0) {
                logger.trace("Customer search successful");
                res.send({
                    "status": 200,
                    "message:": "customer search successful!",
                    "profile": results
                });
            }
            // render or error
            else {
                logger.trace("Customer search empty");
                res.send({
                    "status": 10,
                    "message:": "search returned with empty records!",
                    "profile": results
                });
            }
        }
    });
};

exports.getCustomerByPhone = function(req, res){
    var phone = req.query.phone;
    var customer = "select * from customer where ssn in " +
        "(select distinct cus_mobile_ssn from cus_mobile where mobile_no = '"+ phone +"')";
    logger.trace("Fetching customer by phone "+ phone);
    mysql.fetchData(customer, function(err, results) {
        if (err) {
            logger.error("Error fetching data "+ err);
        } else {
            if (results.length > 0) {
                logger.trace("Customer search successful");
                res.send({
                    "status": 200,
                    "message:": "customer search successful!",
                    "profile": results
                });
            }
            // render or error
            else {
                logger.trace("Customer search empty");
                res.send({
                    "status": 10,
                    "message:": "search returned with empty records!",
                    "profile": results
                });
            }
        }
    });
};

exports.getCustomerHistory = function(req, res){
    var ssn = req.query.ssn;
    var history = "(select transaction_vin, transaction_date, DATE_FORMAT(transaction_date,'%Y-%m-%d') as date, list_price, final_price, old_license_plate, new_license_plate, is_sale " +
        "from sells inner join transaction on (transaction_date = selling_date and transaction_vin = sells_vin)" +
        "where sells_ssn ='"+ssn+"')" +
        "union" +
        "(select transaction_vin, transaction_date, DATE_FORMAT(transaction_date,'%Y-%m-%d') as date, list_price, final_price, old_license_plate, new_license_plate, is_sale " +
        "from buys inner join transaction on (transaction_date = buying_date and transaction_vin = buys_vin)" +
        "where buys_ssn ='" +ssn+"')";
    logger.trace("Fetching customer history "+ ssn);
    mysql.fetchData(history, function(err, results) {
        if (err) {
            logger.error("Error fetching data "+ err);
        } else {
            logger.trace("Customer history search successful");
            if (results.length < 5) {
                res.send({
                    "status": 200,
                    "message:": "history fetch successful!",
                    "profile": results,
                    "discount": 0
                });
            }
            if (results.length >= 5 && results.length < 10) {
                res.send({
                    "status": 200,
                    "message:": "history fetch successful!",
                    "profile": results,
                    "discount": 5
                });
            }
            if (results.length >= 10 && results.length < 15) {
                res.send({
                    "status": 200,
                    "message:": "history fetch successful!",
                    "profile": results,
                    "discount": 10
                });
            }
            if (results.length >= 15) {
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


exports.getAllCustomers = function(req, res){
    var customer = "select * from customer";
    logger.trace("Fetching all customers ");
    mysql.fetchData(customer, function(err, results) {
        if (err) {
            logger.error("Error fetching data "+ err);
        } else {
            if (results.length > 0) {
                logger.trace("Customer search successful");
                res.send({
                    "status": 200,
                    "message:": "Customer search successful!",
                    "profile": results
                });
            }
            // render or error
            else {
                logger.trace("Customer search empty");
                res.send({
                    "status": 10,
                    "message:": "search returned with empty records!",
                    "profile": results
                });
            }
        }
    });
};


exports.addNewCustomer = function(req, res){
    var ssn  = req.query.ssn;
    var first_name  = req.query.first_name;
    var last_name  = req.query.last_name;
    var age = req.query.age;
    var gender  = req.query.gender;
    var driving_license_number   = req.query.driving_license_number;
    var address   = req.query.address;
    logger.trace("Add new customer");
    // location = req.param("location");
    var sql_query = "insert into customer values ('"+ssn+"', '"+first_name+"', '"+ last_name +"', '"+ age +"', '"+ gender +"', '"+ driving_license_number +"','"+ address +"')";
    mysql.fetchData(sql_query, function(err, results) {
        if (err) {
            logger.error("Error fetching data "+ err);
        } else {
            logger.trace("New branch added");
            res.send({
                "status": 200,
                "message:": "new branch added!",
                "profile": results
            });
        }
    });
};

exports.updateCustomerInfo = function(req, res){
    var SSN  = req.query.ssn;
    var Fname  = req.query.first_name;
    var Lname  = req.query.last_name;
    var age = req.query.age;
    var gender  = req.query.gender;
    var driving_license_number   = req.query.driving_license_number;
    var address   = req.query.address;

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
    logger.trace("Updating customer");
    // location = req.param("location");
    //var sql_query = "insert into Customer values ('"+SSN+"', '"+Fname+"', '"+ Lname +"', '"+ age +"', '"+ gender +"', '"+ driving_license_number +"','"+ address +"')";
    if(Fname != "" || Lname != "" || age != "" || gender != "" || driving_license_number != "" || address != "" ) {
        mysql.fetchData(sql_query, function (err, results) {
            if (err) {
                logger.error("Error fetching data "+ err);
            } else {
                logger.trace("Customer updated");
                res.send({
                    "status": 200,
                    "message:": "Customer onfo updated",
                    "profile": results
                });
            }
        });
    }
};

exports.setCustomerPhoneNo = function(req, res){
    var ssn = req.query.ssn;
    var primary_mobile = req.query.primary_mobile;
    var secondary_mobile = req.query.secondary_mobile;
    var primary_sql = "insert into cus_mobile values ('"+ ssn +"', '"+ primary_mobile +"')";
    var sec_sql = "insert into cus_mobile values ('"+ ssn +"', '"+ secondary_mobile +"')";
    logger.trace("Setting customer phone number");
    mysql.fetchData(primary_sql, function(err, results) {
        if (err) {
            logger.error("Error fetching data "+ err);
        } else {
            logger.trace("Primary phone number inserted ");
        }
    });

    if(secondary_mobile != undefined && secondary_mobile != ''){
        mysql.fetchData(sec_sql, function(err, results) {
            if (err) {
                logger.error("Error fetching data "+ err);
            } else {
                logger.trace("Secondary phone number inserted ");
            }
        });
    }
};

exports.setCustomerEmail = function(req, res){
    var ssn = req.query.ssn;
    var primary_email = req.query.primary_email;
    var secondary_email = req.query.secondary_email;
    var primary_sql = "insert into cus_email values ('"+ ssn +"', '"+ primary_email +"')";
    var sec_sql = "insert into cus_email values ('"+ ssn +"', '"+ secondary_email +"')";
    logger.trace("Setting customer email");
    mysql.fetchData(primary_sql, function(err, results) {
        if (err) {
            logger.error("Error fetching data "+ err);
        } else {
            logger.trace("Primary email inserted ");
        }
    });

    if(secondary_email != undefined && secondary_email != ''){
        mysql.fetchData(sec_sql, function(err, results) {
            if (err) {
                logger.error("Error fetching data "+ err);
            } else {
                logger.trace("Secondary email inserted ");
            }
        });
    }
};

exports.updateCustomerPhoneNo = function(req, res){
    var ssn = req.query.ssn;
    var primary_mobile = req.query.primary_mobile;
    var secondary_mobile = req.query.secondary_mobile;
    var primary_old_mobile = req.query.old_pri_mobile;
    var secondary_old_mobile = req.query.old_sec_mobile;
    logger.trace("Updating customer phone number");
    var primary_sql = "update cus_mobile set mobile_no = '"+ primary_mobile+"' where cus_mobile_ssn = '"+ ssn +"' and mobile_no = '" + primary_old_mobile + "'";
    var sec_sql = "update cus_mobile set mobile_no = '"+ primary_mobile+"' where cus_mobile_ssn = '"+ ssn +"' and mobile_no = '" + secondary_old_mobile + "'";
    if(primary_mobile != undefined && primary_mobile != ''){
    mysql.fetchData(primary_sql, function(err, results) {
        if (err) {
            logger.error("Error fetching data "+ err);
        } else {
            console.log(results);
            logger.trace("Primary mobile updated ");
        }
    });
    }

    if(secondary_mobile != undefined && secondary_mobile != '' && secondary_old_mobile != undefined && secondary_old_mobile != ''){
        mysql.fetchData(sec_sql, function(err, results) {
            if (err) {
                logger.error("Error fetching data "+ err);
            } else {
                console.log(results);
                logger.trace("Secondary mobile updated ");
            }
        });
    }

    if((secondary_old_mobile == undefined || secondary_old_mobile == '') && secondary_mobile != undefined && secondary_mobile != ''){
        sec_sql = "insert into cus_mobile values ('"+ssn+"','"+secondary_mobile+"')"
        mysql.fetchData(sec_sql, function(err, results) {
            if (err) {
                logger.error("Error fetching data "+ err);
            } else {
                console.log(results);
                logger.trace("Secondary mobile added ");
            }
        });
    }
};


exports.updateCustomerEmail = function(req, res){
    var ssn = req.query.ssn;
    var primary_email = req.query.primary_email;
    var secondary_email = req.query.secondary_email;
    var primary_old_email = req.query.old_pri_email;
    var secondary_old_email = req.query.old_sec_email;

    var primary_sql = "update cus_email set email = '"+ primary_email +"' where cus_email_ssn = '"+ssn+"' and email = '"+primary_old_email+"'";
    var sec_sql = "update cus_email set email = '"+ secondary_email +"' where cus_email_ssn = '"+ssn+"' and email = '"+secondary_old_email+"'";
    logger.trace("Updating customer email");
    if(primary_email != undefined && primary_email != '') {
        mysql.fetchData(primary_sql, function (err, results) {
            if (err) {
                logger.error("Error fetching data "+ err);
            } else {
                logger.trace("Primary email updated ");
            }
        });
    }

    if(secondary_email != undefined && secondary_email != '' && secondary_old_email != undefined && secondary_old_email != ''){
        mysql.fetchData(sec_sql, function(err, results) {
            if (err) {
                logger.error("Error fetching data "+ err);
            } else {
                console.log(results);
                logger.trace("Secondary email updated ");
            }
        });
    }

    if((secondary_old_email == undefined || secondary_old_email == '') && secondary_email != undefined && secondary_email != ''){
        sec_sql = "insert into cus_email values ('"+ssn+"','"+secondary_email+"')"
        mysql.fetchData(sec_sql, function(err, results) {
            if (err) {
                logger.error("Error fetching data "+ err);
            } else {
                logger.trace("Secondary email added ");
            }
        });
    }

};

exports.deleteCustomerEmail = function(req, res){
    var ssn = req.query.ssn;
    var email = req.query.email;
    var customer = "delete cus_email where cus_email_ssn = '"+ssn+"' and email = '"+ email +"'";
    mysql.fetchData(customer, function(err, results) {
        if (err) {
            logger.error("Error fetching data "+ err);
        } else {
            logger.trace("Email deleted "+ customer);
        }
    });

    mysql.fetchData(sec_sql, function(err, results) {
        if (err) {
            logger.error("Error fetching data "+ err);
        } else {
            logger.trace("Secondary email inserted "+ sec_sql);
        }
    });
};

exports.deleteCustomerPhoneNo = function(req, res){
    var ssn = req.query.ssn;
    var mobile = req.query.mobile;
    var primary_sql = "delete cus_mobile where cus_email_ssn = '"+ssn+"' and mobile_no = '"+ mobile +"'";

    mysql.fetchData(primary_sql, function(err, results) {
        if (err) {
            logger.error("Error fetching data "+ err);
        } else {
            logger.trace("Mobile number deleted "+ primary_sql);
        }
    });
};
