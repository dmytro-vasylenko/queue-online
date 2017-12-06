const types = require("../constants").types;

module.exports = knex => {
    const queries = require("./queries")(knex);

    return {
        getTeacher: async email => queries.getTeacher(email),
        getLessons: async id => queries.getLessonsByTeacher(id)
    };
};
