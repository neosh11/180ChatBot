var express = require('express');
var router = express.Router();

var ctrlUsers = require('../controllers/users');
var ctrlQuestions = require('../controllers/questions');

router.post('/users', ctrlUsers.addUser);
router.get('/users/position/:userid', ctrlUsers.getPosition);
router.put('/users/position/:userid', ctrlUsers.updatePosition);
router.post('/users/qa/:userid', ctrlUsers.updateUserQA);

router.get('/Question/:questionid', ctrlQuestions.getQuestion);
router.post('/Question/:questionid', ctrlMessages.addQuestion);
router.put('/Question/:questionid', ctrlMessages.updateQuestion);