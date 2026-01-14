const express = require('express');
const router = express.Router();
const auth = require('../middleware/authentification.js');
const authorizeRoles = require('../middleware/autoriseroles');

const { ajouterutilisateur, allusers, user, editer, supprimer } = require('../controllers/utilisateurs');

// Routes Admin uniquement
router.post("/ajouteruser", auth, authorizeRoles("Admin", "Manager"), ajouterutilisateur);
router.put("/editer/:id", auth, authorizeRoles("Admin"), editer);
router.delete("/supprimer/:id", auth, authorizeRoles("Admin"), supprimer);
router.get("/Users", auth, authorizeRoles("Admin", "Manager"), allusers);

// Routes Admin, Manager, Client pour consulter un profil spécifique
router.get("/User/:id", auth, authorizeRoles("Admin","Manager","Client"), user);

module.exports = router;
