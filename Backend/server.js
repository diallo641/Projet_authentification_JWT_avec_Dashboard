const express = require('express');
const app = express();
const path = require('path');
const port =5000;
const connexionDB= require("./config/basededonnees");
const cors = require("cors");
app.use(cors());


//Middleware 
app.use(express.json());
app.use(express.urlencoded({extended:false}));

connexionDB();

//Utiliser les endpoints
app.use("/APIRole", require('./routes/roles'));
app.use("/api/user", require("./routes/utilisateurs"));
app.use("/apilogin", require("./routes/login"));


//Ecouteur avec le port
app.listen(port ,() => console.log("le serveur pour l'API authentification ave un dasboard a demaré aevc succés! et le port utilisé est :"+ port));


