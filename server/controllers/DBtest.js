var request = require('request');
var package = require('../../package.json');

var apiOptions = {
    server: "http://localhost"
};

if (process.env.NODE_ENV === 'production') {
    apiOptions.server = "https://chatbot180.herokuapp.com/";
}


module.exports.test = function (req, res) {
    var requestOptions, path;

    path = '/api/users';

    // //ADD
    // requestOptions = {
    //     url: apiOptions.server + '/api/users',
    //     method: "POST",
    //     json: {
    //         "fbID": "fasdfhriughivfu"
    //     }
    // };

    // request(
    //     requestOptions, function (err, response, body) {

    //         if (err) {
    //             console.log("FAIL AT ADD")
    //             console.log(err);
    //         }
    //         else {
    //             console.log("SUCCESS AT USER ADD");
    //         }
    //     }
    // );
    
    // //Get position
    // requestOptions = {
    //     url: apiOptions.server + '/api/users/position/fasdfhriughivfu',
    //     method: "GET",
    // };

    // request(
    //     requestOptions, function (err, response, body) {

    //         if (err) {
    //             console.log("FAIL AT GET USER POSITION")
    //             console.log(err);
    //         }
    //         else {
    //             console.log("GET POS")
    //             console.log(body);
    //         }
    //     }
    // );

    // //Update Position
    // requestOptions = {
    //     url: apiOptions.server + '/api/users/position/fasdfhriughivfu/3',
    //     method: "PUT",
    // };

    // request(
    //     requestOptions, function (err, response, body) {

    //         if (err) {
    //             console.log("FAIL AT UPDATE USER POSITION")
    //             console.log(err);
    //         }
    //         else {
    //             console.log("UPDATE POS");
    //             console.log(body);
    //         }
    //     }
    // );

    // //ADD QA TO USER
    // requestOptions = {
    //     url: apiOptions.server + '/api/users/qa/fasdfhriughivfu',
    //     method: "POST",
    //     json: {
    //         "answer": "LOLOL",
    //         "questionID": "123"
    //     }
    // };

    // request(
    //     requestOptions, function (err, response, body) {

    //         if (err) {
    //             console.log("FAIL AT UPDATE USER POSITION")
    //         }
    //         else {
    //             console.log("UPDATE POS");
    //             console.log(body);
    //         }
    //     }
    // );

    // //ADD MESSAGE
    // requestOptions = {
    //     url: apiOptions.server + '/api/questions',
    //     method: "POST",
    //     json: {     
    //         "type": "prompt",
    //         "input": false,
    //         "next": 123
    //     }
    // };

    // request(
    //     requestOptions, function (err, response, body) {

    //         if (err) {
    //             console.log("FAIL AT ADD MESSAGE")
    //             console.log(err);
    //         }
    //         else {
    //             console.log("ADD message");
    //             console.log(body);
    //         }
    //     }
    // );

    //GET MESSAGE
    requestOptions = {
        url: apiOptions.server + '/api/questions/1',
        method: "GET",
    };

    request(
        requestOptions, function (err, response, body) {

            if (err) {
                console.log("FAIL AT GET MESSAGE")
                console.log(err);
            }
            else {
                console.log("GET message");
                console.log(body);
            }
        }
    );

    //UPDATE MESSAGE
    requestOptions = {
        url: apiOptions.server + '/api/questions/1',
        method: "PUT",
        json: {
            "type": "question",
            "input": false,
            "next": 124
        }
    };

    request(
        requestOptions, function (err, response, body) {

            if (err) {
                console.log("FAIL AT UPDATE MESSAGE")
                console.log(err);
            }
            else {
                console.log("UPDATE message");
                console.log(body);
            }
        }
    );



     //ADD MESSAGE OPTION
     requestOptions = {
        url: apiOptions.server + '/api/questions/addoption/1',
        method: "PUT",
        json: {
            "optionName": "hihi",
            "next": 213
        }
    };

    request(
        requestOptions, function (err, response, body) {

            if (err) {
                console.log("FAIL AT UPDATE MESSAGE options")
                console.log(err);
            }
            else {
                console.log("UPDATE message options");
                console.log(body);
            }
        }
    );



}
