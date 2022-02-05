import {login} from '../api/auth.js';

window.addEventListener('load',async()=>{
    const token = window.localStorage.getItem('samvel_directory_user_token');
    if(token){
        window.location.href = "/views/index.html"
    }
    document.getElementById('login').addEventListener('click',async()=>{
        const username = document.querySelector('input[name="username"]').value;
        const password = document.querySelector('input[name="password"]').value;
        console.log({
            username,password
        });
        login(username, password).then(data=>{
            if(data.success === true){
                window.localStorage.setItem('samvel_directory_user_token',data.data);
                window.location.href = window.localStorage.getItem('samvel_directory_return_url');
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