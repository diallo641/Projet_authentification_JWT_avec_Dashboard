const token =localStorage.getItem('token');
if(!token)
{
    window.location.href="../index.html";
}
else{
    try{
        const payload = JSON.parse(atob(token.split('.')[1]));
        const role=payload.role;

        const pagerole=document.body.getAttribute('data-role');
        if(role !=pagerole)
        {
            window.location.href="../index.html";
        }

    }
    catch(error){
        console.error("Token invalide ou corrompu", error);
        localStorage.removeItem('token');
        window.location.href="../index.html";
    }
}