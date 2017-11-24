const express = require("express");
const server = express();
const bodyPareser = require("body-parser");

const http = require("http").Server(server);
const ws = require("./ws")(http);
const config = require("./config");

server.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
server.use(bodyPareser.json());
server.use(bodyPareser.urlencoded({extended: false}));
server.use(express.static("public"));

server.get("/", (req, res) => {
    res.sendFile("index.html");
});

require("./routes/")(server);

http.listen(config.PORT, () => {
    console.log(`Server started at port ${config.PORT}`);
});
