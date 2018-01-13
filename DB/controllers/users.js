var model = require('../models/db');

var User = model.userSchema;
var Qa = model.qaSchema;

var sendJSONResponse = function(res,status,content){
    res.status(status);
    res.json(content);
}

//ALL USER FUNCTIONS WORKING YAYAYAYAY!!
//body.fbID
module.exports.addUser = function(req,res){
    let userID = req.body.fbID;

    console.log("HEHEHE");

    var user = new User();
    user.fbID = userID;
    user.qa =[];
    user.positionID = 0;

    user.save(function(err){
        if(err)
        {
            sendJSONResponse(res,404,err);
            console.log(err);
            console.log("SOMETHING IS WROnG")
        }
        else console.log('Saved successfully ${userID}');
    })

    console.log("HELLO!!");

}

module.exports.getPosition=function(req,res){
    User
    .findOne({fbID:req.params.userid})
    .exec(function(err,user){
        if(err||!user)
        {
            sendJSONResponse(res,404,'User not found');
            return;
        }
        else {sendJSONResponse(res,200,{position: user.positionID});
        return;
    }
    })
}

module.exports.updatePosition=function(req,res){
    User
    .findOne({fbID:req.params.userid})
    .exec(function(err,user){
        if(err||!user)
        {
            sendJSONResponse(res,404,'User not found');
            return;
        }
        else 
        {

            user.positionID = req.params.newposition;

            user.save(function(err, saved){
                if(err)
                {
                    sendJSONResponse(res, 400, err);
                }
                else{
                    sendJSONResponse(res,200,{position: req.params.newposition});
                }
            });
            
            return;
        }
    })
}

//req.body.answer
//req.body.questionID
module.exports.updateUserQA=function(req,res){
    User
    .findOne(
        {fbID:req.params.userid})
    .exec(function(err,user){
        if(err||!user){
            sendJSONResponse(res,404,'User not found');
            return;
        }
        else{
            var qa = new Qa();
            qa.id = req.body.questionid;
            qa.answer = req.body.answer;

            user.qa.push(qa);
            
            user.save(function(err,saved){
                if(err){
                    sendJSONResponse(res,400,err);
                }else{
                    sendJSONResponse(res,200,{QA:qa});
                }

            });
            return;
        }
    })
}