const MongoClient = require("mongodb").MongoClient;

const types = require("./constants").types;

const url = "mongodb://localhost:27017/queue";

function addPlace(data, callback) {
	let {name, place, id, photo, email} = data;
	MongoClient.connect(url, (err, db) => {
		db.collection("queues").findOne({"places.email": email, id}, (err, doc) => {
			if(!doc) {
				db.collection("queues").update({id}, {
					$push: {
						places: {name, place, photo, email}
					}
				});
				callback(null, types.NEW_PLACE);
			} else {
				let currentPlace = doc.places.filter(item => item.email === email && item.place == place)[0];
				if(currentPlace) {
					db.collection("queues").update({id}, {
						$pull: {
							places: {name, place, photo, email}
						}
					});
					callback(null, types.REMOVE_PLACE);
				}
			}
		})
	});
}

function getQueues(callback) {
	MongoClient.connect(url, (err, db) => {
		if(err) {
			callback(err);
		} else {
			db.collection("queues").find({}, (err, queues) => {
				queues.toArray((err, queue) => {
					callback(err, queue);
				});
			});
		}
	});
}

function addQueue(data, callback) {
	MongoClient.connect(url, (err, db) => {
		if(err) {
			callback(err);
		} else {
			let queueId = Number(Math.random().toString().slice(2));
			db.collection("queues").insert({
				id: queueId,
				title: data.title,
				countOfPlaces: data.quantityOfPlaces,
				places: []
			});
			callback(null, queueId);
		}
	});
}

module.exports = {addPlace, getQueues, addQueue};