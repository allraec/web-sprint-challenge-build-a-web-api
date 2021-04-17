const express = require('express');
const projectsRouter = require("./projects/projects-router");
const actionsRouter = require("./actions/actions-router");

const server = express();

server.get("/", (req, res) => {
    res.send(`<h1>API Available</h1>`);
});

server.use(express.json());
server.use("/api/projects/", projectsRouter);
//server.use(actionsRouter);

server.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({
        message: "Something went wrong"
    })
})

module.exports = server;
