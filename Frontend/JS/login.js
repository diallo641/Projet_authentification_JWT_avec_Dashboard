 const connexionForm = document.getElementById('connexion');
 const emailInput = document.getElementById('email');
 const passwordInput = document.getElementById('motdepasse');
 const messageDiv = document.getElementById('message');

 connexionForm.addEventListener('submit', async (e) => {
     e.preventDefault();
     const email = emailInput.value.trim();
     const password = passwordInput.value.trim();
     if(!email || !password){
         messageDiv.innerHTML = '<p class="text-red-500">Veuillez remplir tous les champs.</p>';
         return;
     }
     else{
        try
        {
            const response = await fetch("http://localhost:5000/apilogin/login", 
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body:JSON.stringify({
                    email: email,
                    mot_de_passe: password
                })
                
            });
            const data = await response.json();
            if(!response.ok)
            {
                messageDiv.innerHTML = `<p class="text-red-500">${data.message}</p>`;
                return;
            }
            else
            {
                messageDiv.innerHTML = `<p class="text-green-500">Connexion réussie</p>`;
                console.log('Utilisateur connecté :', data.utilisateur);
                const role = data.utilisateur.role;
                console.log("ROLE :", role);
                localStorage.setItem('token', data.token);
                console.log("TOKEN :", localStorage.getItem('token'));
                setTimeout(() => {
                    if(role === 'Admin')
                    {
                        window.location.href = "../Frontend/pages/utilisateurs.html";
                        return;
                    }
                    else if(role === 'Manager')
                    {
                        window.location.href = "../Frontend/pages/manager.html";
                        return;
                    }
                    else{
                        window.location.href = "../Frontend/pages/client.html";
                    }
        }, 5000);
            }

        }
        catch (error) {
            console.error('Erreur lors de la connexion :', error);
            messageDiv.innerHTML = '<p class="text-red-500">Une erreur est survenue. Veuillez réessayer plus tard.</p>';
        }
     }
        
 });
