const roomService = require('../services/room.service');
const define_a = require('../define');
const MESSAGE = define_a.MESSAGE;
const log = require('../utils/logger');
class RoomController {
  constructor() {}

  async addRoom(req, res, next) {
    try {
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
          message: MESSAGE.ADD_SUCCESS
        });
      } else {
        res.json({
          code: 1,
          message: MESSAGE.ERROR
        });
      }
    } catch (error) {
      res.json({
        code: 1,
        message: MESSAGE.ERROR
      });
      log.error('error', `${error.stack.toString()}`);
      console.log('error', error);
    }

  }

  async updateRoom(req, res, next) {
    try {
      let body = req.body;
      console.log('body', body);
      if (!body.id || typeof(body.id) == "undefined") {
        res.json({
          code: 1,
          message: MESSAGE.INCORRECT_DATA
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
          message: MESSAGE.EDIT_SUCCESS
        });
      } else {
        res.json({
          code: 1,
          message: MESSAGE.ERROR
        });
      }
    } catch (error) {
      res.json({
        code: 1,
        message: MESSAGE.ERROR
      });
      log.error('error', `${error.stack.toString()}`);
      console.log('error', error);
    }
  }

  async deleteRoom(req, res, next) {
    try {
      let body = req.body;
      if (!body.id || typeof(body.id) == "undefined") {
        res.json({
          code: 1,
          message: MESSAGE.INCORRECT_DATA
        });
        return;
      }
      let delete_room = await roomService.deleteRoom(body.id);
      if (delete_room) {
        res.json({
          code: 0,
          message: MESSAGE.DELETE_SUCCESS
        });
      } else {
        res.json({
          code: 1,
          message: MESSAGE.ERROR
        });
      }
    } catch (error) {
      res.json({
        code: 1,
        message: MESSAGE.ERROR
      });
      log.error('error', `${error.stack.toString()}`);
      console.log('error', error);
    }
  }

  async getListRoom(req, res, next) {
    try {
      let query = req.query;
      let str_search = query.search || "";

      let limit = query.limit ? parseInt(query.limit) : define_a.LIMIT_DEFAULT;
      let offset = query.offset ? parseInt(query.offset) : define_a.OFFSET_DEFAULT;
      let list_room = await roomService.listRoom(str_search, limit, offset);
      if (list_room) {
        res.json({
          code: 0,
          list_room: list_room
        });
      } else {
        res.json({
          code: 1,
          message: MESSAGE.ERROR
        });
      }
    } catch (error) {
      res.json({
        code: 1,
        message: MESSAGE.ERROR
      });
      log.error('error', `${error.stack.toString()}`);
      console.log('error', error);
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