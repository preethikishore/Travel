
let signinForm =  document.querySelector('.sign-in-form');
let registerForm = document.querySelector('.register-form');
signinForm.addEventListener('submit',function(e)
{
    e.preventDefault();
    let email = document.getElementById("sign-in-email").value;
    let password = document.getElementById("sign-in-password").value;
    fetch('http://localhost:3000/users/login',
    {
        method: 'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({ email, password})
}).then((resp) => {
    if(resp.status === 404) {
      
        throw new Error();
    }
    return resp.json();
}).then((data) => {
    window.location.href = data.redirectURL;
}).catch(() => alert('Wrong email or password'));
})



registerForm.addEventListener('submit', function(e)
{
    e.preventDefault();
    let email = document.getElementById('register-email').value;
    let password = document.getElementById('register-password').value;
    let repassword = document.getElementById('register-re-password').value;
     if(password !== repassword)
     {
         return;
     }
    fetch('http://localhost:3000/users/register' , {
        method: 'POST',
        headers:
        {
            'Content-Type': 'application/json'
        } ,
        body:JSON.stringify({email,password})
          
      }).then((resp) => resp.text()).then((data) => alert(data));


})