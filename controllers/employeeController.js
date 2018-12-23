const express = require('express');
var router = express.Router();

router.get('/',(req,res)=>{
    res.render("employee/editOrAdd", {
        viewTitle: "Insert Employee"
    });
});
router.post('/',(req,res)=>{
    console.log("Input Success!");
});
module.exports = router;
