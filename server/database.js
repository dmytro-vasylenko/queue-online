const MongoClient = require("mongodb").MongoClient;

const url = "mongodb://localhost:27017/queue";

function addPlace(data, callback) {
	let {name, place, id, photo, email} = data;
	MongoClient.connect(url, (err, db) => {
		db.collection("queues").findOne({"places.email": email, id}, (err, doc) => {
			if(!doc) {
				db.collection("queues").update({id}, {
					$push: {
						places: {
							name,
							place,
							photo,
							email
						}
					}
				});
				callback(err);
			}
		})
	});
}

function getQueues(callback) {
	MongoClient.connect(url, (err, db) => {
		if(err) {
			callback(err);
		}
		db.collection("queues").find({}, (err, queues) => {
			queues.toArray((err, queue) => {
				callback(err, queue);
			});
		});
	});
}

module.exports = {addPlace, getQueues};