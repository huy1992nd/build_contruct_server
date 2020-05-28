var express = require('express');
const RoomController = require('../controllers/roomController');
class roomRouter {
  constructor() {
    this.router = express.Router();
    this.initRouter();
  }

  initRouter() {
    this.router.post('', (req, res, next) => RoomController.addRoom(req, res, next));
    this.router.put('', (req, res, next) => RoomController.updateRoom(req, res, next));
    this.router.delete('', (req, res, next) => RoomController.deleteRoom(req, res, next));
    this.router.get('', (req, res, next) => RoomController.getListRoom(req, res, next));
  }
}

module.exports = new roomRouter().router;