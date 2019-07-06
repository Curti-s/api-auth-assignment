const Task = require("../models").task;

module.exports = {
  tasks: async (req, res, next) => {
    let limit = 5; // records per page
    let offset = 0;

    await Task.findAll({ limit, offset })
      .then(task => {
        return res.status(200).json(task);
      })
      .catch(error => console.log(error));
  }
};
