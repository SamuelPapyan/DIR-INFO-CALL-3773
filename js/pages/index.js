import {getCurrentUserData} from "../api/user.js";
import {getLocaleData, setLanguageData} from "../api/localization.js";
import playSound from "../api/playSound.js";
import myRecognition from "../api/recognition.js";

function setCookie(cname, cvalue, seconds) {
    const d = new Date();
    d.setTime(d.getTime() + (seconds*1000));
    const expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    let name = cname + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

window.addEventListener('load',async()=>{
    const searchInput = document.querySelector('input[name="search"]');
    const searchBtn = document.querySelector('#searchBtn');
    const hotlineToggle = document.querySelector('#toogle')
    const callUs = document.querySelector('#callUs');
    const mapLink = document.querySelector('#mapLink');
    const showcase = document.querySelector('#showcase');
    const registerPanel = document.querySelector('#container .row1 .col2');
    const worldPhones = document.querySelector('#world-phones-img');
    console.log(registerPanel);
    callUs.addEventListener('click',()=>{
        window.location.href="tel:3773";
    });
    searchBtn.addEventListener('click',()=>{
        window.localStorage.setItem('samvel_directory_search_query',searchInput.value);
        window.location.href = "/views/search-result.html";
    });
    hotlineToggle.addEventListener('click',()=>{
        window.location.href="/views/hotlines.html";
    });
    hotlineToggle.addEventListener('mouseover',()=>{
        hotlineToggle.src = "../images/hotlines_hover2.png"
    });
    hotlineToggle.addEventListener('mouseout',()=>{
        hotlineToggle.src = "../images/hotlines.png";
    });
    /*
    mapLink.addEventListener('mouseover',()=>{
        mapLink.src = "../images/map_2_1_hover2.png";
    });
    mapLink.addEventListener('mouseout',()=>{
        mapLink.src = "../images/map_2_1.png";
    });
    worldPhones.addEventListener('mouseover',()=>{
        worldPhones.src = "../images/world-phones-2_hover2.png";
    });
    worldPhones.addEventListener('mouseout',()=>{
        worldPhones.src = "../images/world-phones-2.png";
    });*/

    if(!getCookie('enter')){
        showcase.style.opacity = 1;
        setTimeout(()=>{
            for(let i = 0; i < 10; i++){
                setTimeout(()=>{
                    showcase.style.opacity -= 0.1;
                },i*100);
            }
            setTimeout(()=>{
                showcase.style.display = "none";
                setCookie('enter','true',60);
            },1000);
        },3000);
    }else{
        showcase.style.opacity = 0;
        showcase.style.display = "none";
    }
    if(window.localStorage.getItem('samvel_directory_user_token')){
        getCurrentUserData().then(res=>{
            const newBox = document.createElement('div');
            const usernameSpan = document.createElement('span');
            const logout = document.createElement('a');
            const newOrganization = document.createElement('a');
            usernameSpan.textContent = res.data.username;
            logout.textContent = "Logout";
            logout.id = "logout";
            logout.href = "#";
            newOrganization.textContent = "New Organization";
            newOrganization.href = "/views/organization-create.html";
            newBox.append(usernameSpan);
            newBox.append(logout);
            newBox.append(document.createElement('br'));
            newBox.append(newOrganization);
            newBox.append(document.createElement('br'));
            registerPanel.innerHTML = newBox.innerHTML;
            document.querySelector('#logout').addEventListener('click',(event)=>{
                event.preventDefault();
                console.log("a is clicked");
                window.localStorage.removeItem('samvel_directory_user_token');
                window.location.reload();
            })
        });
    }
    document.querySelector('#blog-link').addEventListener('click',(event)=>{
        event.preventDefault();
        if(window.localStorage.getItem('samvel_directory_user_token')){
            window.location.href = "/views/blog.html";
        }
        else{
            window.location.href = "/views/login.html";
        }
    });
    const localeLangsSet = async ()=>{
        [...document.querySelectorAll('.locale')].forEach(elem=>{
            elem.addEventListener('click',async()=>{
                const response = await setLanguageData(elem.getAttribute('locale-lang'));
                if(response.success){
                    window.location.reload();
                }
            })
        });
    }

    [...document.querySelectorAll('.has-sound')].forEach(elem=>{
        elem.addEventListener('mouseover',playSound);
    });

    [...document.querySelectorAll('.red-click')].forEach(elem=>{
        elem.addEventListener('click',(e)=>e.target.style.color = "red");
    });

    [...document.querySelectorAll('.yellow-hover')].forEach(elem=>{
        const currentColor = elem.style.color;
        elem.addEventListener('mouseover',(e)=>e.target.style.color="#FFA825");
        elem.addEventListener('mouseout',(e)=>e.target.style.color=currentColor);
    });
    document.querySelector('#loginUrl').addEventListener('click',()=>{
        window.localStorage.setItem('samvel_directory_return_url',window.location.href);
    });
    document.querySelector('#signUpUrl').addEventListener('click',()=>{
        window.localStorage.setItem('samvel_directory_return_url',window.location.href);
    });
    getLocaleData().then(response=>{
        console.log(response.data.lang);
        myRecognition.setLang(response.data.lang);
        document.querySelector('input[name="search"]').setAttribute("placeholder",response.data.searchOrganization);
        document.querySelector('#voiceRecorder').addEventListener('click',()=>{
            document.querySelector("#voiceRecorder").style.color = "red";
            myRecognition.recognition.start();
        });
        myRecognition.recognition.addEventListener('result',(event)=>{
            document.querySelector("#voiceRecorder").style.color = "white";
            document.querySelector('input[name="search"]').value = event.results[0][0].transcript;
            window.localStorage.setItem('samvel_directory_search_query',searchInput.value);
            window.location.href = "/views/search-result.html";
        });
    });

    await localeLangsSet();
});