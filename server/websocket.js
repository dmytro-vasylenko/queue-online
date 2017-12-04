module.exports = http => {
    const io = require("socket.io")(http);

    io.on("connection", socket => {
        socket.on("message", message => {
            console.log("message", message);
        });

        socket.on("getQueues", data => {
            database.getQueues((err, queues) => {
                if (err) {
                    socket.emit("queues", err);
                }
                socket.emit("queues", queues);
            });
        });
    });

    return {
        socketBroadcast: (type, message) => {
            io.emit(type, message);
        }
    };
};
