var alphabet = 'abcdefghijklmnopqrstuvwxyz';
function Group(name, password) {
	this.name = name;
	this.password = password;
	this.emails = [];
	this.id = alphabet[Math.floor(Math.random()*26)] + alphabet[Math.floor(Math.random()*26)] + alphabet[Math.floor(Math.random()*26)] + alphabet[Math.floor(Math.random()*26)] + alphabet[Math.floor(Math.random()*26)] + alphabet[Math.floor(Math.random()*26)] + alphabet[Math.floor(Math.random()*26)] + alphabet[Math.floor(Math.random()*26)] + alphabet[Math.floor(Math.random()*26)] + alphabet[Math.floor(Math.random()*26)] + alphabet[Math.floor(Math.random()*26)] + alphabet[Math.floor(Math.random()*26)] + alphabet[Math.floor(Math.random()*26)] + alphabet[Math.floor(Math.random()*26)] + alphabet[Math.floor(Math.random()*26)] + alphabet[Math.floor(Math.random()*26)] + alphabet[Math.floor(Math.random()*26)] + alphabet[Math.floor(Math.random()*26)] + alphabet[Math.floor(Math.random()*26)] + alphabet[Math.floor(Math.random()*26)] + alphabet[Math.floor(Math.random()*26)] + alphabet[Math.floor(Math.random()*26)] + alphabet[Math.floor(Math.random()*26)];
	this.logs = [];
}

function Log(date, log, author) {
	this.date = date;
	this.log = log;
	this.author = author;
}
function User(name, password, email) {
	this.id = alphabet[Math.floor(Math.random()*26)] + alphabet[Math.floor(Math.random()*26)] + alphabet[Math.floor(Math.random()*26)] + alphabet[Math.floor(Math.random()*26)] + alphabet[Math.floor(Math.random()*26)] + alphabet[Math.floor(Math.random()*26)] + alphabet[Math.floor(Math.random()*26)] + alphabet[Math.floor(Math.random()*26)] + alphabet[Math.floor(Math.random()*26)] + alphabet[Math.floor(Math.random()*26)] + alphabet[Math.floor(Math.random()*26)] + alphabet[Math.floor(Math.random()*26)] + alphabet[Math.floor(Math.random()*26)] + alphabet[Math.floor(Math.random()*26)] + alphabet[Math.floor(Math.random()*26)] + alphabet[Math.floor(Math.random()*26)] + alphabet[Math.floor(Math.random()*26)] + alphabet[Math.floor(Math.random()*26)] + alphabet[Math.floor(Math.random()*26)] + alphabet[Math.floor(Math.random()*26)] + alphabet[Math.floor(Math.random()*26)] + alphabet[Math.floor(Math.random()*26)] + alphabet[Math.floor(Math.random()*26)];
	this.name = name;
	this.password = password;
	this.logs = [];
	this.email = email;
}

const express = require('express');
const fetch =  require('node-fetch');
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'the.real.e.say@gmail.com',
    pass: 'lxlhjclaoqbnmfoj'
  }
});

function sendEmail(e, t) {
	var mailOptions = {
  	from: 'the.real.e.say@gmail.com',
  	to: e,
  	subject: 'E-Say Notification',
  	text: t
	};

	transporter.sendMail(mailOptions, function(error, info){
	  if (error) {
	    console.log(error);
	  } else {
	    console.log('Email sent: ' + info.response);
	  }
	});	
}

var accounts = [];
const app = express();
var addlogsToDb = async function(u, d) {
	await accToDb();
	accounts[u].logs.push(d);
	var options = {
							method: 'POST',
							headers: {
								"Content-Type": "application/json"
							},
							body: JSON.stringify({
								name: "e-say-accounts",
								info: {accounts: accounts}
							})
						};
	var response = await fetch('https://stormy-oasis.vercel.app/update', options);
	console.log(await response.json());	
}
var addToDb = async function(d) {
	var timestamp = Date.now();
	d.timestamp = timestamp;
	await accToDb();
	if (d) {accounts.push(d);}
	var options = {
							method: 'POST',
							headers: {
								"Content-Type": "application/json"
							},
							body: JSON.stringify({
								name: "e-say-accounts",
								info: {accounts: accounts}
							})
						};
	var response = await fetch('https://stormy-oasis.vercel.app/update', options);
	console.log(await response.json());
	await accToDb();
	
}

var carson = new Group('Carson\'s group', "dogs");
carson.logs.push(new Log("3/07/2022", "Hello World", "Carson"));

async function accToDb() {
	var options = {
							method: 'POST',
							headers: {
								"Content-Type": "application/json"
							},
							body: JSON.stringify({
								name: "e-say-accounts"
							})
						};
	var response = await fetch('https://stormy-oasis.vercel.app/read', options);
	console.log(await response)
	var data = await response.json();
	accounts = await data.accounts;
	
}

var groups = [carson];

