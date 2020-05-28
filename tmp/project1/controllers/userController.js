const userService = require('../services/user.service');

class UserController {
  constructor() {}

  async addUser(req, res, next) {
    let body = req.body;
    let validateInput = await this.validateInput(body, 1);
    if (!validateInput.status) {
      res.json({
        code: 1,
        message: validateInput.error_message
      });
      return;
    }

    let add_user = await userService.addUser(body);
    if (add_user) {
      res.json({
        code: 0,
        message: message.ADD_user_SUCCESS
      });
    } else {
      res.json({
        code: 1,
        message: message.ERROR
      });
    }
  }

  async updateUser(req, res, next) {
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
    let update_user = userService.updateUser(body);
    if (update_user) {
      res.json({
        code: 0,
        message: message.EDIT_user_SUCCESS
      });
    } else {
      res.json({
        code: 1,
        message: message.ERROR
      });
    }
  }

  async deleteUser(req, res, next) {
    let body = req.body;
    if (!body.id || typeof(body.id) == "undefined") {
      res.json({
        code: 1,
        message: message.INCORRECT_DATA
      });
      return;
    }
    let delete_user = await userService.deleteUser(body.id);
    if (delete_user) {
      res.json({
        code: 0,
        message: message.DELETE_user_SUCCESS
      });
    } else {
      res.json({
        code: 1,
        message: message.ERROR
      });
    }
  }

  async getListUser(req, res, next) {
    let query = req.query;
    let str_search = query.search || "";

    let limit = query.limit ? parseInt(query.limit) : LIMIT_DEFAULT;
    let offset = query.offset ? parseInt(query.offset) : OFFSET_DEFAULT;
    let list_user = await userService.listUser(str_search, limit, offset);
    if (list_user) {
      res.json({
        code: 0,
        list_user: list_user
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

module.exports = new UserController();