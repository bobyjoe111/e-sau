var alphabet = 'abcdefghijklmnopqrstuvwxyz';

function Group(name, password) {
	this.name = name;
	this.password = password;
	this.id = alphabet[Math.floor(Math.random()*26)] + alphabet[Math.floor(Math.random()*26)] + alphabet[Math.floor(Math.random()*26)] + alphabet[Math.floor(Math.random()*26)] + alphabet[Math.floor(Math.random()*26)] + alphabet[Math.floor(Math.random()*26)] + alphabet[Math.floor(Math.random()*26)] + alphabet[Math.floor(Math.random()*26)] + alphabet[Math.floor(Math.random()*26)] + alphabet[Math.floor(Math.random()*26)] + alphabet[Math.floor(Math.random()*26)] + alphabet[Math.floor(Math.random()*26)] + alphabet[Math.floor(Math.random()*26)] + alphabet[Math.floor(Math.random()*26)] + alphabet[Math.floor(Math.random()*26)] + alphabet[Math.floor(Math.random()*26)] + alphabet[Math.floor(Math.random()*26)] + alphabet[Math.floor(Math.random()*26)] + alphabet[Math.floor(Math.random()*26)] + alphabet[Math.floor(Math.random()*26)] + alphabet[Math.floor(Math.random()*26)] + alphabet[Math.floor(Math.random()*26)] + alphabet[Math.floor(Math.random()*26)];
	this.logs = [];
}

function Log(date, log, author) {
	this.date = date;
	this.log = log;
	this.author = author;
}
function User(name, password) {
	this.id = alphabet[Math.floor(Math.random()*26)] + alphabet[Math.floor(Math.random()*26)] + alphabet[Math.floor(Math.random()*26)] + alphabet[Math.floor(Math.random()*26)] + alphabet[Math.floor(Math.random()*26)] + alphabet[Math.floor(Math.random()*26)] + alphabet[Math.floor(Math.random()*26)] + alphabet[Math.floor(Math.random()*26)] + alphabet[Math.floor(Math.random()*26)] + alphabet[Math.floor(Math.random()*26)] + alphabet[Math.floor(Math.random()*26)] + alphabet[Math.floor(Math.random()*26)] + alphabet[Math.floor(Math.random()*26)] + alphabet[Math.floor(Math.random()*26)] + alphabet[Math.floor(Math.random()*26)] + alphabet[Math.floor(Math.random()*26)] + alphabet[Math.floor(Math.random()*26)] + alphabet[Math.floor(Math.random()*26)] + alphabet[Math.floor(Math.random()*26)] + alphabet[Math.floor(Math.random()*26)] + alphabet[Math.floor(Math.random()*26)] + alphabet[Math.floor(Math.random()*26)] + alphabet[Math.floor(Math.random()*26)];
	this.name = name;
	this.password = password;
	this.logs = [];
}

const express = require('express');
const Datastore = require('nedb');
var accounts = [];
const app = express();
var database = new Datastore('database.db');
database.loadDatabase();
var addToDb = function(d) {
	var timestamp = Date.now();
	d.timestamp = timestamp;
	database.insert(d);
}

var carson = new Group('Carson\'s group', "dogs");
carson.logs.push(new Log("3/07/2022", "Hello World", "Carson"));

function accToDb() {
	database.find({}, (err, data) => {
		if (err) {response.send(); return;}
		accounts = data;
	});
}

var dataGroups = new Datastore('dataGroups.db');
dataGroups.loadDatabase();
var groups = [carson];

function upDateLogs(user, newUser) {
	database.update(user, newUser, {}, function (err, numReplaced) {});
	console.log(user);
	console.log(newUser);
}

function upDateGroup(user, newUser) {
	dataGroups.update(user, newUser, {}, function (err, numReplaced) {});
	console.log(user);
	console.log(newUser);
}

function groToDg() {
	dataGroups.find({}, (err, data) => {
		if (err) {response.send(); return;}
		groups = data;
	});
}
var addToDg = function(d) {
	var timestamp = Date.now();
	d.timestamp = timestamp;
	dataGroups.insert(d);
	console.log(d);
}

app.listen(process.env.PORT || 3000, () => console.log('listening at 3000'));
app.use( express.static( __dirname) );
app.use(express.json());


app.post('/login', (request, response) => {
	accToDb();
	var data = request.body;
	console.log(accounts);
	var f = true;
	for (var u in accounts) {
		if (data.username === accounts[u].name && data.password === accounts[u].password) {
			response.send({success: true, name: accounts[u].name});
			console.log("User: " + accounts[u].id + ' logged in.');
			f = false;
			return;
		}
	}
	if (f) {
		console.log("Client entered incorrect username or password!");
		response.send({success: false, reason: "Username or password is incorrect!"});
	}
});
app.post('/getData', (request, response) => {
	accToDb();
	var data = request.body;
	for (var u in accounts) {
		if (data.id === accounts[u].id) {
			response.send({success: true, logs: accounts[u].logs});
			console.log("User: " + accounts[u].id + ' grabbed their data.');
			return;
		}
	}
	response.send({success: false, reason: "Please login!"});
});
app.post('/addData', (request, response) => {
	accToDb();
	var data = request.body;
	for (var u in accounts) {
		if (data.id === accounts[u].id) {
			var old = JSON.parse(JSON.stringify(accounts[u]));
			accounts[u].logs.push(new Log(data.date, data.log));
			upDateLogs(old, accounts[u]);
			console.log("User: " + accounts[u].id + ' added data to their account.');
			response.send({success: true});
			return;
		}
	}
	response.send({success: false, reason: "Please login!"});
	
});
app.post('/newUser', (request, response) => {
	accToDb();
	var data = request.body;
	for (var i in accounts) {
		if (accounts[i].name === data.username) {
			response.send({success: false, reason: "Account already taken!"});
			console.log('User tried to create an account with a user name already taken!');
			return;
		}
	}
	addToDb(new User(data.username, data.password));
	accToDb();
	console.log(accounts);
	console.log("New user account.");
	var i = accounts.length - 1;
	console.log('{\n id: ' + accounts[i].id + '\n name: ' + accounts[i].name + "\n password: " + accounts[i].password + '\n}')
	response.send({success: true});
});

app.post('/createGroup', (request, response) => {
	accToDb();
	groToDg();
	var data = request.body;
	for (var u in groups) {
		if (data.name === groups[u].name) {
			response.send({success: false, reason: "Group name is already taken!"});
			return;
		}
	}
	addToDg(new Group(data.name, data.password));
	//groups.push(new Group(data.name, data.password));
	console.log(data.name + ' ' + data.password)
	response.send({success: true});
	
});

app.post('/getGroupData', (request, response) => {
	accToDb();
	groToDg();
	var data = request.body;
	console.log(groups);
	for (var u in groups) {
		if (data.name === groups[u].name) {
			response.send({success: true, logs: groups[u].logs});
			return;
		}
	}
	console.log("Group doesn't exist")
	response.send({success: false, reason: "Group does not exist!"});
});

app.post('/addGroupData', (request, response) => {
	accToDb();
	groToDg();
	var data = request.body;
	for (var u in groups) {
		if (data.name === groups[u].name && data.password === groups[u].password) {
			var old = JSON.parse(JSON.stringify(groups[u]));
			groups[u].logs.push(new Log(data.date, data.log, data.author));
			upDateGroup(old, groups[u]);
			console.log("User: " + data.id + ' added data to their group');
			response.send({success: true});
			return;
		}
	}
	response.send({success: false, reason: "Group doesn't exist!"});
	
});