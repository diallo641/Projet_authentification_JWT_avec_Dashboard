//const { head } = require("../../Backend/routes/utilisateursJWT");
const deconnexion=document.getElementById('deconnexion');
const editer = document.getElementById('edit_utilisateur');
const rolesMap = {
    "Admin": "6928877e23659de524c99433",
    "Manager": "6928876f23659de524c99430",
    "Client": "692897468228035cf422da1f"
};


deconnexion.addEventListener('click', () => {
    console.log('Déconnexion en cours...');
    localStorage.removeItem('token'); 
    window.location.href="../index.html";  
});

if (!token) {
    window.location.href = "../index.html";
}

//Fonction pour avoir l'id de l'utilisateur à éditer depuis l'URL
function utilisateurid(){
    const parametre = new URLSearchParams(window.location.search);
    return parametre.get('id');
}

//pré remplir le formulaire avec les données de l'utilisateur
async function formulaire() {
    const identifiant= utilisateurid();
    if(!identifiant){
        alert("ID utilisateur manquant dans l'URL.");
        window.location.href="utilisateurs.html";
        return;
    }
    else{
        try{
            const response = await fetch(`http://localhost:5000/api/user/User/${identifiant}`, {
                headers: {"Authorization": `Bearer ${token}` }
        });
        const data = await response.json();
        if(!response.ok){
            alert(data.message || "Impossible de récupérer les données utilisateur");
            window.location.href="utilisateurs.html";
            return;  
        }
        document.getElementById('nom').value = data.Nom;
        document.getElementById('prenom').value = data.Prénom;
        document.getElementById('email').value = data.Email;

        document.getElementById('role').value = data.Role;
        console.log(`http://localhost:5000/api/user/editer/${identifiant}`);

    }
        catch(error) {
            console.error("Erreur lors de la récupération de l'utilisateur :", error);
            alert("Erreur serveur, veuillez réessayer.");
        }
    }
}

editer.addEventListener('submit', async (e) => {
    e.preventDefault();
    const identifiant= utilisateurid(); 
    const nom = document.getElementById('nom').value.trim();
    const prenom = document.getElementById('prenom').value.trim();
    const email = document.getElementById('email').value.trim();
    const mot_de_passe=document.getElementById('mot_de_passe').value.trim()
    //const role = document.getElementById('role').value;
    const roleNom = document.getElementById('role').value;  
    const roleId = rolesMap[roleNom];
    if(!nom || !prenom || !email || !roleId){
        alert("Veuillez remplir tous les champs.");
        return;
    }
    else{
        const payload ={nom, prenom, email, role: roleId};
        if (mot_de_passe) payload.mot_de_passe = mot_de_passe;
        try{
            const response = await fetch(`http://localhost:5000/api/user/editer/${identifiant}`, {
                method: 'PUT',
                headers:{
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });
            const data = await response.json();
            if(!response.ok){
                alert(data.message || "Échec de la mise à jour de l'utilisateur.");
                return;
            }
            else{
                alert("Utilisateur modifié avec succès !");
                window.location.href = "utilisateurs.html";
            }
        }
        catch (error) {
            console.error("Erreur lors de la modification :", error);
            alert("Erreur serveur, veuillez réessayer.");  
        
    }

    }
});

//utiliser la fonction pour pré remplir le formulaire
formulaire();

