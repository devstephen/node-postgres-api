const express = require('express');
const {
  createOrganization,
  getOrganizations,
} = require('../controllers/org.controller');
const checkAuth = require('../middleware/auth')


const router = express.Router()


router.get('/', checkAuth, getOrganizations)

router.post('/', checkAuth, createOrganization)

module.exports = router