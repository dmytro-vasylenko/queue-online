const server = require("express")();
const bodyPareser = require("body-parser");

const http = require("http").Server(server);
const database = require("./database");
const ws = require("./ws")(http);


server.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', req.headers.origin);
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});
server.use(bodyPareser.json());
server.use(bodyPareser.urlencoded({extended: false}));

server.post("/api/place/", function(res, req) {
	database.addPlace({
		id: Number(res.body.id),
		place: res.body.place,
		name: res.body.name
	}, function(err) {
		if(err) {
			return req.status(500).send(err);
		}
		ws.socketBroadcast("NEW_PLACE", {
			id: res.body.id,
			place: res.body.place,
			placeInfo: {
				img: "man.png",
				name: "Dmitry"
			}
		});
		return req.sendStatus(200);
	});
});

server.get("/api/queues/", function(res, req) {
	database.getQueues(function(err, queues) {
		if(err) {
			return req.status(500).send(err);
		}
		return req.status(200).send(queues);
	});
});

http.listen(3001, function() {
	console.log("Server started at port 3001");
});