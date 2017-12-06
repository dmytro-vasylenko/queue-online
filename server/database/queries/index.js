module.exports = knex => ({
    getQueues: async () =>
        await knex("Queues")
            .select(
                "date",
                "class_room",
                "Queues.id",
                {lessonName: "Lessons.name"},
                {lessonShortName: "Lessons.short_name"},
                {lessonType: "Lessons_Types.name"},
                {group: "Groups.code"}
            )
            .where({
                is_main: 1
            })
            .innerJoin("Lessons", "Queues.lesson", "Lessons.id")
            .innerJoin("Lessons_Types", "Queues.type_lesson", "Lessons_Types.id")
            .innerJoin("Groups", "Queues.group_id", "Groups.id"),

    getStudentsByQueueId: async queueId =>
        await knex("Places")
            .select("Students.*")
            .innerJoin("Students", "Students.id", "Places.student")
            .where({queue: queueId}),

    getStudent: async email =>
        (await knex("Students")
            .select()
            .where({email}))[0],

    getTeacher: async email =>
        (await knex("Teachers")
            .select()
            .where({email}))[0],

    addStudentToQueue: async ({queue, student}) => await knex("Places").insert({queue, student}),

    isStudentInQueue: async (queue, student) =>
        (await knex("Places")
            .select()
            .where({queue, student}))[0],

    removePlace: async ({id, user}) =>
        await knex("Places")
            .where({queue: id})
            .whereIn("student", function() {
                this.select("id")
                    .from("Students")
                    .where({email: user.email});
            })
            .del(),

    getLessonsTypes: async () => await knex("Lessons_Types").select(),

    getLessonsByTeacher: async teacher =>
        await knex("Teachers_Lessons")
            .select("Lessons.name", "Lessons.short_name", "Lessons.id")
            .innerJoin("Lessons", "Lessons.id", "Teachers_Lessons.lesson")
            .where({teacher}),

    getGroupsByLesson: async lesson =>
        await knex("Groups_Lessons")
            .select("Groups.code", "Groups.id")
            .innerJoin("Groups", "Groups.id", "Groups_Lessons.group_id")
            .where({lesson}),

    addQueue: async data =>
        await knex("Queues")
            .insert(data)
            .returning("id"),

    getQueuesByTeacher: async id =>
        await knex("Teachers_Lessons")
            .select("Queues.*")
            .innerJoin("Queues", "Queues.lesson", "Teachers_Lessons.lesson")
            .where({teacher: id})
});
