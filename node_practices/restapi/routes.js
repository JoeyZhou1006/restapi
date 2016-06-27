var express = require('express');

//get the router
var router = express.Router()

var Message = require('./models/message');

//middleware for all this routers requests
router.use(function timeLog(req, res, next) {
	console.log('Request received: ', dateDisplayed(Date.now()));
	next();
});


//welcome message for a get at http://localohost:8080/restapi

router.get('/', function(req, res) {
	res.json({ message: 'Welcome to the rest API' });
});

//get all the messages (using a get at http://localhost:8080/messages)
router.route('/messages')
	.get(function(req, res) {
		Message.find(function(err, messages) {
			if (err)
				res.send(err);
			res.json(messages);
		});
	});


//create a message (using POST at http://localhost:8080/messages)
router.route('/messages')
	.post(function(req, res) {
		var message = new Message();
		//set text and user values from the request
		message.text = req.body.text;
		message.user = req.body.user;

		//save message and check for errors
		message.save(function(err) {
			if(err)
				res.send(err);
			res.json({ message: 'Message created successfully!' });
		});
	});

//get message with id(using a get, in this case, e.g. localhost:8080/messages/5770f229ec0b27730751f471)
router.route('/messages/:message_id')
	.get(function(req, res) {
		Message.findById(req.params.message_id, function(err, message) {
			if (err)
				res.send(err);
			res.json(message);
		});
	})
	//updating a message
	.put(function(req, res) {
		Message.findById(req.params.message_id, function(err, message) {
			if(err)
				res.send(err);
			//update the message text
		message.text = req.body.text;
		message.save(function(err) {
			if(err)
				res.send(err);
			res.json({ message: 'Message successfully updated!' });
		});
		});
	})

	//delete  a message
	.delete(function(req, res) {
		Message.remove({
			_id: req.params.message_id
		}, function(err, message) {
			if(err)
				res.send(err);
			res.json({ message: 'successfully deleted message!' });
		});
	});

module.exports = router;

function dateDisplayed(timestamp){
	var date = new Date(timestamp);
	return (date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear()+ " " + date.getHours()+ ":" + date.getMinutes() + ":" + date.getSeconds());

}