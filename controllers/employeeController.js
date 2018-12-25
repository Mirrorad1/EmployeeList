const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Employee = mongoose.model('Employee');

router.get('/',(req,res)=>{
    res.render("employee/editOrAdd", {
        viewTitle: "Insert Employee"
    });
});
router.post('/',(req,res)=>{
    if (req.body._id == '')
     insertData(req,res); 
     else
     updateRecord(req,res);
});

function updateRecord(req, res){
    Employee.findOneAndUpdate({_id: req._id.body}, req.body, {new:true}, (err, doc) => {
        if (!err){ res.render('employee/list');
        }
        else {
            if (err.name == 'Validation Error'){
                handleValidationError(err, req.body);
                res.render("employee/editOrAdd", {
                    viewTitle = "Update Employee",
                    employee: req.body
                });
            }
            else {
                console.log("Error occured during update: " + err); 
            }
        }
    });
}
function insertData(req,res){
    var employee = new Employee();
    employee.fullName = req.body.fullName;
    employee.email = req.body.email;
    employee.mobile = req.body.mobile;
    employee.city = req.body.city;
    employee.save((err, doc) => {
        if (!err)
            res.redirect('employee/list');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("employee/editOrAdd", {
                    viewTitle: "Insert Employee",
                    employee: req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });
}

router.get('/list', (req, res) => {
    Employee.find((err,docs) => {
        if(!err){
            res.render("employee/list", {
            list: docs
            });
        }
        else {
            console.log('Error in retrieving list of employees: ' + err);
        }
    });
});

function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'fullName':
                body['fullNameError'] = err.errors[field].message;
                break;
            case 'email':
                body['emailError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}
router.get('/:id', (req, res) => {
    Employee.findById(req.params.id, (err,doc) => {
        if(!err){
            res.render("employee/editOrAdd", {
                viewTitle: "Update Employee",
                employee: doc
            });
        }
    });
});

module.exports = router;

