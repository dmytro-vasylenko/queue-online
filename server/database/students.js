const types = require("../constants").types;

module.exports = knex => {
    const queries = require("./queries")(knex);

    return {
        getStudent: async email => queries.getStudent(email)
    };
};
