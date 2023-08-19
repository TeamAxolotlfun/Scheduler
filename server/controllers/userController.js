const express = require('express');
const app = express();
app.use(express.json());

const userController = {};

userController.createUser = (req, res, next)=> {

};

userController.verifyUser = (req, res, next) => {

};

module.exports = userController;