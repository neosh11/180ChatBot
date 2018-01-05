var mongoose = require('mongoose');

var gracefulShutdown;

var dbURI = 'localhost/chatbot';
if (process.env.NODE_ENV === 'production') {
    dbURI = process.env.MONGOLAB_URI;
}

mongoose.connect(dbURI);

mongoose.connection.on('connected', function () {
    console.log('Mongoose connected to ' + dbURI);
});
mongoose.connection.on('error',function (err) {
    console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose disconnected');
});

gracefulShutdown = function (msg, callback) {
    mongoose.connection.close(function () {
        console.log('Mongoose disconnected through ' + msg);
        callback();
    });
};

// For nodemon restarts
process.once('SIGUSR2', function () {
    gracefulShutdown('nodemon restart', function () {
        process.kill(process.pid, 'SIGUSR2');
    });
});

// For app termination
process.on('SIGINT', function() {
    gracefulShutdown('app termination', function () {
        process.exit(0);
    });
});



//Messages
/**
 * Stores the messages/options/next node
 */
var messageSchema = new mongoose.Schema({
    prompt: {type: String},
    options: [pairSchema],
    input: Boolean,
    next: mongoose.Schema.Types.ObjectId
});

var pairSchema = new mongoose.Schema({
    messageID: {type: mongoose.Schema.Types.ObjectId, ref: 'Message', required: true},
    label: String
});

//User Information
/**
 * Stores user responses
 */
var userSchema = new mongoose.Schema({
    qa: [qaSchema],
    fbID: String
});
var qaSchema = new mongoose.Schema({
    id: {type: mongoose.Schema.Types.ObjectId, ref: 'Message'},
    answer: {type: String}
});

//Feedback Information
/**
 * Stores user feedback
 */
var feedbackSchema = new mongoose.Schema({
    feedback: {type: String, required: true},
    fbID: String 
})