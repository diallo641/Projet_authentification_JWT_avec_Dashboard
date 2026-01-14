const mongoose = require('mongoose');
const utilisateurModel = require('../models/utilisateurs');
const roleModel = require("../models/roles");

//Ajouter un utilisateur
module.exports.ajouterutilisateur = async(req, res) =>
{
    const {nom, prenom, email, mot_de_passe, role} =req.body;
    try
    {
        if(!nom || !prenom || !email || !mot_de_passe || !role)
        {
            return res.status(400).json({message: "Aucun champ ne doit etre vide"})
        }
        else
        {
            const emailunique = await utilisateurModel.findOne({email})
            if(emailunique)
            {
                return res.status(400).json({message: "l'email existe deja"})
            }
            else
            {
                const roleexistant = await roleModel.findById(role)
                if(!roleexistant)
                {
                    return res.status(404).json({message: "Le role n'existe pas"})
                }
                else
                {
                    const nouveautilisateur = await utilisateurModel.create(req.body)
                    const utilisateurcreer = await utilisateurModel.findById(nouveautilisateur._id).populate("role")
                    console.log("Utilisateur creé avec succés sur la base de données");
                    return res.status(201).json({message: "User creer avec succés!",
                                                 Nom: utilisateurcreer.nom,
                                                 Prénom: utilisateurcreer.prenom,
                                                 Email: utilisateurcreer.email,
                                                 Role: utilisateurcreer.role.nom
                    });
                }
            }
        }

    }
    catch(err){
        console.error("Erreur serveur :", err);
        return res.status(500).json({ message: "Erreur interne du serveur" });
    }
};

//La liste des utilisateurs
module.exports.allusers = async(req, res) =>
{
    const listeusers = await utilisateurModel.find().populate('role', 'nom description');
    if(listeusers.length==0)
    {
        return res.status(200).json({message: "Liste des utilisatuers vide"})
    }
    else
    {
        return res.status(200).json({message: "Voici la liste des utilisateurs",
                                     Taille: listeusers.length,
                                     Users: listeusers
        })
    }
};
//Un seul utilisateur
module.exports.user = async(req, res) =>
{
    const id = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(id))
    {
        return res.status(400).json({message: "Id invalide"})
    }
    else
    {
        try
        {
            const utilisateurexistant = await utilisateurModel.findById(id).populate("role", "nom description");
            if(!utilisateurexistant)
            {
                return res.status(404).json({message: "Utilisateur non existant"})
            }
            else
            {
                return res.status(201).json({message: "Utilisateur modifié avec succés",
                                           Nom: utilisateurexistant.nom,
                                           Prénom: utilisateurexistant.prenom,
                                           Email: utilisateurexistant.email,
                                           Role: utilisateurexistant.role.nom,
                                           Description: utilisateurexistant.role.description,
                                           Date_création: utilisateurexistant.createdAt


                });
            }

        }
        catch(err){
        console.error("Erreur serveur :", err);
        return res.status(500).json({ message: "Erreur interne du serveur" });
    }
    }
};

//Modifier un user
module.exports.editer = async(req, res) =>
{
    const id = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(id))
    {
        return res.status(400).json({message: "Id invalide"})
    }
    else
    {
        try
        {
            const utilisateurexistant = await utilisateurModel.findById(id);
            if(!utilisateurexistant)
            {
                return res.status(404).json({message: "Utilisateur non existant"})
            }
            else
            {
                const emailDejaPris = await utilisateurModel.findOne({email: req.body.email,_id: { $ne: id } });
                if(emailDejaPris)
                {
                    return res.status(400).json({message: "Email existe déja"})
                }
                else
                {
                    const role = await roleModel.findById(req.body.role);
                    if(!role)
                    {
                        return res.status(404).json({message: "Role non existant"})
                    }
                    else
                    {
                        const utilisateuramodifier = await utilisateurModel.findByIdAndUpdate(id, req.body, {new: true})
                return res.status(200).json({message: "Utilisateur modifié avec succés",
                                           Nom: utilisateuramodifier.nom,
                                           Prénom: utilisateuramodifier.prenom,
                                           Email: utilisateuramodifier.email,
                                           Role: utilisateuramodifier.role.nom


                });
                    }
                }
                 
                
            
               
            }

        }
        catch(err){
        console.error("Erreur serveur :", err);
        return res.status(500).json({ message: "Erreur interne du serveur" });
    }
    }
};

//Supprimer un user

module.exports.supprimer = async(req, res) =>
{
    const id = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(id))
    {
        console.log("Mauvais Identifiant")
        return res.status(400).json({message: "Id Invalide"});
    }
    else
    {
        try
        {
            const chercheruse = await utilisateurModel.findById(id);
            if(!chercheruse)
            {
                console.log("non existant")
                return res.status(404).json({message: "utilisateur non existant"})
            }
            else
            {
                await utilisateurModel.findByIdAndDelete(id);
                console.log("User supprimé avec succés");
                return res.status(200).json({message: "utilisatuer supprimé avec succés"})
            }

        }
        catch(err){
        console.error("Erreur serveur :", err);
        return res.status(500).json({ message: "Erreur interne du serveur" });
    }
    }
}