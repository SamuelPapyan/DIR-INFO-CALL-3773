import {sendMail} from "../api/site.js";
import {getLocaleData, setLanguageData} from "../api/localization.js";

window.addEventListener('load',async()=>{
    const name = document.querySelector('input[name="name"]');
    const email = document.querySelector('input[name="email"]');
    const content = document.querySelector('textarea[name="content"]');
    const phone = document.querySelector('input[name="phone"]');
    const company = document.querySelector('input[name="company"]');
    const sendButton = document.querySelector('#send');
    const validationLabel = document.querySelector('#validation-label');
    const hcmSwitch = document.querySelector('#hcm-switch');
    const localeLangsSet = async()=>{
        [...document.querySelectorAll('.locale')].forEach(elem=>{
            elem.addEventListener('click',async(e)=>{
                e.preventDefault();
                const response = await setLanguageData(elem.getAttribute('locale-lang'));
                if(response.success){
                    window.location.reload();
                }
            })
        });
    }
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
            [...document.querySelectorAll('.blue-texted')].forEach(elem=>{
                elem.style.color = "yellow";
            });
            sendButton.style.color = "black";
            sendButton.style.backgroundColor= "yellow";
            menu.style.backgroundColor="black";
            menuItems.forEach(elem=>{elem.style.color = "black"; elem.style.backgroundColor="yellow"});
        }else{
            document.body.style.backgroundColor = "white";
            [...document.querySelectorAll('.black-texted')].forEach(elem=>{
                elem.style.color = "black";
            });
            [...document.querySelectorAll('.blue-texted')].forEach(elem=>{
                elem.style.color = "red";
            });
            sendButton.style.color = "white";
            sendButton.style.backgroundColor= "blue";
            menu.style.backgroundColor="dodgerblue";
            menuItems.forEach(elem=>{elem.style.color = "white"; elem.style.backgroundColor="blue"});
        }
    }
    sendButton.addEventListener('click',()=>{
        if(name.value.length > 0 && email.value.length > 0){
            sendMail({
                name:name.value,
                email:email.value,
                content:content.value,
                phone:phone.value,
                company:company.value
            }).then(res=>{
                console.log(res);
            });
            validationLabel.textContent = "";
        }
        else{
            validationLabel.textContent = "Needed name and email";
        }
    });
    getLocaleData().then(response=>{
        if(response.success){
            console.log(response);
            console.log("Hello");
            //console.log(document.querySelector('#localize-createPost'));
            //document.querySelector('#localize-createPost').textContent = response.data.createPost
        }
        else{
            console.log("GoodBye");
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
    hcmSwitch.addEventListener('change',(e)=>{
        setHighContrastMode(e.target.checked);
    })
    await localeLangsSet();
});