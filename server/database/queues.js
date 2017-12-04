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

    const getQueues = async callback => {
        const studentsInQueues = await queries.getQueues();

        const queues = {};
        studentsInQueues.forEach(item => {
            if (queues[item.id]) {
                queues[item.id].students.push({
                    name: item.name,
                    email: item.email,
                    photo: item.photo
                });
            } else {
                queues[item.id] = {
                    id: item.id,
                    lesson: {
                        name: item.lessonName,
                        shortName: item.lessonShortName
                    },
                    group: item.group,
                    type: item.lessonType,
                    classRoom: item.class_room,
                    date: item.date,
                    students: [
                        {
                            name: item.name,
                            email: item.email,
                            photo: item.photo
                        }
                    ]
                };
            }
        });
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

    return {addPlace, getQueues, addQueue, deleteQueue};
};
