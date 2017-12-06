const types = require("../constants").types;

module.exports = knex => {
    const queries = require("./queries")(knex);

    return {
        getTeacher: email => queries.getTeacher(email),
        getLessons: id => queries.getLessonsByTeacher(id),
        getQueues: id => queries.getQueuesByTeacher(id)
    };
};
