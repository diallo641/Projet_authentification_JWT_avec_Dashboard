const mongoose = require('mongoose');

const utilisateurSchema= mongoose.Schema(
    {
        nom: 
        {
            type: String,
            trim: true,
            required: true
        },
        prenom: 
        {
            type: String,
            trim: true,
            required: true
        },
        email:
        {
            type: String,
            trim: true,
            required: true,
            unique: true
        },
        mot_de_passe:
        {
            type: String,
            trim: true,
            required: true
        },
        role:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Roles",
            required: true
        }
    },
    {timestamps: true}
);

module.exports= mongoose.model("Utilisateurs", utilisateurSchema);