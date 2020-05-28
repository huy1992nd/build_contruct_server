const Room = require('../models').Room;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
class roomService {

  addRoom(input) {
    return new Promise((resolve, reject) => {
      try {
        let room_create = {
          name: input.name,
          creator: input.creator
        };
        Room.create(room_create)
          .then(room => {
            resolve(room)
          })
          .catch(err => {
            reject(err)
          });
      } catch (error) {
        reject(error);
      }

    })
  }

  updateRoom(input) {
    return new Promise((resolve, reject) => {
      try {
        let id = input.id;
        let data_update = {
          name: input.name,
          creator: input.creator
        };
        Room.update(
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

  deleteRoom(id) {
    return new Promise((resolve, reject) => {
      try {
        Room.update({
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

  listRoom(str_search, limit, offset) {
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
        Room.findAll(options)
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
        Room.findOne({
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

module.exports = new roomService();