async function groToDg() {
	var options = {
							method: 'POST',
							headers: {
								"Content-Type": "application/json"
							},
							body: JSON.stringify({
								name: "e-say-groups"
							})
						};
	var response = await fetch('https://stormy-oasis.vercel.app/read', options);
	var data = await response.json();
	groups = await data.groups;
}
var addToDg = async function(d) {
	var timestamp = Date.now();
	d.timestamp = timestamp;
	groToDg();
	groups.push(d);
	var options = {
							method: 'POST',
							headers: {
								"Content-Type": "application/json"
							},
							body: JSON.stringify({
								name: "e-say-groups",
								info: {groups: groups}
							})
						};
	var response = await fetch('https://stormy-oasis.vercel.app/update', options);
	console.log(await response.json());
}

var addLogToGroup = async function(u, d) {
	await groToDg();
	groups[u].logs.push(d)
	var options = {
							method: 'POST',
							headers: {
								"Content-Type": "application/json"
							},
							body: JSON.stringify({
								name: "e-say-groups",
								info: {groups: groups}
							})
						};
	var response = await fetch('https://stormy-oasis.vercel.app/update', options);
	console.log(await response.json());
}

var addEmailToGroup = async function(u, d) {
	await groToDg();
	groups[u].emails.push(d);
	var options = {
							method: 'POST',
							headers: {
								"Content-Type": "application/json"
							},
							body: JSON.stringify({
								name: "e-say-groups",
								info: {groups: groups}
							})
						};
	var response = await fetch('https://stormy-oasis.vercel.app/update', options);
}

app.listen(process.env.PORT || 3000, () => console.log('listening at 3000'));
app.use( express.static('public') );
app.use(express.json());


app.post('/login', async (request, response) => {
	await accToDb();
	var data = request.body;
	console.log(accounts);
	var f = true;
	for (var u in accounts) {
		if (data.username === accounts[u].name && data.password === accounts[u].password) {
			response.send({success: true, name: accounts[u].name, email: accounts[u].email});
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
app.post('/getData', async (request, response) => {
	await accToDb();
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
app.post('/addData', async (request, response) => {
	await accToDb();
	var data = request.body;
	for (var u in accounts) {
		if (data.id === accounts[u].id) {
			var old = JSON.parse(JSON.stringify(accounts[u]));
			addlogsToDb(new Log(data.date, data.log));
			await addToDb();
			response.send({success: true});
			return;
		}
	}
	await accToDb();
	response.send({success: false, reason: "Please login!"});
	
});
app.post('/newUser', async (request, response) => {
	await accToDb();
	var data = request.body;
	for (var i in accounts) {
		if (accounts[i].name === data.username) {
			response.send({success: false, reason: "Account already taken!"});
			console.log('User tried to create an account with a user name already taken!');
			return;
		}
	}
	await addToDb(new User(data.username, data.password, data.email));
	await accToDb();
	console.log("New user account.");
	var i = accounts.length - 1;
	//console.log('{\n id: ' + accounts[i].id + '\n name: ' + accounts[i].name + "\n password: " + accounts[i].password + '\n}')
	response.send({success: true, name: data.username});
});

app.post('/createGroup', async (request, response) => {
	await accToDb();
	await groToDg();
	var data = request.body;
	for (var u in groups) {
		if (data.name === groups[u].name) {
			response.send({success: false, reason: "Group name is already taken!"});
			return;
		}
	}
	await addToDg(new Group(data.name, data.password));
	//groups.push(new Group(data.name, data.password));
	console.log(data.name + ' ' + data.password)
	response.send({success: true});
	
});

app.post('/getGroupData', async (request, response) => {
	await accToDb();
	await groToDg();
	var data = request.body;
	//console.log(groups);
	for (var u in groups) {
		if (data.name === groups[u].name) {
			response.send({success: true, logs: groups[u].logs});
			return;
		}
	}
	console.log("Group doesn't exist")
	response.send({success: false, reason: "Group does not exist!"});
});

app.post('/addGroupData', async (request, response) => {
	await accToDb();
	await groToDg();
	var data = request.body;
	for (var i in data) {
		console.log(data[i] + '    ' + i)
	}
	for (var u in groups) {
		if (data.name === groups[u].name && data.password === groups[u].password) {
			
			if (groups[u].emails.includes(data.email) === false) {
				groups[u].emails.push(data.email);
				await addEmailToGroup(u, data.email);
			}
			
			groups[u].logs.push(new Log(data.date, data.log, data.author));
			await addLogToGroup(u, new Log(data.date, data.log, data.author));
			console.log("User: " + data.id + ' added data to their group');
			for (var email of groups[u].emails) {
				if (email !== data.email) {
					sendEmail(email, "See what " + data.author + " said on E-Say at e-say.herokuapp.com.")
				}
			}
			response.send({success: true});
			return;
		}
	}
	response.send({success: false, reason: "Group doesn't exist!"});
	
});