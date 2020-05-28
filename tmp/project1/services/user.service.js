const User = require('../models').User;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
class userService {

  addUser(input) {
    return new Promise((resolve, reject) => {
      try {
        let user_create = {
          age: input.age,
          name: input.name,
          roomId: input.roomId,
          creator: input.creator
        };
        User.create(user_create)
          .then(user => {
            resolve(user)
          })
          .catch(err => {
            reject(err)
          });
      } catch (error) {
        reject(error);
      }

    })
  }

  updateUser(input) {
    return new Promise((resolve, reject) => {
      try {
        let id = input.id;
        let data_update = {
          age: input.age,
          name: input.name,
          roomId: input.roomId,
          creator: input.creator
        };
        User.update(
            data_update, {
              where: {
                id
              }
            }
          )
          .then(result =>
            resolve(true)
          )
          .catch(err =>
            reject(err)
          )
      } catch (error) {
        reject(error);
      }
    })
  }

  deleteUser(id) {
    return new Promise((resolve, reject) => {
      try {
        User.update({
            deleted: 1
          }, {
            where: {
              id
            }
          })
          .then(result =>
            resolve(true)
          )
          .catch(err =>
            reject(err)
          )
      } catch (error) {
        reject(error);
      }
    })
  }

  listUser(str_search, limit, offset) {
    return new Promise((resolve, reject) => {
      try {
        let options = {
          where: {
            deleted: 0
          }
        };
        if (str_search) {
          options = {
            offset: offset,
            limit: limit,
            where: {
              deleted: 0
            }
          };
        }
        User.findAll(options)
          .then(result => {
            resolve(result)
          })
          .catch(err => {
            console.log('err', err);
            reject(err)
          });
      } catch (error) {
        reject(error);
      }
    })
  }

  checkDuplicate(name, id = null) {
    return new Promise((resolve, reject) => {
      try {
        let where = {
          name: name,
          deleted: 0
        }
        if (id) {
          where["id"] = {
            [Op.notIn]: [id]
          }
        }
        User.findOne({
            where: where
          })
          .then(result => {
            if (result) {
              resolve(true);
            } else {
              resolve(false);
            }
          })
          .catch(err => {
            reject(err);
          });
      } catch (error) {
        reject(error);
      }
    })
  }
}

module.exports = new userService();