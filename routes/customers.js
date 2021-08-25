var express = require('express');
var router = express.Router();
const customerModel = require('../models/customers.model');
var mongoose = require('mongoose');

/* GET home page. */
/* for all customers */
router.get('/list', function (req, res, next) {
    customerModel.find(function (err, customerListResponse) {
        if (err) {
            res.send({ status: 500, message: 'list not found' });
        }
        else {
            const recordCount = customerListResponse.length;
            res.send({ status: 200, results: customerListResponse })
        }
    })
});


/* get details of selected customer */
router.get('/view', function (req, res, next) {
    const userId = req.query.userId;
    customerModel.findById(userId, function (err, customerResponse) {
        if (err) {
            res.send({ status: 500, message: 'customer not found' });
        }
        else {
            const recordCount = customerResponse.length;
            res.send({ status: 200, recordCount: recordCount, results: customerResponse })
        }
    })
});

router.post('/add', function (req, res, next) {

    let firstnameVal = req.body.firstName;
    let lastname = req.body.lastName;
    let emailaddress = req.body.emailAddress;
    let phonenumber = req.body.phoneNumber;
    let dob = req.body.dob;
    let department = req.body.department;

    let customerObj = new customerModel({
        firstName: firstnameVal,
        lastName: lastname,
        emailAddress: emailaddress,
        phoneNumber: phonenumber,
        dob: dob,
        department: department
    });
    customerObj.save(function (err, customerObj) {
        if (err) {
            res.send({ status: 500, message: 'unable to add' })
        }
        else {
            res.send({ status: 200, message: 'customer added', customerDetails: customerObj })
        }
    })

});

/* router.put('/edit', function (req, res, next) {
    const userId = req.query.userId;
    let firstname = req.body.firstName;
    let lastname = req.body.lastName;
    let emailaddress = req.body.emailAddress;
    let phonenumber = req.body.phoneNumber;
    let dob = req.body.dob;
    let department = req.body.department;

    let customerObj = {
        firstName: firstname,
        lastName: lastname,
        emailAddress: emailaddress,
        phoneNumber: phonenumber,
        dob: dob,
        department: department
    };

    customerModel.findByIdAndUpdate(userId, customerObj, function (err, customerResponse) {
        if (err) {
            res.send({ status: 500, message: 'unable to update' })
        }
        else {
            res.send({ status: 200, message: 'updated customer', customerDetails: customerObj })
        }

    })
}); */


router.put('/edit', function (req, res, next) {
    let userId = req.body.userId;
    let firstname = req.body.firstName;
    let lastname = req.body.lastName;
    let emailaddress = req.body.emailAddress;
    let phonenumber = req.body.phoneNumber;
    let dob = req.body.dob;
    let department = req.body.department;

    let customerObj = {
        firstName: firstname,
        lastName: lastname,
        emailAddress: emailaddress,
        phoneNumber: phonenumber,
        dob: dob,
        department: department
    };

    customerModel.findByIdAndUpdate(userId, customerObj, function (err, customerResponse) {
        if (err) {
            res.send({ status: 500, message: 'unable to update' })
        }
        else {
            this.customerObj = this.customerResponse;
            res.send({ status: 200, message: 'updated customer', customerDetails: customerResponse })
        }

    })
});

router.delete('/delete', function (req, res, next) {
    const userId = req.query.userId;
    customerModel.findByIdAndDelete(userId, function (err, customerResponse) {
        if (err) {
            res.send({ status: 500, message: 'unable to delete' });
        }
        else {
            res.send({ status: 200, message: 'customer delete', customerDetails: customerResponse });
        }
    });
});


router.get('/search', function (req, res, next) {
 let userId = req.query.userId;
 let emailAddress = req.query.emailAddress;
 let firstName = req.query.firstName;
customerModel.findById(userId, function(err, customerResponse){
    if(err){
        res.send({status: 200, messege: 'customer searched'})
    }
    else{
        res.send({status: 500, messege: 'customer not searched' ,results: customerResponse})
    }


})
customerModel.findByemailAddress(emailAddress, function(err, customerResponse){
    if(err){
        res.send({status: 200, messege: 'customer searched'})
    }
    else{
        res.send({status: 500, messege: 'customer not searched' ,results: customerResponse})
    }


})
customerModel.findByfirstName(firstName, function(err, customerResponse){
    if(err){
        res.send({status: 200, messege: 'customer searched'})
    }
    else{
        res.send({status: 500, messege: 'customer not searched' ,results: customerResponse})
    }


})

});

module.exports = router;
