'use strict';

var express = require('express');
var request = require('request');

// var geoctrl = require('../controllers/geo');

var router = express.Router();

// Imports dependencies and set up http server
var verifyC = "12345678910";

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// router.get('/geo', geoctrl.call);

// Creates the endpoint for our webhook 
router.post('/webhook', (req, res) => {  
  
   let body = req.body;

   // Checks this is an event from a page subscription
   if (body.object === 'page') {


     // Iterates over each entry - there may be multiple if batched
     body.entry.forEach(function(entry) {
 
      // Gets the message. entry.messaging is an array, but 
      // will only ever contain one message, so we get index 0
      let webhookEvent = entry.messaging[0];
      console.log(webhookEvent);

      let sender_psid = webhookEvent.sender.id;
      console.log("SENDER PSID: "+sender_psid);

      if (webhookEvent.message) {
        handleMessage(sender_psid, webhookEvent.message);        
      }else if (webhookEvent.postback) {
        handlePostback(sender_psid, webhookEvent.postback);
      }

     });

     // Returns a '200 OK' response to all requests
     res.status(200).send('EVENT_RECEIVED');
   } else {
     // Returns a '404 Not Found' if event is not from a page subscription
     res.sendStatus(404);
   }
 
 });

// Adds support for GET requests to our webhook
router.get('/webhook', (req, res) => {

  // Your verify token. Should be a random string.
  let VERIFY_TOKEN = verifyC;
    
  // Parse the query params
  let mode = req.query['hub.mode'];
  let token = req.query['hub.verify_token'];
  let challenge = req.query['hub.challenge'];
    
  // Checks if a token and mode is in the query string of the request
  if (mode && token) {
  
    // Checks the mode and token sent is correct
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      
      // Responds with the challenge token from the request
      console.log('WEBHOOK_VERIFIED');
      res.status(200).send(challenge);
    
    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);      
    }
  }
});


function handleMessage(sender_psid, received_message) {
  
    let response;
  
    // Check if the message contains text


    if(received_message.quick_reply.payload)
    {
      switch(received_message.quick_reply.payload)
      {
        case "F":

        response = {
          "text": `Type me some feedback fam!`
        }
        break;
        case "S": 

        break;

        default: break;
      }
    }

    if (received_message.text) {    
  
      // Create the payload for a basic text message
      response = {
        "text": `You sent the message: "${received_message.text}". Now send me an image!`
      }
    }  
    
    // Sends the response message
    callSendAPI(sender_psid, response);    
  }


  // Handles messaging_postbacks events
function handlePostback(sender_psid, received_postback) {
  let response;
  
    // Check if the message contains text
    if (received_postback.payload == "get started")
    {
      response = {
        "text": `What would you like me to do?`,
        "quick_replies":[
          {
            "content_type":"text",
            "title":"Feedback",
            "payload":"F"
          },
          {
            "content_type":"text",
            "title":"Survey",
            "payload":"S"
          }
        ]
      }
    } 

    callQuickSendAPI(sender_psid, response);
}
 
// Sends response messages via the Send API
function callSendAPI(sender_psid, response) {
  // Construct the message body
  let request_body = {
    "recipient": {
      "id": sender_psid
    },
    "message": response
  }

    // Send the HTTP request to the Messenger Platform
    request({
      "uri": "https://graph.facebook.com/v2.6/me/messages",
      "qs": { "access_token": process.env.PAGE_ACCESS_TOKEN },
      "method": "POST",
      "json": request_body
    }, (err, res, body) => {
      if (!err) {
        console.log('message sent!')
      } else {
        console.error("Unable to send message:" + err);
      }
    }); 
}

function callQuickSendAPI(sender_psid, response) {
  // Construct the message body
  let request_body = {
    "recipient": {
      "id": sender_psid
    },
    "message": response
  }

    // Send the HTTP request to the Messenger Platform
    request({
      "uri": "https://graph.facebook.com/v2.6/me/messages",
      "qs": { "access_token": process.env.PAGE_ACCESS_TOKEN },
      "method": "POST",
      "json": request_body
    }, (err, res, body) => {
      if (!err) {
        console.log('message sent!')
      } else {
        console.error("Unable to send message:" + err);
      }
    }); 
}




module.exports = router;
