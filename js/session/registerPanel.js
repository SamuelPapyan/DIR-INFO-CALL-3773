import {getCurrentUserData} from "../api/user.js";

window.addEventListener('load',()=>{
    document.getElementById("loginUrl").addEventListener('click',(event)=>{
        event.preventDefault();
        window.localStorage.setItem('samvel_directory_return_url',window.location.href);
        window.location.href = event.target.href;
    });
    if(window.localStorage.getItem('samvel_directory_user_token')){
        getCurrentUserData().then(res=>{
            const registerPanel = document.querySelector('#menu .col3');
            const newBox = document.createElement('div');
            const usernameSpan = document.createElement('span');
            const logout = document.createElement('a');
            usernameSpan.textContent = res.data.username;
            usernameSpan.id = "usernameSpan";
            logout.textContent = "Logout";
            logout.id = "logout";
            logout.href = "#";
            newBox.append(usernameSpan);
            newBox.append(logout);
            registerPanel.innerHTML = newBox.innerHTML;
            document.querySelector('#logout').addEventListener('click',(event)=>{
                event.preventDefault();
                window.localStorage.removeItem('samvel_directory_user_token');
                window.location.reload();
            })
        });
    }
});