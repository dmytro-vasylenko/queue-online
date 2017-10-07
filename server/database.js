const MongoClient = require("mongodb").MongoClient;

const types = require("./constants").types;

// const url = "mongodb://localhost:27017/queue";
const url = "mongodb://admin:admin@ds163034.mlab.com:63034/heroku_t21z98rs";

var db;

MongoClient.connect(url, (err, database) => {
	if(!err && database) {
		db = database;
		console.log("Connected to MongoDB.");
	} else {
		console.log("Error while it was connecting to MongoDB.");
	}
});

const addPlace = async (data, callback) => {
	let {name, place, id, photo, email} = data;
	let selectedPlace = await db.collection("queues").findOne({"places.place": place, id});

	if(!selectedPlace) {
		let doc = await db.collection("queues").findOne({"places.email": email, id});
		if(!doc) {
			db.collection("queues").update({id}, {
				$push: {
					places: {name, place, photo, email}
				}
			});
			callback(null, types.NEW_PLACE);
		} else {
			callback("Error");
		}
	} else {
		let currentPlace = selectedPlace.places.filter(item => item.email === email && item.place == place)[0];
		if(currentPlace) {
			db.collection("queues").update({id}, {
				$pull: {
					places: {name, place, photo, email}
				}
			});
			callback(null, types.REMOVE_PLACE);
		} else {
			callback("Place has been already booked.");
		}
	}
}

const getQueues = async callback => {
	let queues = await db.collection("queues").find({});
	callback(await queues.toArray());
}

const addQueue = async (data, callback) => {
	let queueId = Number(Math.random().toString().slice(2));
	await db.collection("queues").insert({
		id: queueId,
		title: data.title,
		countOfPlaces: data.quantityOfPlaces,
		places: []
	});
	callback(queueId);
}

module.exports = {addPlace, getQueues, addQueue};