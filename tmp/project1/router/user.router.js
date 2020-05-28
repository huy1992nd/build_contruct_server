var express = require('express');
const UserController = require('../controllers/userController');
class userRouter {
    constructor() {
        this.router = express.Router();
        this.initRouter();
    }

    initRouter() {
        this.router.post('', (req, res, next) => UserController.addUser(req, res, next));
        this.router.put('', (req, res, next) => UserController.updateUser(req, res, next));
        this.router.delete('', (req, res, next) => UserController.deleteUser(req, res, next));
        this.router.get('', (req, res, next) => UserController.getListUser(req, res, next));
    }
}

module.exports = new userRouter().router;
