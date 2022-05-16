const express = require('express');
const routes = express.Router();

const UserController = require('./controllers/UserController');
const ProjectController = require('./controllers/ProjectController');


routes.get('/users', UserController.index)
    .get('/users/:id', UserController.getById)
    .post('/users', UserController.create)
    .put('/users/:id', UserController.update)
    .delete('/users/:id', UserController.delete)
    //projects
    .get('/projects', ProjectController.index)
    .post('/projects', ProjectController.create)


module.exports = routes