import {getCurrentUserData} from "../api/user.js";
import {getLocaleData, setLanguageData} from "../api/localization.js";
import playSound from "../api/playSound.js";
import myRecognition from "../api/recognition.js";
import {setSpeechInElement} from "../session/speechText.js";

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
    const showcase = document.querySelector('#showcase');
    const registerPanel = document.querySelector('#container .row1 .col2');
    const oldNewStreets = document.querySelector('#oldNewStreets');
    const voiceRecorder = document.querySelector('#voiceRecorder');
    const locales = [...document.querySelectorAll('.locale')];
    const soundMuter = document.querySelector("#soundMuter");

    let isHCModeOn = false;
    let isSoundMuted = false;

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
    oldNewStreets.addEventListener('mouseover',(e)=>{
        e.target.style.border = "2px solid blue";
        e.target.style.cursor = "pointer";
    })
    oldNewStreets.addEventListener('mouseout',(e)=>{
        e.target.style.border = "0 none transparent";
    })
    oldNewStreets.addEventListener('click',()=>{
        document.location.href = "/views/oldNewStreets.html";
    })
    /*if(!getCookie('enter')){
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
    }*/
    if(window.localStorage.getItem('samvel_directory_user_token')){
        getCurrentUserData().then(res=>{
            const newBox = document.createElement('div');
            const usernameSpan = document.createElement('span');
            const logout = document.createElement('a');
            const newOrganization = document.createElement('a');
            usernameSpan.textContent = res.data.username;
            usernameSpan.id = "usernameSpan";
            logout.textContent = "Logout";
            logout.id = "logout";
            logout.href = "#";
            logout.style.fontWeight = "bold";
            newOrganization.textContent = "New Organization";
            newOrganization.href = "/views/organization-create.html";
            newOrganization.id="newOrganization";
            newOrganization.style.fontWeight = "bold";
            newBox.append(usernameSpan);
            newBox.append(logout);
            newBox.append(document.createElement('br'));
            newBox.append(newOrganization);
            newBox.append(document.createElement('br'));
            registerPanel.innerHTML = newBox.innerHTML;
            document.querySelector('#logout').addEventListener('click',(event)=>{
                event.preventDefault();
                window.localStorage.removeItem('samvel_directory_user_token');
                window.location.reload();
            });
            const logoutElem = document.querySelector('#logout');
            const newOrgElem = document.querySelector('#newOrganization');
            [logoutElem, newOrgElem].forEach(elem=>{
                elem.addEventListener('mouseover',()=>{
                    const [text, just] = isHCModeOn ? ["red", "black"] : ["orange", "white"];
                    elem.style.color = text;
                    elem.addEventListener('mouseout',()=>{
                        elem.style.color = just;
                    });
                });
                document.querySelector('#usernameSpan').style.color = isHCModeOn ? "yellow" : "blue";
            });
            const someSpeeches = [
                setSpeechInElement(newOrgElem, {text:"нор казма керпуц юн", lang:'hy'}),
                setSpeechInElement(logoutElem, {text:"ейлк",lang:'hy'})
            ];
            soundMuter.addEventListener('change',e=>{
                someSpeeches.forEach(speech=>{
                    speech.setSpeechEnable(e.target.checked);
                });
            });
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
    //"Pling" Sounds
    /*[...document.querySelectorAll('.has-sound')].forEach(elem=>{
        elem.addEventListener('mouseover',playSound);
    });*/

    [...document.querySelectorAll('.red-click')].forEach(elem=>{
        elem.addEventListener('click',(e)=>e.target.style.color = "red");
    });

    [...document.querySelectorAll('.yellow-hover')].forEach(elem=>{
        elem.addEventListener('mouseover',(e)=>{
            const currentColor = elem.style.color;
            if(isHCModeOn)
                e.target.style.color="red";
            else
                e.target.style.color="#FFA825";
            elem.addEventListener('mouseout',(e)=>{
                e.target.style.color=currentColor
            });
        });
    });
    document.querySelector('#loginUrl').addEventListener('click',()=>{
        window.localStorage.setItem('samvel_directory_return_url',window.location.href);
    });
    document.querySelector('#signUpUrl').addEventListener('click',()=>{
        window.localStorage.setItem('samvel_directory_return_url',window.location.href);
    });
    getLocaleData().then(response=>{
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

    locales.forEach(elem=>{
        elem.addEventListener('mouseover',()=>{
            let [text, bckg, just] = isHCModeOn ? ["black", "yellow", "yellow"] : ["blue", "yellow", "blue"];
            elem.style.color = text;
            elem.style.backgroundColor = bckg;
            elem.addEventListener('mouseout',()=>{
                elem.style.backgroundColor = "transparent";
                elem.style.color = just;
            })
        })
    });

    const mapLink = document.querySelector('#mapLink');
    const alphaPharm = document.querySelector('.org1');
    const microsoft = document.querySelector('.org6');
    const ameriaBank = document.querySelector('.org2');
    const astxik = document.querySelector('.org3');
    const zigzag = document.querySelector('.org4');
    const tashirPizza = document.querySelector('.org5');
    const rio = document.querySelector('.org7');
    const aboutus = document.querySelector('#aboutus');
    const contactus = document.querySelector('#contactus');
    const catsToggle = document.querySelector('#catsToogle');
    const pricelist = document.querySelector('#pricelist');
    const yerevan = document.querySelector('#yerevan');
    const gover = document.querySelector('#gover');
    const pharmacies = document.querySelector('#pharmacies');
    const doctor911 = document.querySelector('#doctor911');
    const embassy = document.querySelector('#embassy');
    const mailIndexes = document.querySelector('#mailIndexes');
    const login = document.querySelector('#loginUrl');
    const signUp = document.querySelector('#signUpUrl');
    const hotels = document.querySelector('#hotels');
    const worldPhones = document.querySelector('#worldPhones');
    const newOrganization = document.querySelector('#new-organization');
    const blog = document.querySelector('#blog-link');
    const hcmToogle = document.querySelector('#hcm-switch');
    const armLang = document.querySelector('#arm-lang');
    const rusLang = document.querySelector('#rus-lang');
    const engLang = document.querySelector('#eng-lang');
    const logo = document.querySelector('#logo');

    const elems = [aboutus, contactus, catsToggle, pricelist, blog, login, signUp, newOrganization, searchBtn, voiceRecorder, soundMuter];
    const ads = [alphaPharm, microsoft, astxik, zigzag, tashirPizza, rio];
    const services = [gover, yerevan, pharmacies, doctor911, embassy];
    const miscs = [hotels, hotlineToggle, oldNewStreets, mapLink, callUs, worldPhones];

    [...ads,...services].forEach(elem=>{
        elem.addEventListener('mouseover',()=>{
            const [bckg, justBckg] = isHCModeOn ? ["yellow", "yellow"] : ["yellow","white"];
            elem.style.backgroundColor = bckg;
            elem.addEventListener('mouseout',()=>{
                elem.style.backgroundColor = justBckg;
            });
        });
    });
    miscs.forEach(elem=>{
        elem.addEventListener('mouseover',()=>{
            const [bckg, justBckg] = isHCModeOn ? ["yellow", "yellow"] : ["yellow","transparent"];
            elem.style.backgroundColor = bckg;
            elem.addEventListener('mouseout',()=>{
                elem.style.backgroundColor = justBckg;
            });
        });
    });
    [oldNewStreets, callUs].forEach(elem=>{
        elem.addEventListener('mouseover',()=>{
            const [p1, p2] = isHCModeOn ? ["15px", "15px"] : ["15px", "0"];
            elem.addEventListener('mouseover',()=>{
                elem.style.padding = p1;
                elem.addEventListener('mouseout',()=>{
                    elem.style.padding = p2;
                })
            })
        })
    });
    const switchHighContrastMode = (change)=>{
        const newOrg2 = document.querySelector('#newOrganization');
        const logout = document.querySelector('#logout');
        const usernameSpan = document.querySelector('#usernameSpan');
        if(change)
        {
            document.body.style.backgroundImage = "url(../images/homepage_background_night_1.png)";
            elems.forEach(elem=>{
                elem.style.color = "black";
                elem.style.backgroundColor = "yellow";
            });
            locales.forEach(elem=>elem.style.color = "yellow");
            [...ads, ...services, ...miscs].forEach(elem=>elem.style.backgroundColor = "yellow");
            ameriaBank.style.backgroundImage = "url(../images/ameriabank_2_yellow.png)";
            mailIndexes.src = "../images/mail_index_yellow.PNG";
            oldNewStreets.style.padding = "15px";
            callUs.style.padding = "15px";
            if(window.localStorage.getItem('samvel_directory_user_token')){
                [logout, newOrg2].forEach(elem=>{
                    elem.style.backgroundColor = "yellow";
                    elem.style.color = "black";
                });
                usernameSpan.style.color = "yellow";
            }
        }
        else{
            document.body.style.backgroundImage = "url(../images/homepage_background.jpg)";
            elems.forEach(elem=>{
                elem.style.color = "white";
                elem.style.backgroundColor = "blue";
            });
            locales.forEach(elem=>elem.style.color = "blue");
            [...ads, ...services].forEach(elem=>elem.style.backgroundColor = "white");
            ameriaBank.style.backgroundImage = "url(../images/ameriabank_2.jpg)";
            mailIndexes.src = "../images/mail_index.PNG";
            oldNewStreets.style.padding = "0px";
            callUs.style.padding = "0px";
            [callUs, mapLink, oldNewStreets, hotlineToggle, worldPhones, hotels].forEach(elem=>elem.style.backgroundColor = "transparent");
            if(window.localStorage.getItem('samvel_directory_user_token')) {
                [logout, newOrg2].forEach(elem => {
                    elem.style.backgroundColor = "blue";
                    elem.style.color = "white";
                });
                usernameSpan.style.color = "blue";
            }
        }
    }

    const speechItems = [
        setSpeechInElement(mapLink,{text: "Google Maps", lang:'en'})
            .addSpeech({text: "кар тэз", lang:'hy'}),
    setSpeechInElement(alphaPharm, {text:"альфа фарм", lang:'hy'}),
    setSpeechInElement(microsoft, {text:"май кро софт", lang:'hy'}),
    setSpeechInElement(ameriaBank, {text:"а ме риа банк", lang:'hy'}),
    setSpeechInElement(astxik, {text:"", lang:'hy'}),
    setSpeechInElement(zigzag, {text:"зигзаг", lang:'hy'}),
    setSpeechInElement(tashirPizza, {text:"ташир пицца", lang:'hy'}),
    setSpeechInElement(rio, {text:"рио", lang:'hy'}),

    setSpeechInElement(gover,{text:"ая с та ны ан рапэ ту тян  кара ва руцюн", lang:"hy"}),
    setSpeechInElement(yerevan,{text:'е рэ ва ны ка хакапэтаран', lang:'hy'}),
    setSpeechInElement(pharmacies,{text:"pharmacy.am", lang:'en'})
        .addSpeech({text:"ая с та ны де хат н эр", lang:'hy'}),
    setSpeechInElement(doctor911,{text:"doctor 9 1 1",lang:"en"})
        .addSpeech({text:'ая с та ны  хиванд аноцнэр', lang:'hy'}),
    setSpeechInElement(embassy,{text:"дэспануц юн нэр. ми чаз га ин казмакерпутюн нэр", lang:'hy'}),
    setSpeechInElement(mailIndexes, {text:"ерэ ван ы пос та ин да сыч нэр. инд экс", lang:'hy'}),
    setSpeechInElement(hotlineToggle, {text:"hotline. tesh gits", lang:'en'}),
    setSpeechInElement(worldPhones, {text:'ми чаз га ин   хэра хо са ин код эр', lang:'hy'}),
    setSpeechInElement(callUs, {text:'у хых .хэра хо сакап ', lang:'hy'}),
    setSpeechInElement(newOrganization,{text:"нор казма керпуц юн", lang:'hy'}),
    setSpeechInElement(aboutus, {text:'мэр масын', lang:'hy'}),
    setSpeechInElement(contactus, {text:'хэтадарц кап', lang:'hy'}),
    setSpeechInElement(catsToggle, {text:'даса каркич нэр', lang:'hy'}),
    setSpeechInElement(pricelist, {text:'г нацу цак ', lang:'hy'}),
    setSpeechInElement(login, {text:'мут к', lang:'hy'}),
    setSpeechInElement(signUp, {text:'гранцум', lang:'hy'}),
    setSpeechInElement(oldNewStreets, {text:'ерэ ван ы пох оц нэри . храпа ракнэри. та хамас э ри . анвана похутюн нэр', lang:'hy'}),
    setSpeechInElement(blog, {text:'blog', lang:'en'}),
        setSpeechInElement(hotels, {text:'hotel.am',lang:'en'})
            .addSpeech({text:'аяста ны хюраноц нер',lang:'hy'}),
        setSpeechInElement(searchBtn, {text:'вор он ум', lang:'hy'}),
        setSpeechInElement(voiceRecorder, {text:'дзайнаин вор он ум', lang:'hy'}),
        setSpeechInElement(hcmToogle, {text:'гишэ раин  рэжим', lang:'hy'}),
        setSpeechInElement(astxik, {text:'астхик бы жышкакан кентрон', lang:'hy'}),
        setSpeechInElement(soundMuter, {text:'дзайн айин мекусац ум',lang:'hy'}),
        setSpeechInElement(armLang,{text:"хаер эн",lang:'hy'}),
        setSpeechInElement(rusLang,{text:"русский", lang:'ru'}),
        setSpeechInElement(engLang, {text:"english", lange:'en'}),
        setSpeechInElement(logo, {text:'дир инфо кол йерэк йот йот  йерэк тэхэка ту', lang:'hy'})
            .addSpeech({text:"diir info  call 3773 directory", lang:'en'})
    ];

    ameriaBank.addEventListener('mouseover',(e)=>{
        e.target.style.backgroundImage = 'url(../images/ameriabank_2_yellow.png)';
    });
    ameriaBank.addEventListener('mouseout',(e)=>{
        if(!isHCModeOn)
            e.target.style.backgroundImage = 'url(../images/ameriabank_2.jpg)';
    });
    mailIndexes.addEventListener('mouseover',(e)=>{
        e.target.src = '../images/mail_index_yellow.png';
    });
    mailIndexes.addEventListener('mouseout',(e)=>{
        if(!isHCModeOn)
            e.target.src = '../images/mail_index.PNG';
    });

    hcmToogle.addEventListener('change',(e)=>{
        isHCModeOn = e.target.checked;
        switchHighContrastMode(isHCModeOn);
    });

    soundMuter.addEventListener('click',()=>{
        const i = document.querySelector('#soundMuter i');
        isSoundMuted = !isSoundMuted;
        speechItems.forEach(elem=>elem.setSpeechEnable(!isSoundMuted));
        if(isSoundMuted){
            window.speechSynthesis.cancel();
            i.classList.remove('fa-volume-up');
            i.classList.add('fa-volume-off');
        }
        else{
            i.classList.remove('fa-volume-off');
            i.classList.add('fa-volume-up');
        }
    });

    await localeLangsSet();
});

window.addEventListener('beforeunload',()=>{
    window.speechSynthesis.cancel();
})