module.exports = function(http) {
	const io = require("socket.io")(http);

	io.on("connection", function(socket) {
		socket.on("message", function(message) {
			console.log("message", message);
		});

		socket.on("getQueues", function(data) {
			database.getQueues(function(err, queues) {
				if(err) {
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