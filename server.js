const express = require('express')
const projectRouter = require('./data/routers/projectRouter')
const actionRouter = require('./data/routers/actionRouter')
const helmet = require('helmet')

const server = express();

server.use(express.json());
server.use(helmet());

server.use(logger);
server.use('/api/project', projectRouter)
server.use('/api/action', actionRouter)

server.get('/', (req, res) => {
    res.status(200).json({
        hello: "hello world2",
        environment: process.env.NODE_ENV,
    })
})


module.exports = server;