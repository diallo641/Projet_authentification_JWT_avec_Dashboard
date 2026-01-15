//const token = localStorage.getItem('token');
const contenu = document.getElementById('table_utilisateurs');
const deconnexion=document.getElementById('deconnexion');
const taille=document.getElementById('taille');

//Fonction pour se deconnecter
deconnexion.addEventListener('click', () => {
    console.log('Déconnexion en cours...', token);
    localStorage.removeItem('token');
    setTimeout(() => {
            window.location.href="../index.html";
        }, 5000);
    //window.location.href="../index.html";
});

//afficher message 
function affichermessage(msg){
    contenu.innerHTML = `<tr><td colspan="6" class="text-center text-red-500 font-bold">${msg}</td></tr>`;
}

//Fonction pour afficher la liste des utilisateurs
async function afficherutilisateurs(){
    if(!token){
        affichermessage("Token invalide ou manquant");
        return;
    }
    try{
        const response = await fetch("http://localhost:5000/api/user/Users", {
            method:"GET",
            headers:{"Authorization": `Bearer ${token}`}
        });
        const data = await response.json();
        if(!response.ok){
            affichermessage("Accès refusé : vous n'avez pas les droits pour voir cette page.");
            return;
        }
        if(!data.Users || data.Users.length === 0){
            contenu.innerHTML = `<p class="text-center text-red-500 font-bold">Aucun utilisateur trouvé.</p>`;
            return;
        }
        contenu.innerHTML = '';
        taille.innerHTML=`${data.Taille}`;
        data.Users.forEach(utilisateur => {
            const row=document.createElement('tr');
            row.innerHTML=` 
                               <td class="border px-3 py-2 text-sm sm:text-base">${utilisateur.nom}</td>
                               <td class="border px-3 py-2 text-sm sm:text-base">${utilisateur.prenom}</td>
                               <td class="border px-3 py-2 text-sm sm:text-base hidden md:table-cell">${utilisateur.email}</td>
                               <td class="border px-4 py-2 hidden md:table-cell">${new Date(utilisateur.createdAt).toLocaleDateString()}</td>
                              <td class="border px-4 py-2 hidden md:table-cell">${new Date(utilisateur.updatedAt).toLocaleDateString()}</td>
                              
            `;
            contenu.appendChild(row);

        });
     
    }
    catch(error){
        console.error("Erreur lors de la récupération des utilisateurs :", error);
        affichermessage();
    }
}
afficherutilisateurs();