var model = require('../models/db');

var User = model.userSchema;
var Qa = model.qaSchema;
var Message = model.messageSchema;
var Pair = model.pairSchema;

var sendJSONResponse = function (res, status, content) {
    res.status(status);
    res.json(content);
}

//Get request
module.exports.getQuestion = function (req, res) {
    Message
        .findone({ _id: req.params.questionid })
        .exec(function (err, question) {
            if (err || !question) {
                sendJSONResponse(res, 404, 'Question not found!');
                return;
            }
            else {
                sendJSONResponse(res, 200, {
                    Message: question
                });
                return;
            }
        })
}

//Post request
//body.type
//body.input
//body.next
module.exports.addQuestion = function (req, res) {

    let message = new Message();

    message.type = req.body.type;
    //
    //message.options
    //TODO loop through req.body.options to make new pairs and add them
    message.input = req.body.input;

    message.next = req.body.next;

    message.save(function (err) {
        if (err) {
            sendJSONResponse(res, '404', err);
            return;
        }
        else {
            console.log('Saved Question successfully');
            sendJSONResponse(res, '201', message);
            return;
        }
    })
}

//Put request
module.exports.updateQuestion = function (req, res) {
    Message
        .findone({ _id: req.params.questionid })
        .exec(function (err, message) {
            if (err || !message) {
                sendJSONResponse(res, 404, 'Question not found!');
                return;
            }
            else {

                if(req.body.type){
                    message.prompt.push(req.body.prompt);
                }
                
                if(req.body.input)
                {
                    message.input.push(req.body.input);
                }

                if(req.body.next)
                {
                    message.next.push(req.body.next);
                }

                message.save(function (err, saved) {
                    if (err) {
                        sendJSONResponse(res, 400, err);
                    } else {
                        sendJSONResponse(res, 200, message);
                    }
                });
                return;

            }


        })
}
