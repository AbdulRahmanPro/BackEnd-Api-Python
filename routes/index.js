var express = require('express');
var router = express.Router();
const { checkBoardNumber, addUser,deleteUserById } = require('../services/servcies')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post("/add",addUser)
router.post("/check",checkBoardNumber)
router.delete('/delete',deleteUserById)

module.exports = router;
