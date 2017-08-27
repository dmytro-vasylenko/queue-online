const MongoClient = require("mongodb").MongoClient;

const url = "mongodb://localhost:27017/queue";

function addPlace(data, callback) {
	console.log(data);
	var {name, place, id} = data;
	MongoClient.connect(url, function(err, db) {
		db.collection("queues").update({id}, {
			$push: {
				places: {
					name,
					place
				}
			}
		});
		callback(err);
	});
}

function getQueues(callback) {
	MongoClient.connect(url, function(err, db) {
		if(err) {
			callback(err);
		}
		db.collection("queues").find({}, function(err, queues) {
			queues.toArray(function(err, queue) {
				callback(err, queue);
			});
		});
	});
}

module.exports = {addPlace, getQueues};