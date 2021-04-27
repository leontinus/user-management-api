// Routing the oncoming requests
const express = require('express')
const router = express.Router()

const user = require('../service/user.svc')
const userService = new user()

/**
 * GET to retrieve user information
 */
router.get('/user/:id', userService.getUserInfo)

/**
 * GET to retrieve if user has access on certain features 
 */
router.get('/feature', userService.featureAccess)

/**
 * POST route to the function 
 */
router.post('/feature', userService.enableUserFeature)

module.exports = router