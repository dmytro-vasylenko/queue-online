const server = require("express")();
const bodyPareser = require("body-parser");

const http = require("http").Server(server);
const database = require("./database");
const ws = require("./ws")(http);

const PORT = 3001;

server.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', req.headers.origin);
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});
server.use(bodyPareser.json());
server.use(bodyPareser.urlencoded({extended: false}));

server.post("/api/place/", (res, req) => {
	let {id, place, name, photo, email} = res.body;

	if(!name || !photo || !email) {
		return;
	}

	database.addPlace({
		id: Number(id),
		place,
		name,
		photo,
		email
	}, (err, type) => {
		if(err) {
			return req.status(500).send(err);
		}
		if(type == "NEW_PLACE") {
			ws.socketBroadcast("NEW_PLACE", {
				id,
				place,
				placeData: {
					photo,
					name
				}
			});
		} else if(type == "REMOVE_PLACE") {
			ws.socketBroadcast("REMOVE_PLACE", {
				id,
				place
			});
		}
		return req.sendStatus(200);
	});
});

server.get("/api/queues/", (res, req) => {
	database.getQueues((err, queues) => {
		if(err) {
			return req.status(500).send(err);
		}
		return req.status(200).send(queues);
	});
});

http.listen(PORT, () => {
	console.log("Server started at port", PORT);
});