const database = require("../database");
const auth = require("../auth");
const types = require("../constants").types;

module.exports = (server, websocket) => {
    server.post("/api/place", async (res, req) => {
        const {id, google_token} = res.body;

        if (!id || !google_token) {
            return req.sendStatus(400);
        }

        const user = await auth.getUser(google_token);

        if (!user) {
            return req.send({error: "Bad token"});
        }

        database.Queues.addPlace({id, user}, err => {
            if (err) {
                return req.send(err);
            }

            websocket.socketBroadcast(types.NEW_PLACE, {
                id,
                place: user
            });

            return req.sendStatus(200);
        });
    });

    server.get("/api/queues", (res, req) => {
        database.Queues.getQueues(queues => {
            return req.send(queues);
        });
    });

    server.post("/api/queues", (res, req) => {
        console.log(database);
        let data = res.body;
        if (!data || !data.title || !data.quantityOfPlaces || !data.date) {
            return req.sendStatus(400);
        }

        database.Queues.addQueue(data, queueId => {
            websocket.socketBroadcast(types.NEW_QUEUE, {
                id: queueId,
                title: data.title,
                countOfPlaces: data.quantityOfPlaces,
                places: []
            });
            return req.sendStatus(200);
        });
    });

    server.delete("/api/queue", (res, req) => {
        let data = res.body;
        if (!data) {
            return req.sendStatus(400);
        }

        database.Queues.deleteQueue(data);
        return req.sendStatus(200);
    });
};
