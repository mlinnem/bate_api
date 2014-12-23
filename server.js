var express = require('express');

 
var app = express();

app.configure(function () {
    app.use(express.logger('dev'));     /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser());
});

var animals = ["Bear", "Koala", "Dingo", "Musk Ox", "Velociraptor", "Rat", "Salamander", "Cricket"]

var ballots = [];

app.get('/ballot', function(req, res) {
	var id = Math.random();
	var animal1 = chooseRandom(animals);
	var animal2 = chooseRandom(animals);
	var ballot = {"option1": animal1, "option2": animal2};
    res.send(ballot);
});

app.post('/ballot', function(req, res) {
	console.log("Before, " + ballots.length + " ballots were submitted.");
	ballots.push(req.body);
	console.log("Now, " + ballots.length + " have been submitted.");
	res.send("Submission Successful.");
});

app.get('/animal/:name/wins', function(req, res) {
	var name = req.params.name;
	console.log("How many times has " + name + " won?");

	var won_ballots = ballots.filter(function(ballot) {
		return ballot["choice"] == name;
	});
	console.log("apparently " + won_ballots.length);
	res.send({"wins": won_ballots.length});
});

app.get('/animal/:name/losses', function(req, res) {
	var name = req.params.name;

	var lost_ballots = ballots.filter(function(ballot) {
		if ((ballot["option1"] == name || ballot["option2"] == name) && ballot["choice"] != name) {
			return true;
		} else {
			return false;
		}
	});
	res.send({losses: lost_ballots.length});
});

function chooseRandom(aList) {
	var randomIndex = Math.floor(Math.random() * aList.length);
	return aList[randomIndex];
}
 
app.listen(3000);
console.log('Listening on port 3000...');

