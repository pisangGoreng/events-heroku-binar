const jwt = require('jsonwebtoken')
const joi = require('joi')

const tokenMiddleware = {
  verifyToken: async (req, res, next) => {
    try {
      const token = req.headers.authorization
      const schema = joi.object({
        authorization: joi.string().required()
      })
      .options({ abortEarly: false })

      const validate = await schema.validate({ authorization: token })

      if(validate.error) {
        res.send({
          status: 500,
          message: 'missing token',
          data: validate.error.details
        })
      }

      const decodedToken = await jwt.verify(token, 'secret_key')
      req.body.decodedToken = decodedToken

      next()
    } catch (error) {
      console.log("🚀 ~ file: tokenMiddleware.js ~ line 28 ~ verifyToken: ~ error", error)
      res.send({
        status: 500,
        message: 'invalid token',
        data: error
      })
    }
  }
}

module.exports = tokenMiddleware