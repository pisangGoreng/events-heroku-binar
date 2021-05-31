const eventService = require('../services/eventService')

const eventController = {
  create: async (req, res) => {
    try {
      let status = 200;
      let message = 'OK';
      let data = {};

      const { data: eventCreated, error } = await eventService.create(req.body)

      res.send({
        status,
        message,
        data: eventCreated || data
      })
    } catch (error) {
      console.log("🚀 ~ file: eventController.js ~ line 22 ~ create: ~ error", error)
      res.send({ status: 500, message: 'failed', data: error })
    }
  },

  get: async (req, res) => {
    try {
      let status = 200;
      let message = 'OK';
      let data = {};

      const { data: events, error } = await eventService.get()

      res.send({
        status,
        message,
        data: events || data
      })
    } catch (error) {
      console.log("🚀 ~ file: eventController.js ~ line 22 ~ create: ~ error", error)
      res.send({ status: 500, message: 'failed', data: error })
    }
  }
}

module.exports = eventController;