import { worker } from 'cluster';

var model = require('../models/db');

var User = model.userSchema;
var Qa = model.qaSchema;
var Message = model.messageSchema;
var Pair = model.pairSchema;

var sendJSONResponse = function(res,status,content){
    res.status(status);
    res.json(content);
}

module.exports.getQuestion = function(req,res){
   Message
   .findone({_id:req.params.questionid})
   .exec(function(err,question){
       if(err||!question){
       sendJSONResponse(res,404,'Question not found!');
       return;
       }
       else {
           sendJSONResponse(res,200,{
            Message:Message
            });
           return;
       }
    })
}

module.exports.addQuestion = function(req,res){
    let pairID = req.body.pairID;

    var pair = new Pair();
    pair.messageID = pairID;
    pair.label ='';

    pair.save(function(err){
        if(err){
        sendJSONResponse(res,'404',err);
        return;
        }
        else{
        console.log('Saved successfully'+pairID);
        return; 
        }
    })
}

module.exports.updateQuestion = function(req,res){
    Message
    .findone({_id:req.params.questionid})
    .exec(function(err,message){
        if(err||!message){
            sendJSONResponse(res,404,'Question not found!');
            return;
        }
        else {
            message.prompt.push(req.body.prompt);
            var pair = new Pair();
            pair.messageID = req.body.pairID;
            pair.label = req.body.pairLabel;
            message.options.push(pair);

            message.save(function(err,saved){
                if(err){
                    sendJSONResponse(res,400,err);
                }else{
                    sendJSONResponse(res,200,{message:Message});
                }
            });
            return;

         }
        

    })
}
