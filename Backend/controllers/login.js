const mongoose = require('mongoose');
const roleModel = require("../models/roles");
const express = require('express');
const jwt = require('jsonwebtoken');
const utilisateurModel = require('../models/utilisateurs');

const JWT_SECRET = process.env.JWT_SECRET ; // Remplacez par une clé secrète sécurisée


module.exports.login = async(req, res) => {
    const { email, mot_de_passe } = req.body;

    if (!email || !mot_de_passe) {
        return res.status(400).json({ message: "Email et mot de passe requis" });
    }

    try {
        const utilisateur = await utilisateurModel.findOne({ email }).populate('role');

        if (!utilisateur || utilisateur.mot_de_passe !== mot_de_passe) {
            return res.status(401).json({ message: "Email ou mot de passe incorrect" });
        }

        const token = jwt.sign(
            {
                id: utilisateur._id,
                email: utilisateur.email,
                role: utilisateur.role.nom
            },
            JWT_SECRET,
            { expiresIn: '8h' }
        );

        return res.status(200).json({
            message: "Connexion réussie",
            utilisateur: {
                id: utilisateur._id,
                nom: utilisateur.nom,
                prenom: utilisateur.prenom,
                email: utilisateur.email,
                role: utilisateur.role.nom
            },
            token
        });

    } catch (err) {
        console.error("Erreur serveur login :", err);
        return res.status(500).json({ message: "Erreur interne du serveur" });
    }
};