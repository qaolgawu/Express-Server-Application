const router = require('express').Router()
const userRouter = require('./User')

router.use('/user', userRouter)

module.exports = router
