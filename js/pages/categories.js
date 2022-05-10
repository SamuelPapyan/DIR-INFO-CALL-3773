window.addEventListener('load',()=>{
    [...document.querySelectorAll('#content .col2 ul li a')].forEach((elem)=>{
        if(elem.getAttribute('href') == "#"){
            elem.addEventListener('click',(event)=>{
                event.preventDefault();
                window.localStorage.setItem('samvel_directory_current_cat', elem.textContent);
                window.location.href = "/views/category.html";
            });
        }
        if(elem.getAttribute('has-page')) {
            console.log("Has Page Attributes");
            console.log(elem);
            elem.addEventListener('click',(event)=>{
                event.preventDefault();
                window.localStorage.setItem('samvel_directory_current_cat', elem.textContent);
                window.location.href = elem.getAttribute('href');
            });
        }
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
    const h1 = document.querySelector('h1');
    const listItems = [...document.querySelectorAll('#container ul li::before')];
    const raquos = [...document.querySelectorAll('.raquo')];
    const listLinks = [...document.querySelectorAll('#container a')];

    const setHighContrastMode = (change)=>{
        const menuItems = [...document.querySelectorAll('#menu .col1 a'),
            ...document.querySelectorAll('#menu .col2 a'),
            ...document.querySelectorAll('#menu .col3 a')];
        const menu = document.querySelector('#menu');
        if(window.localStorage.getItem('samvel_directory_user_token')){
            const usernameSpan = document.querySelector('#usernameSpan');
            usernameSpan.style.color = change ? "yellow" : "white";
        }
        [...listItems,...raquos, h1].forEach(elem=>{
            elem.style.color = change ? "yellow" : "red";
        })
        listLinks.forEach(elem=>{
            elem.style.color = change ? "white" : "blue";
        });
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