 import {login} from '../api/auth.js';

window.addEventListener('load',async()=>{
    const token = window.localStorage.getItem('samvel_directory_user_token');
    if(token){
        window.location.href = "/views/index.html"
    }
    document.getElementById('login').addEventListener('click',async()=>{
        const username = document.querySelector('input[name="username"]').value;
        const password = document.querySelector('input[name="password"]').value;
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

    const hcmToogle = document.querySelector('#hcm-switch');

    const setHighContrastMode = (change)=>{
        const menuItems = [...document.querySelectorAll('#menu .col1 a'),
            ...document.querySelectorAll('#menu .col2 a'),
            ...document.querySelectorAll('#menu .col3 a')];
        const menu = document.querySelector('#menu');
        const h2 = document.querySelector('#login-form h2');
        const labels = [...document.querySelectorAll('#login-form label')];
        const registerBtn = document.querySelector('#login');
        const spanText = document.querySelector('#login-form span');
        const spanLink = document.querySelector('#login-form a');
        if(window.localStorage.getItem('samvel_directory_user_token')){
            const usernameSpan = document.querySelector('#usernameSpan');
            usernameSpan.style.color = change ? "yellow" : "white";
        }
        [h2, ...labels].forEach(elem=>elem.style.color = change ? "yellow" : "blue");
        registerBtn.style.backgroundColor = change ? "yellow" : "blue";
        registerBtn.style.color = change ? "black" : "white";
        spanText.style.color = change ? "white" : "midnightblue";
        spanLink.style.color = change ? "yellow" : "red";
        if(change){
            document.body.style.backgroundColor = "black";
            [...document.querySelectorAll('.black-texted')].forEach(elem=>{
                elem.style.color = "white";
            });
            [...document.querySelectorAll('.red-texted')].forEach(elem=>{
                elem.style.color = "yellow";
            });
            menu.style.backgroundColor="black";
            menuItems.forEach(elem=>{elem.style.color = "black"; elem.style.backgroundColor="yellow"});
        }else{
            document.body.style.backgroundColor = "white";
            [...document.querySelectorAll('.black-texted')].forEach(elem=>{
                elem.style.color = "black";
            });
            [...document.querySelectorAll('.red-texted')].forEach(elem=>{
                elem.style.color = "red";
            });
            menu.style.backgroundColor="dodgerblue";
            menuItems.forEach(elem=>{elem.style.color = "white"; elem.style.backgroundColor="blue"});
        }
    }
    hcmToogle.addEventListener('change',(e)=>{
        setHighContrastMode(e.target.checked);
    })
});