const server = require("express")();
const bodyPareser = require("body-parser");

const http = require("http").Server(server);
const database = require("./database");
const ws = require("./ws")(http);
const types = require("./constants").types;

const PORT = process.env.PORT || 3001;

server.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', req.headers.origin);
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});
server.use(bodyPareser.json());
server.use(bodyPareser.urlencoded({extended: false}));

server.post("/api/place", (res, req) => {
	let {id, place, name, photo, email} = res.body;

	if(!name || !photo || !email || !place || !id) {
		return req.sendStatus(400);
	}

	database.addPlace({id: Number(id), place, name, photo, email}, (err, actionType) => {
		if(err) {
			return req.status(400).send(err);
		}

		switch(actionType) {
			case types.NEW_PLACE:
				ws.socketBroadcast(types.NEW_PLACE, {
					id,
					place,
					placeData: {photo, name}
				});
				break;
			case types.REMOVE_PLACE:
				ws.socketBroadcast(types.REMOVE_PLACE, {id, place});
				break;
		}

		return req.sendStatus(200);
	});
});

server.get("/api/queues", (res, req) => {
	database.getQueues(queues => {
		return req.status(200).send(queues);
	});
});

server.post("/api/queues", (res, req) => {
	let data = res.body;
	if(!data || !data.title || !data.quantityOfPlaces) {
		return req.sendStatus(400);
	}

	database.addQueue(data, queueId => {
		if(err) {
			return req.sendStatus(200);
		}
		ws.socketBroadcast(types.NEW_QUEUE, {
			id: queueId,
			title: data.title,
			countOfPlaces: data.quantityOfPlaces,
			places: []
		});
		return req.sendStatus(200);
	});
});

http.listen(PORT, () => {
	console.log("Server started at port", PORT);
});