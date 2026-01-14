const mongoose = require('mongoose');
const roleModel = require("../models/roles");

//Ajouter un role
module.exports.ajouterrole = async(req, res) =>
{
    try
    {
        const {nom, description} = req.body;
        if(!nom || !description)
        {return res.status(400).json({message: "Aucun champs ne doit etre vide"})}
        else
        {
            const nomunique = await roleModel.findOne({nom : req.body.nom})
            if(nomunique)
            {
                return res.status(404).json({message: "Le nom du role existe déja"})
            }
            else
            {
                const nouveaurole = await roleModel.create(req.body)
                return res.status(201).json({message: "Role creer avec succés! ",
                 Nom: nouveaurole.nom,
                 description: nouveaurole.description,
                 Date_creation: nouveaurole.createdAt
                })   
            }
            
        }

    }
    catch(err){
        console.error("Erreur serveur :", err);
        return res.status(500).json({ message: "Erreur interne du serveur" });
    }
};

//Un role
module.exports.role = async(req, res) =>
{
    const idrole= req.params.id;
    if(!mongoose.Types.ObjectId.isValid(idrole))
    {return res.status(400).send({message: "Id invalide"})}
    else
    {
        try
        {
            const rolechercher = await roleModel.findById(idrole)
            if(!rolechercher)
            {
                console.log("role non trouvé");
                return res.status(404).json({message: "Le role chercher n'existe pas dans la base de sonnée de notre site"})
            }
            else
            {
                return res.status(200).json({message: "Voici le role que vous cherchez: ",
                                             Nom: rolechercher.nom,
                                             Description: rolechercher.description,
                                             Date: rolechercher.createdAt
                })
            }

        }
        catch(err){
        console.error("Erreur serveur :", err);
        return res.status(500).json({ message: "Erreur interne du serveur" });
    }
    }
};

//Tous les roles
module.exports.allroles= async(req, res) =>
{
    try
    {
        const listerole = await roleModel.find();
        if(listerole.length==0)
        {
            return res.status(200).send({message: "pas de role existant sur la base"});
        }
        else
        {
            return res.status(200).send({message: "voici la liste: ", 
                                         taille: listerole.length,
                                         Roles: listerole
                                
            })
        }

    }
    catch(err){
        console.error("Erreur serveur :", err);
        return res.status(500).json({ message: "Erreur interne du serveur" });
    }
};

//modifier un role
module.exports.editerrole = async(req, res) =>
{
    const id = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(id))
    {
        return res.status(400).json({message: "Identifiant invalide"})
    }
    else
    {
        try
        {
            const roleachercher = await roleModel.findById(id);
            if(!roleachercher)
            {
                return res.status(404).send({message: "Role que vous avez demandé pour modification n'existe pas"})
            }
            else
            {
               
                const roleaediter = await roleModel.findByIdAndUpdate(id, req.body, {new: true})
                return res.status(201).json({message: "Role modifier avec succés",
                                             Nom: roleaediter.nom,
                                             Description: roleaediter.description,
                                             Date_Modification: roleachercher.updatedAt

                })
            }

        }
        catch(err){
        console.error("Erreur serveur :", err);
        return res.status(500).json({ message: "Erreur interne du serveur" });
    }

    }
};

//Supprimer
module.exports.deleterole = async(req, res) =>
{
    const id= req.params.id;
    if(!mongoose.Types.ObjectId.isValid(id))
    {
        return res.status(400).json({message: "ID non identifié"})
    }
    else
    {
        try
        {
            const roleexistant = await roleModel.findById(id);
            if(!roleexistant)
            {
                return res.status(404).json({message: "Mauvaise requete"})
            }
            else
            {
                const suppression= await roleModel.findByIdAndDelete(id)
                return res.status(200).send("Suppression avec succés!", suppression.nom);
            }

        }
        catch(err){
        console.error("Erreur serveur :", err);
        return res.status(500).json({ message: "Erreur interne du serveur" });
    }
    }

}

