var mongoose = require('mongoose');

var autoIncrement = require('mongoose-auto-increment');


var gracefulShutdown;

// var dbURI = 'localhost/chatbot';
var dbURI = process.env.MONGOLAB_URI;
if (process.env.NODE_ENV === 'production') {
    dbURI = process.env.MONGOLAB_URI;
}

// mongoose.connect(dbURI);
var connection = mongoose.connect(dbURI);
autoIncrement.initialize(connection);

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
});// signal 2 defined by user

// For app termination
process.on('SIGINT', function() {
    gracefulShutdown('app termination', function () {
        process.exit(0);
    });
});//SIGINT means termination


var pairSchema = new mongoose.Schema({
    messageID: Number,
    label: String
});

//Messages
/**
 * Stores the messages/options/next node
 */
var messageSchema = new mongoose.Schema({
    id : Number,
    type: {type: String},
    options: [pairSchema],
    input: Boolean,
    next: Number
});
messageSchema.plugin(autoIncrement.plugin, {
    model: 'Message',
    field: 'id',
    startAt: 0,
    incrementBy: 1});



var qaSchema = new mongoose.Schema({
    id: Number,
    answer: {type: String}
});

//User Information
/**
 * Stores user responses
 */
var userSchema = new mongoose.Schema({
    qa: [qaSchema],
    fbID: String,
    positionID: Number
});



//Feedback Information
/**
 * Stores user feedback
 */
var feedbackSchema = new mongoose.Schema({
    feedback: {type: String, required: true},//check whether the feedback is filled or not
    fbID: String 
})

var userSchema = mongoose.model('User', userSchema);
var messageSchema = mongoose.model('Message', messageSchema);
var qaSchema = mongoose.model('Qa', qaSchema);
var feedbackSchema = mongoose.model('Feedback', feedbackSchema);
var pairSchema = mongoose.model('Pair', pairSchema);

module.exports={
    messageSchema:messageSchema,
    userSchema:userSchema,
    qaSchema:qaSchema,
    feedbackSchema:feedbackSchema,
    pairSchema:pairSchema
}