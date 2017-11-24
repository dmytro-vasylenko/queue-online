const database = require("../database");
const types = require("../constants").types;

database.open(() => {
    console.log("Connected to MongoDB.");
});

module.exports = server => {
    server.post("/api/place", (res, req) => {
        let {id, place, name, photo, email} = res.body;

        if (!name || !photo || !email || !id) {
            return req.sendStatus(400);
        }

        database.addPlace({id, place, name, photo, email}, (err, actionType) => {
            if (err) {
                return req.status(400).send(err);
            }

            switch (actionType) {
                case types.NEW_PLACE:
                    ws.socketBroadcast(types.NEW_PLACE, {
                        id,
                        place,
                        placeData: {photo, name, email}
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
            return req.send(queues);
        });
    });

    server.post("/api/queues", (res, req) => {
        let data = res.body;
        if (!data || !data.title || !data.quantityOfPlaces || !data.date) {
            return req.sendStatus(400);
        }

        database.addQueue(data, queueId => {
            ws.socketBroadcast(types.NEW_QUEUE, {
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

        database.deleteQueue(data);
        return req.sendStatus(200);
    });
};
