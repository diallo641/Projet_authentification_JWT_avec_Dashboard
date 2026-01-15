const deconnexion = document.getElementById('deconnexion');
const ajout_utilisateur = document.getElementById('ajout_utilisateur');
const rolesMap = {
    "Admin": "6928877e23659de524c99433",
    "Manager": "6928876f23659de524c99430",
    "Client": "692897468228035cf422da1f"
};
deconnexion.addEventListener('click', () => {
    localStorage.removeItem('token');
    window.location.href="../index.html";
});

ajout_utilisateur.addEventListener('submit', async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const nom = document.getElementById('nom').value.trim();
    const prenom = document.getElementById('prenom').value.trim();
    const email = document.getElementById('email').value.trim();
    const mot_de_passe = document.getElementById('mot_de_passe').value.trim();
    const roleNom = document.getElementById('role').value;
    const roleId = rolesMap[roleNom];

    if(!nom || !prenom || !email || !mot_de_passe || !roleNom)
    {
        alert("Veuillez remplir tous les champs");
        return;
    }
    else
    {
        try {
            const response = await fetch("http://localhost:5000/api/user/ajouteruser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ nom, prenom, email, mot_de_passe, role: roleId })
        });
            const data = await response.json();
            if (!response.ok) {
                alert (data.message || "Erreur lors de l'ajout de l'utilisateur");
                return;
            }
            alert("Utilisateur ajouté avec succès !");
            window.location.href = "../pages/utilisateurs.html";        

        }
        catch(error){
            console.error("Erreur lors de l'ajout :", error);
            alert("Erreur serveur, veuillez réessayer.");
        }
    }

});