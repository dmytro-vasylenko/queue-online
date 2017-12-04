const types = require("../constants").types;

module.exports = knex => {
    const queries = require("./queries")(knex);

    const addPlace = async (data, callback) => {
        const {user, id} = data;
        const student = await queries.getStudent(user.email);

        if (!student) {
            return callback({error: "You are not a student"});
        }

        const isBooked = await queries.isStudentInQueue(id, student.id);

        if (isBooked) {
            return callback({error: "You have already booked a place in the queue"});
        }

        await queries.addStudentToQueue({
            queue: id,
            student: student.id
        });

        callback(null);
    };

    const removePlace = async (data, callback) => {
        queries.removePlace(data);
    };

    const getQueues = async callback => {
        const queues = await queries.getQueues();
        for (const queue of queues) {
            queue.students = await queries.getStudentsByQueueId(queue.id);
        }
        console.log("QUEUES", queues);
        callback(queues);
    };

    const addQueue = async (data, callback) => {
        const queueId = Math.random()
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

    return {addPlace, removePlace, getQueues, addQueue, deleteQueue};
};
