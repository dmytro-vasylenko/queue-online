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

    server.post("/api/queue", async (req, res) => {
        const {google_token, type_lesson, lesson, group_id, date, class_room, sub_queue} = req.body;
        if (!google_token || !type_lesson || !lesson || !group_id || !date || !class_room) {
            return res.sendStatus(400);
        }

        const user = await auth.getUser(google_token);
        if (!user) {
            return res.send({error: "Bad token"});
        }

        const teacher = await database.Teachers.getTeacher(user.email);
        if (!teacher) {
            return res.send({error: "You are not a teacher"});
        }

        const queueId = await database.Queues.addQueue({
            type_lesson,
            lesson,
            group_id,
            date,
            class_room,
            sub_queue
        });

        if (!queueId) {
            return res.send({error: "Some error"});
        }

        return res.sendStatus(200);
    });

    server.delete("/api/queue", (req, res) => {
        let data = req.body;
        if (!data) {
            return res.sendStatus(400);
        }

        database.Queues.deleteQueue(data);
        return res.sendStatus(200);
    });

    server.get("/api/whois", async (req, res) => {
        const {google_token} = req.query;
        const user = await auth.getUser(google_token);
        if (!user) {
            return res.send({error: "Bad token"});
        }

        const student = await database.Students.getStudent(user.email);
        if (!student) {
            const teacher = await database.Teachers.getTeacher(user.email);
            if (!teacher) {
                console.log("not user");
                return res.send("not user");
            }
            console.log("teacher");
            return res.send("teacher");
        } else {
            console.log("student");
            return res.send("student");
        }
    });

    server.get("/api/lessons-types", async (req, res) => {
        const types = await database.Lessons.getLessonsTypes();
        return res.send(types);
    });

    server.get("/api/teacher-lessons", async (req, res) => {
        const {google_token} = req.query;
        const user = await auth.getUser(google_token);
        if (!user) {
            return res.send({error: "Bad token"});
        }

        const teacher = await database.Teachers.getTeacher(user.email);

        const lessons = await database.Teachers.getLessons(teacher.id);
        return res.send(lessons);
    });

    server.get("/api/lesson-groups", async (req, res) => {
        const {lesson} = req.query;

        const groups = await database.Groups.getGroupsByLesson(lesson);
        return res.send(groups);
    });
};
