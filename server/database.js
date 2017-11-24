const MongoClient = require("mongodb").MongoClient;

const types = require("./constants").types;

// const url = "mongodb://localhost:27017/queue";
const url = "mongodb://admin:admin@ds163034.mlab.com:63034/heroku_t21z98rs";

var db;

const open = callback => {
    MongoClient.connect(url, (err, database) => {
        if (!err && database) {
            db = database;
            callback();
        } else {
            console.log(`Error while it was connecting to MongoDB: ${err}`);
        }
    });
};

const close = () => {
    if (db) {
        db.close();
    }
};

const addPlace = async (data, callback) => {
    let {name, place, id, photo, email} = data;
    let selectedPlace = await db.collection("queues").findOne({"places.place": place, id});

    if (!selectedPlace) {
        let doc = await db.collection("queues").findOne({"places.email": email, id});
        if (!doc) {
            db.collection("queues").update(
                {id},
                {
                    $push: {
                        places: {name, place, photo, email}
                    }
                }
            );
            callback(null, types.NEW_PLACE);
        } else {
            callback("This is not your place.");
        }
    } else {
        let currentPlace = selectedPlace.places.filter(item => item.email === email && item.place == place)[0];
        if (currentPlace) {
            db.collection("queues").update(
                {id},
                {
                    $pull: {
                        places: {name, place, photo, email}
                    }
                }
            );
            callback(null, types.REMOVE_PLACE);
        } else {
            callback("Place has been already booked.");
        }
    }
};

const getQueues = async callback => {
    let queues = await db.collection("queues").find({});
    callback(await queues.toArray());
};

const addQueue = async (data, callback) => {
    let queueId = Math.random()
        .toString()
        .slice(2);
    await db.collection("queues").insert({
        id: queueId,
        title: data.title,
        countOfPlaces: data.quantityOfPlaces,
        places: []
    });
    callback(queueId);
};

const deleteQueue = data => {
    db.collection("queues").remove({title: data.title});
};

module.exports = {addPlace, getQueues, addQueue, close, open, deleteQueue};
