const database = require("../database");
const auth = require("../auth");
const types = require("../constants").types;

module.exports = (server, websocket) => {
    server.post("/api/place", async (req, res) => {
        const {id, google_token} = req.body;

        if (!id || !google_token) {
            return res.sendStatus(400);
        }

        const user = await auth.getUser(google_token);

        if (!user) {
            return res.send({error: "Bad token"});
        }

        database.Queues.addPlace({id, user}, err => {
            if (err) {
                return res.send(err);
            }

            websocket.socketBroadcast(types.NEW_PLACE, {id, place: user});

            return res.sendStatus(200);
        });
    });

    server.delete("/api/place", async (req, res) => {
        const {id, google_token} = req.body;

        if (!id || !google_token) {
            return res.sendStatus(400);
        }

        const user = await auth.getUser(google_token);

        if (!user) {
            return res.send({error: "Bad token"});
        }

        database.Queues.removePlace({id, user});
        return res.sendStatus(200);
    });

    server.get("/api/queues", (req, res) => {
        database.Queues.getQueues(queues => {
            return res.send(queues);
        });
    });

    server.post("/api/queues", (req, res) => {
        console.log(database);
        let data = req.body;
        if (!data || !data.title || !data.quantityOfPlaces || !data.date) {
            return res.sendStatus(400);
        }

        database.Queues.addQueue(data, queueId => {
            websocket.socketBroadcast(types.NEW_QUEUE, {
                id: queueId,
                title: data.title,
                countOfPlaces: data.quantityOfPlaces,
                places: []
            });
            return res.sendStatus(200);
        });
    });

    server.delete("/api/queue", (req, res) => {
        let data = req.body;
        if (!data) {
            return res.sendStatus(400);
        }

        database.Queues.deleteQueue(data);
        return res.sendStatus(200);
    });
};
