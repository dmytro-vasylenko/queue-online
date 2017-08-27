const MongoClient = require("mongodb").MongoClient;

const url = "mongodb://localhost:27017/queue";

MongoClient.connect(url, function(err, db) {
	db.collection("queues").insert({
		title: "Лабораторная работа по АтСД",
		countOfPlaces: 10,
		places: []
	});
});