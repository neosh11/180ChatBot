var express = require('express');
var router = express.Router();

var ctrlUsers = require('../controllers/users');
var ctrlQuestions = require('../controllers/questions');

router.post('/users', ctrlUsers.addUser);
router.get('/users/position/:userid', ctrlUsers.getPosition);
router.put('/users/position/:userid/:newposition', ctrlUsers.updatePosition);
router.post('/users/qa/:userid', ctrlUsers.updateUserQA);

router.get('/questions/:questionid', ctrlQuestions.getQuestion);
router.post('/questions', ctrlQuestions.addQuestion);
router.put('/questions/:questionid', ctrlQuestions.updateQuestion);

//Add options to question

router.put('/questions/addoption/:questionid', ctrlQuestions.addOption)

module.exports = router;