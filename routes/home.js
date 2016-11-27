/**
 * Created by rishi on 11/23/16.
 */

var express = require('express');
var router = express.Router();
var mysql = require('./../db/mysql');
var logger = require('../helper/logger').getLogger();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render("homepage",{title: 'Auto Exchange'});
});

router.get('/branch-data', function (req, res, next) {
    if(!req.session.branch_id && !req.session.location){
        var sql_query = "select * from company_branch order by rand() limit 1";
        mysql.fetchData(sql_query, function(err, results) {
            if (err) {
                throw err;
            } else {
                if (results.length > 0) {
                    console.log(results);
                    req.session.branch_id = results[0].branch_id;
                    req.session.location = results[0].location;
                    res.send({
                        "status": 200,
                        "message:": "transaction fetched by Date successfully!",
                        "profile": {branch_id: results[0].branch_id, location: results[0].location}
                    });
                }
            }
        });
    }else {
        res.send({status: 200, profile: {branch_id: req.session.branch_id, location: req.session.location}});
    }

});

module.exports = router;
