//const token = localStorage.getItem('token');
const contenu = document.getElementById('table_utilisateurs');
const deconnexion=document.getElementById('deconnexion');
const taille=document.getElementById('taille');

const rechercher = document.getElementById('recherche');




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
            row.innerHTML=`   <td class="border px-3 py-2 text-sm sm:text-base">${utilisateur._id}</td>
                               <td class="border px-3 py-2 text-sm sm:text-base">${utilisateur.nom}</td>
                               <td class="border px-3 py-2 text-sm sm:text-base">${utilisateur.prenom}</td>
                               <td class="border px-3 py-2 text-sm sm:text-base hidden md:table-cell">${utilisateur.email}</td>
                               <td class="border px-3 py-2 text-sm sm:text-base hidden md:table-cell">${utilisateur.role.nom}</td>
                              <td class="border px-3 py-2 text-center space-x-2 hidden md:table-cell">
                              <a href="editerutilisateur.html?id=${utilisateur._id}"><button class="bg-yellow-500 text-white px-2 py-1 rounded">Éditer</button></a>
                              <button class="btnSupprimer bg-red-500 text-white px-2 py-1 rounded">Supprimer</button>
                              </td>
                              <td class="border px-4 py-2 hidden md:table-cell">${new Date(utilisateur.updatedAt).toLocaleDateString()}</td>
                              
            `;
            contenu.appendChild(row);
            //Écouter les clics sur les boutons de suppression
            const btnSupprimer = row.querySelector("button.btnSupprimer");
            btnSupprimer.addEventListener('click', () => {
                supprimerutilisateur(utilisateur._id, row);

            });

        });
     
    }
    catch(error){
        console.error("Erreur lors de la récupération des utilisateurs :", error);
        affichermessage();
    }
}

//Utiliser la fonction pour afficher les utilisateurs au chargement de la page
afficherutilisateurs();

//fonction pour supprimer un utilisateur
async function supprimerutilisateur(userid, ligne){
    if(!confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")){
        return;
    }
    else{
        try{
            const response = await fetch(`http://localhost:5000/api/user/supprimer/${userid}`, {
                method: "DELETE",
                headers: { "Authorization": `Bearer ${token}` }
            });
            const data = await response.json();
            if(!response.ok){
                alert(data.message || "Erreur lors de la suppression");
                return;
            }
            else{
                alert("Utilisateur supprimé avec succès !");
                ligne.remove();
                const currentTaille = parseInt(taille.innerText);
                taille.innerText = currentTaille - 1;
            }

        }
        catch(error){
            console.error(error);
            alert("Erreur serveur, veuillez réessayer.");
        }
    }
};


//Fonction de recherche d'utilisateurs et mise à jour de la liste affichée

rechercher.addEventListener('input', () => {
  const mot = rechercher.value.toLowerCase();
  const lignes = contenu.querySelectorAll('tr');
  let compteur = 0;

  lignes.forEach(ligne => {
    const texte = ligne.innerText.toLowerCase();

    if (texte.includes(mot)) {
      ligne.style.display = "";
      compteur++;
      taille.innerText = compteur;
    } else {
      ligne.style.display = "none";
    }
  });
});
