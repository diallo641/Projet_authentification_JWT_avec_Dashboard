const express = require('express');
const { ajouterutilisateur, allusers, user, editer, supprimer } = require('../controllers/utilisateurs');
const router=express.Router();

router.post("/ajouteruser", ajouterutilisateur);
router.get("/Users", allusers);
router.get("/User/:id", user);
router.put("/editer/:id", editer);
router.delete("/supprimer/:id", supprimer);

module.exports= router;