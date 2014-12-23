//require("express");

var readline = require('readline'),
    wait=require("wait.for");

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var Client = require('node-rest-client').Client;

client = new Client();

var base_url = "http://localhost:3000"

console.log("Welcome to Both Are Totally Enraged!");
console.log("Who would win in a fight?");

client.registerMethod("getBallot", base_url + "/ballot", "GET");
client.registerMethod("postBallot", base_url + "/ballot", "POST");
client.registerMethod("getWins", base_url + "/animal/$(id}/wins", "GET");

var kickOffIteration = function() {
    getBallot();
};

var getBallot = function() {
    client.methods.getBallot(receiveBallot);
};

var receiveBallot = function(data, response) {
        var ballot = JSON.parse(data);
        askWhoWins(ballot);
};

var askWhoWins = function(ballot) {
    var option1 = ballot;
    var question =  "" + ballot['option1'] + " or " + ballot['option2'] + "?";
    rl.question(question, function(usersChoice) {
        ballot['choice'] = usersChoice;
        postBallot(ballot);
    });
};

var postBallot = function(ballot) {
    var chosenAnimal = ballot['choice'];
    var args = {
        data: ballot,
        headers:{"Content-Type": "application/json"} 
};
     client.methods.postBallot(args, function requestWinsOfChoice(data, response) {
        client.get(base_url + "/animal/" + chosenAnimal + "/wins", args, function handleGetWins(data, response) {
            var wins = JSON.parse(data)['wins'];
            kickOffIteration();
        });
    });
};

function loopIt() {
    kickOffIteration();
}

wait.launchFiber(loopIt);