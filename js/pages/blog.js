window.addEventListener('load',()=>{
    const hcmToogle = document.querySelector('#hcm-switch');

    document.querySelector('#blog-link').addEventListener('click',(event)=>{
        event.preventDefault();
        if(window.localStorage.getItem('samvel_directory_user_token'))
            window.location.href = "/views/blog.html";
        else
            window.location.href = "/views/login.html";
    });

    const setHighContrastMode = (change)=>{
        const menuItems = [...document.querySelectorAll('#menu .col1 a'),
            ...document.querySelectorAll('#menu .col2 a'),
            ...document.querySelectorAll('#menu .col3 a')];
        const menu = document.querySelector('#menu');
        if(window.localStorage.getItem('samvel_directory_user_token')){
            const usernameSpan = document.querySelector('#usernameSpan');
            usernameSpan.style.color = change ? "yellow" : "white";
        }
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
    });
});