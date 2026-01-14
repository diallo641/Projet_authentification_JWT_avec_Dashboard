const express = require('express');
const { ajouterrole, role, allroles, editerrole, deleterole } = require('../controllers/roles');
const roles = require('../models/roles');
const { login } = require('../controllers/login');
const router = express.Router();

router.post("/login", login);
module.exports=router;