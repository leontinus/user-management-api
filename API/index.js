const express = require('express')
const app = express()
const user = require('../routes/user.route')

app.use(express.urlencoded({extended: true}))
app.use(express.json())

/**
 * GET user information based on ID
 */
app.get('/user/:id', user)

/**
 * Checking whether user have access on a certain feature
 */
app.get('/feature', user)

/**
 * POST function to give feature's access to user 
 */
app.post('/feature', user)

module.exports = app