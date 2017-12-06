const types = require("../constants").types;

module.exports = knex => {
    const queries = require("./queries")(knex);

    return {
        getLessonsTypes: () => queries.getLessonsTypes()
    };
};
