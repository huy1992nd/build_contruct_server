const roomService = require('../services/room.service');

class RoomController {
  constructor() {}

  async addRoom(req, res, next) {
    let body = req.body;
    let validateInput = await this.validateInput(body, 1);
    if (!validateInput.status) {
      res.json({
        code: 1,
        message: validateInput.error_message
      });
      return;
    }

    let add_room = await roomService.addRoom(body);
    if (add_room) {
      res.json({
        code: 0,
        message: message.ADD_room_SUCCESS
      });
    } else {
      res.json({
        code: 1,
        message: message.ERROR
      });
    }
  }

  async updateRoom(req, res, next) {
    let body = req.body;
    console.log('body', body);

    if (!body.id || typeof(body.id) == "undefined") {
      res.json({
        code: 1,
        message: message.INCORRECT_DATA
      });
      return;
    }
    let validateInput = await this.validateInput(body, 1);
    if (!validateInput.status) {
      res.json({
        code: 1,
        message: validateInput.error_message
      });
      return;
    }
    let update_room = roomService.updateRoom(body);
    if (update_room) {
      res.json({
        code: 0,
        message: message.EDIT_room_SUCCESS
      });
    } else {
      res.json({
        code: 1,
        message: message.ERROR
      });
    }
  }

  async deleteRoom(req, res, next) {
    let body = req.body;
    if (!body.id || typeof(body.id) == "undefined") {
      res.json({
        code: 1,
        message: message.INCORRECT_DATA
      });
      return;
    }
    let delete_room = await roomService.deleteRoom(body.id);
    if (delete_room) {
      res.json({
        code: 0,
        message: message.DELETE_room_SUCCESS
      });
    } else {
      res.json({
        code: 1,
        message: message.ERROR
      });
    }
  }

  async getListRoom(req, res, next) {
    let query = req.query;
    let str_search = query.search || "";

    let limit = query.limit ? parseInt(query.limit) : LIMIT_DEFAULT;
    let offset = query.offset ? parseInt(query.offset) : OFFSET_DEFAULT;
    let list_room = await roomService.listRoom(str_search, limit, offset);
    if (list_room) {
      res.json({
        code: 0,
        list_room: list_room
      });
    } else {
      res.json({
        code: 1,
        message: message.ERROR
      });
    }
  }

  async validateInput(data) {
    return {
      status: true,
      error_message: ""
    }
  }
}

module.exports = new RoomController();