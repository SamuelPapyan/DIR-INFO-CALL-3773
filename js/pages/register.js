import {register} from '../api/auth.js';

window.addEventListener('load',async()=>{
    document.getElementById('register').addEventListener('click',async()=>{
        const username = document.querySelector('input[name="username"]').value;
        const name = document.querySelector('input[name="name"]').value;
        const email = document.querySelector('input[name="email"]').value;
        const password = document.querySelector('input[name="password"]').value;
        const form = {
            username,
            name,
            email,
            password
        };
        register(form).then(data=>{
            if(data.success === true){
                window.location.href = "/views/login.html";
            }
            else{
                document.getElementById("error-label").textContent = data.message;
            }
        }).catch(err=>{
            console.log(err.message);
        });
    });
    document.querySelector('#blog-link').addEventListener('click',(event)=>{
        event.preventDefault();
        if(window.localStorage.getItem('samvel_directory_user_token')){
            window.location.href = "/views/blog.html";
        }
        else{
            window.location.href = "/views/login.html";
        }
    });
});