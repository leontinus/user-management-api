// User feautures
const express = require('express')
const _ = require('lodash')
const fs = require('fs')

class userSvc {
  /**
   * GET for users information
   * @param {*} req the user id
   * @param {*} res 
   */
  async getUserInfo (req, res) {
    // reading file of users information 
    fs.readFile('./data/user.json', 'utf8', (error, data) => {
      if (error) throw error
      const user = JSON.parse(data)
      const id = _.find(user, {ID: req.params.id})

      return res.status(200).json({user: id})
    })
  }

  /**
   * GET to determine if user have access on certain feature
   * @param {*} req the user's email and feature name
   * @param {*} res 
   */
  async featureAccess (req, res) {
    // reading file of information on feature accessiblity of users
    fs.readFile('./data/featureAccess.json', 'utf8', (error, data) => {
      if (error) throw error
      const features = JSON.parse(data)
      const index = _.findIndex(
        features, 
        obj => obj.name === req.query.featureName && obj.usersWhoCanAccess.includes(req.query.email)
      )
      const obj = features[index]
  
      return res.status(200).json({canAccess: obj ? true: false})
    })
  }

  /**
   * POST function to enable user to have permission on feature
   * @param {*} req body to have featureName(string), email(string) and enable(boolean)
   * @param {*} res 
   */
  async enableUserFeature (req, res) {
    console.log('POST req: ' + JSON.stringify(req.body))
    let updated = false

    try {
      // reading the featureAccesss table
      fs.readFile('./data/featureAccess.json', 'utf-8', (error, data) => {
        if (error) throw error
        const features = JSON.parse(data)
        const index = _.findIndex(
          features,
          obj => obj.name === req.body.featureName
        )
        const obj = features[index]

        // To give access to user on the feature
        if (!obj.usersWhoCanAccess.includes(req.body.email) && req.body.enable === true) {
          obj.usersWhoCanAccess.push(req.body.email)
          updated = true
        }
        // To remove user's access on the feature 
        else if (obj.usersWhoCanAccess.includes(req.body.email) && req.body.enable === false) {
          const emailIndex = _.findIndex(
            obj,
            objEmail => objEmail.usersWhoCanAccess.includes(req.body.email)
          )
          obj.usersWhoCanAccess.splice(emailIndex, 1)
          updated = true
        }

        // update the featureAccess table
        if (updated) {
          fs.writeFile('./data/featureAccess.json', JSON.stringify(features, null, 2), (error) => {
            if (error) throw error
            console.log('Table `featureAccess` updated')
          })
        }
      })

      // reading the user table
      fs.readFile('./data/user.json', 'utf-8', (error, data) => {
        if (error) throw error
        const user = JSON.parse(data)
        const index = _.findIndex(
          user,
          obj => obj.email === req.body.email
        )
        const obj = user[index]

        // Adding on the feature name on the user's information in user table
        if (!obj.featureAccess.includes(req.body.featureName) && req.body.enable === true) {
          obj.featureAccess.push(req.body.featureName)
          updated = true
        }
        // To remove the feature on the user's information in user table
        else if (obj.featureAccess.includes(req.body.featureName) && req.body.enable === false) {
          const featureIndex = _.findIndex(
            obj,
            objFeature => objFeature.usersWhoCanAccess.includes(req.body.email)
          )
          obj.featureAccess.splice(featureIndex, 1)
          updated = true
        }

        // update the user table
        if (updated) {
          fs.writeFile('./data/user.json', JSON.stringify(user, null, 2), (error) => {
            if (error) throw error
            console.log('Table `user` updated')
          })
          return res.status(200).json()
        }
        else return res.status(304).json()
      })
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}

module.exports = userSvc