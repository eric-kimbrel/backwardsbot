var restify = require('restify');
var builder = require('botbuilder');



// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});

// serve index.html at the root so we can see that the app is up
server.get(/.*/, restify.plugins.serveStatic({ 'directory': '.', 'default': 'index.html' }));

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

// Listen for messages from users 
server.post('/api/messages', connector.listen());

// Receive messages from the user and respond by echoing back the reverse
var bot = new builder.UniversalBot(connector, function (session) {
    //session.send( reverse(session.message.text));
    var reversed = reverse(session.message.text)
    session.say(reversed,reversed)
});


var reverse = function(text) {
    return text.split(' ').reverse().join(' ')
}

