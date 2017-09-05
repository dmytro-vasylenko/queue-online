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

	database.addPlace({
		id: Number(id),
		place,
		name,
		photo,
		email
	}, function(err) {
		if(err) {
			return req.status(500).send(err);
		}
		ws.socketBroadcast("NEW_PLACE", {
			id,
			place,
			placeData: {
				photo,
				name
			}
		});
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