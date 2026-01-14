const mongoose = require('mongoose');
require('dotenv').config();
 const connexion = async () =>
 {
    try
    {
        mongoose.set('strictQuery', false)
        await mongoose.connect(process.env.URL_CONNEXION)
        console.log("✅ Base de données connectée et démarrée avec succès !");
    }
    catch(err){
        console.log(err);
        process.exit();
        }
 };

 module.exports=connexion;