var request = require('request');
var package = require('../../package.json');

var apiOptions = {
    server: "https://chatbot180.herokuapp.com/"
};

if (process.env.NODE_ENV === 'production') {
    apiOptions.server = "https://chatbot180.herokuapp.com/";
}


module.exports.test = function (req, res) {
    var requestOptions, path;

    path = '/api/users';

    //ADD
    requestOptions = {
        url: apiOptions.server + '/api/users',
        method: "POST",
        json: {
            "fbID": "abcdefgfewfe"
        }
    };

    request(
        requestOptions, function (err, response, body) {

            if (err) {
                console.log("FAIL AT ADD")
            }
            else {
            }
        }
    );
    
    //Get position
    requestOptions = {
        url: apiOptions.server + '/api/users/position/abcdefgfewfe',
        method: "GET",
    };

    request(
        requestOptions, function (err, response, body) {

            if (err) {
                console.log("FAIL AT GET USER POSITION")
            }
            else {
                console.log("GET POS")
                console.log(response);
            }
        }
    );

    //Update Position
    requestOptions = {
        url: apiOptions.server + '/api/users/position/abcdefgfewfe/3',
        method: "PUT",
    };

    request(
        requestOptions, function (err, response, body) {

            if (err) {
                console.log("FAIL AT UPDATE USER POSITION")
            }
            else {
                console.log("UPDATE POS");
                console.log(response);
            }
        }
    );

    // //ADD QA TO USER
    // requestOptions = {
    //     url: apiOptions.server + '/api/users/qa/abcdefgfewfe',
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
    //             console.log(response);
    //         }
    //     }
    // );

    //ADD MESSAGE
    requestOptions = {
        url: apiOptions.server + '/api/questions',
        method: "POST",
        json: {
            "type": "prompt",
            "input": false,
            "next": 123
        }
    };

    request(
        requestOptions, function (err, response, body) {

            if (err) {
                console.log("FAIL AT ADD MESSAGE")
            }
            else {
                console.log("ADD message");
                console.log(response);
            }
        }
    );

    res.render('index')
}
