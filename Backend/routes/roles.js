const express = require('express');
const { ajouterrole, role, allroles, editerrole, deleterole } = require('../controllers/roles');
const roles = require('../models/roles');
const router = express.Router();

router.post("/ajouterrole", ajouterrole);
router.get("/role/:id", role);
router.get("/roles", allroles);
router.put("/editer/:id", editerrole);
router.delete("/delete/:id", deleterole);

module.exports=router;