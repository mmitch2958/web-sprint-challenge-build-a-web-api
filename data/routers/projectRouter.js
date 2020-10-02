
const express = require('express');
const Project = require('../helpers/projectModel')
const router = express.Router();

router.use((req, res, next) => {
    console.log('Project Router');
    next();
})

router