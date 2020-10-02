const express = require('express')
const projectRouter = require('./data/routers/projectRouter')
const actionRouter = require('./data/routers/actionRouter')
const helmet = require('helmet')
const morgan = require('morgan');
const server = express();

const logger = morgan('combined')
//Global Middleware 
function greeter(req, res, next) {
    console.log('hello')
    next();
} 
  

server.use(express.json());
server.use(helmet());

server.use(logger);
server.use(greeter);

// EndPoints 
server.use('/api/project', projectRouter)
server.use('/api/action', actionRouter)

server.get('/', (req, res) => {
    res.status(200).json({
        hello: "hello world2",
        environment: process.env.NODE_ENV,
    })
})

server.use((error, req, res, next) => { 
    res.status(error.code).json({message: "Error:", error})
    });
  
module.exports = server;