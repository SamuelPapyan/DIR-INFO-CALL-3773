import {searchOrganizations, deleteOrganization, getOneOrganization} from "../api/organization.js";
import {speechs} from "../resources/speakers_speechs.js";
import {getLocaleData, setLanguageData} from "../api/localization.js";
import myRecognition from "../api/recognition.js";
import playSound from "../api/playSound.js";

setTimeout(()=>{
    console.log(window.speechSynthesis.getVoices());
},3000)

window.addEventListener('load',async()=>{
    const posts = document.querySelector("#organizations");
    const searchInput = document.querySelector('input[name="search-query"]');
    const voiceButton = document.querySelector('#voiceRecorder');
    const searchQuery = window.localStorage.getItem('samvel_directory_search_query');
    const searchQuantity = document.querySelector('#search-results-no');

    const increaseButton = document.querySelector('#increase-button');
    const decreaseButton = document.querySelector('#decrease-button');
    const hcmSwitch = document.querySelector('#hcm-switch input');

    let isHCPModeOn = false;

    const searchListener = () =>{
        const searchQuery = document.querySelector('input[name="search-query"]').value;
        window.localStorage.setItem('samvel_directory_search_query',searchQuery);
        window.location.href = "/views/search-result.html";
    }

    document.title = "Search Result for \"" + searchQuery + "\" | DIR INFO CALL 3773";
    searchInput.value = searchQuery;
    if(window.location.href == "http://localhost:3000/views/search-result.html"){
        const response = await searchOrganizations(searchQuery);
        console.log(response);
        if(response.success){
            if(response.data.length > 0){
                const singleClicks = ()=>{
                    [...document.querySelectorAll('.post h3')].forEach(elem=>{
                        elem.addEventListener('click',(event)=>{
                            window.localStorage.setItem("samvel_directory_current_org",event.target.getAttribute("org-id"));
                            getOneOrganization(event.target.getAttribute("org-id")).then(res1=>{
                                if(res1.data.price == "45000"){
                                    window.location.href="/views/organization-single-4.html";
                                }else if(res1.data.price == "20000"){
                                    window.location.href="/views/organization-single-2.html";
                                }
                                else if(res1.data.price == "30000"){
                                    window.location.href="/views/organization-single-3.html"
                                }
                                else if(res1.data.price == "0"){
                                    window.location.href="/views/organization-single.html";
                                }
                            });
                        })
                    });
                }
                const speakerArmClicks = ()=>{
                    [...document.querySelectorAll('.post .speaker-arm')].forEach(elem=>{
                        elem.addEventListener('click',(event)=>{
                            event.preventDefault();
                            const catName = elem.getAttribute('cat-name');
                            const speechUttr = new SpeechSynthesisUtterance(speechs[catName][elem.parentElement.parentElement.parentElement.getAttribute('org-id')]["arm"]);
                            speechUttr.voice = window.speechSynthesis.getVoices()[16];
                            speechUttr.rate = 0.85;
                            window.speechSynthesis.speak(speechUttr);
                        });
                        elem.addEventListener('mouseover',(event)=>{
                            event.target.src="../images/arm_speaker_glow.png";
                        });
                        elem.addEventListener('mouseout',(event)=>{
                            event.target.src="../images/arm_speaker.png";
                        });
                    });
                }
                const speakerEngClicks = ()=>{
                    [...document.querySelectorAll('.post .speaker-eng')].forEach(elem=>{
                        elem.addEventListener('click',(event)=>{
                            event.preventDefault();
                            const catName = elem.getAttribute('cat-name');
                            const speechUttr = new SpeechSynthesisUtterance(speechs[catName][elem.parentElement.parentElement.parentElement.getAttribute('org-id')]["eng"]);
                            speechUttr.voice = window.speechSynthesis.getVoices()[2];
                            speechUttr.rate = 0.75;
                            window.speechSynthesis.speak(speechUttr);
                        });
                        elem.addEventListener('mouseover',(event)=>{
                            event.target.src="../images/eng_speaker_glow.png";
                        })
                        elem.addEventListener('mouseout',(event)=>{
                            event.target.src="../images/eng_speaker.png";
                        });
                    });
                }
                const speakerRusClicks = ()=>{
                    [...document.querySelectorAll('.post .speaker-rus')].forEach(elem=>{
                        elem.addEventListener('click',(event)=>{
                            event.preventDefault();
                            const catName = elem.getAttribute('cat-name');
                            const speechUttr = new SpeechSynthesisUtterance(speechs[catName][elem.parentElement.parentElement.parentElement.getAttribute('org-id')]["rus"]);
                            speechUttr.voice = window.speechSynthesis.getVoices()[16];
                            speechUttr.rate = 0.75;
                            window.speechSynthesis.speak(speechUttr);
                        });
                        elem.addEventListener('mouseover',(event)=>{
                            event.target.src="../images/rus_speaker_glow.png";
                        });
                        elem.addEventListener('mouseout',(event)=>{
                            event.target.src="../images/rus_speaker.png";
                        });
                    });
                }
                [...response.data].forEach(post =>{
                    const postBox = document.createElement("div");
                    postBox.classList.add("post");
                    const name = document.createElement("h3");
                    const description = document.createElement("p");
                    const contactRow = document.createElement("p");
                    const speakerBox = document.createElement('div');
                    const speakerArm = document.createElement('img');
                    const speakerRus = document.createElement('img');
                    const speakerEng = document.createElement('img');
                    postBox.setAttribute('org-id',post._id);
                    contactRow.classList.add('contact-row');
                    contactRow.innerHTML = `<span class="text-size-change black-texted"><i class="fa fa-map-marker red-texted" style="font-size:24px;color:red;"></i> ${post.address}</span> <span class="text-size-change black-texted"><i class="fa fa-phone red-texted" style="font-size:24px;color:red;"></i> ${post.phones[0]}</span><span>`;
                    speakerBox.classList.add('speaker-box');
                    speakerArm.src="../images/arm_speaker.png";
                    speakerArm.classList.add('speaker');
                    speakerArm.classList.add('speaker-arm');
                    speakerArm.style.width = "30px";
                    speakerArm.style.height = "30px";
                    speakerEng.style.width = "30px";
                    speakerEng.style.height = "30px";
                    speakerRus.style.width = "30px";
                    speakerRus.style.height = "30px";
                    speakerEng.src="../images/eng_speaker.png";
                    speakerEng.classList.add('speaker');
                    speakerEng.classList.add('speaker-eng');
                    speakerRus.src="../images/rus_speaker.png";
                    speakerRus.classList.add('speaker');
                    speakerRus.classList.add('speaker-rus');
                    speakerArm.setAttribute('cat-name',post.category);
                    speakerRus.setAttribute('cat-name',post.category);
                    speakerEng.setAttribute('cat-name',post.category);
                    speakerBox.append(speakerArm);
                    speakerBox.append(speakerEng);
                    speakerBox.append(speakerRus);
                    contactRow.append(speakerBox);
                    contactRow.innerHTML += "</span>";
                    name.setAttribute("org-id",post._id)
                    name.textContent = post.name;
                    name.classList.add('text-size-change');
                    name.classList.add('red-texted');
                    if(+post.price > 0){
                        switch(post.price){
                            case "20000" : name.innerHTML += ` <img src="../images/info-gold.png" width="16">`; break;
                            case "30000" : name.innerHTML += ` <img src="../images/info-green.png" width="16">`; break;
                            case "45000" : name.innerHTML += ` <img src="../images/info-blue.jpg" width="16">`; break;
                        }
                    }
                    description.textContent = post.description;
                    description.classList.add('text-size-change');
                    description.classList.add('black-texted');
                    postBox.append(name);
                    postBox.append(description);
                    postBox.append(contactRow);
                    posts.append(postBox);
                });
                [...document.querySelectorAll('.text-size-change')].forEach(elem=>{
                    elem.style.fontSize = "16px";
                });
                searchQuantity.innerText = response.data.length;
                singleClicks();
                speakerArmClicks();
                speakerEngClicks();
                speakerRusClicks();
            }else{
                const message = document.createElement("h3");
                message.textContent = "Not have organizations yet.";
                posts.append(message);
            }
        }
    }else if(window.location.href == "http://localhost:3000/views/branches.html"){
        const response = await searchOrganizations(window.localStorage.getItem('samve_directory_branch'));
        console.log(response);
        if(response.success){
            if(response.data.length > 0){
                const singleClicks = ()=>{
                    [...document.querySelectorAll('.post h3')].forEach(elem=>{
                        elem.addEventListener('click',(event)=>{
                            window.localStorage.setItem("samvel_directory_current_org",event.target.getAttribute("org-id"));
                            getOneOrganization(event.target.getAttribute("org-id")).then(res1=>{
                                if(res1.data.price == "45000"){
                                    window.location.href="/views/organization-single-4.html";
                                }else if(res1.data.price == "20000"){
                                    window.location.href="/views/organization-single-2.html";
                                }
                                else if(res1.data.price == "30000"){
                                    window.location.href="/views/organization-single-3.html"
                                }
                                else if(res1.data.price == "0"){
                                    window.location.href="/views/organization-single.html";
                                }
                            });
                        })
                    });
                }
                const speakerArmClicks = ()=>{
                    [...document.querySelectorAll('.post .speaker-arm')].forEach(elem=>{
                        elem.addEventListener('click',(event)=>{
                            event.preventDefault();
                            const speechText = findSpeechById(elem.parentElement.parentElement.parentElement.getAttribute('org-id'), "arm");
                            if(speechText){
                                const speechUttr = new SpeechSynthesisUtterance(speechText);
                                speechUttr.voice = window.speechSynthesis.getVoices()[16];
                                speechUttr.rate = 0.85;
                                window.speechSynthesis.speak(speechUttr);
                            }
                        });
                        elem.addEventListener('mouseover',(event)=>{
                            event.target.src="../images/arm_speaker_glow.png";
                        })
                        elem.addEventListener('mouseout',(event)=>{
                            event.target.src="../images/arm_speaker.png";
                        });
                    });
                }
                const speakerEngClicks = ()=>{
                    [...document.querySelectorAll('.post .speaker-eng')].forEach(elem=>{
                        elem.addEventListener('click',(event)=>{
                            event.preventDefault();
                            const speechText = findSpeechById(elem.parentElement.parentElement.parentElement.getAttribute('org-id'), "eng");
                            if(speechText){
                                const speechUttr = new SpeechSynthesisUtterance(speechText);
                                speechUttr.voice = window.speechSynthesis.getVoices()[2];
                                speechUttr.rate = 0.75;
                                window.speechSynthesis.speak(speechUttr);
                            }
                        });
                        elem.addEventListener('mouseover',(event)=>{
                            event.target.src="../images/eng_speaker_glow.png";
                        })
                        elem.addEventListener('mouseout',(event)=>{
                            event.target.src="../images/eng_speaker.png";
                        });
                    });
                }
                const speakerRusClicks = ()=>{
                    [...document.querySelectorAll('.post .speaker-rus')].forEach(elem=>{
                        elem.addEventListener('click',(event)=>{
                            event.preventDefault();
                            const speechText = findSpeechById(elem.parentElement.parentElement.parentElement.getAttribute('org-id'), "rus");
                            if(speechText){
                                const speechUttr = new SpeechSynthesisUtterance(speechText);
                                speechUttr.voice = window.speechSynthesis.getVoices()[16];
                                speechUttr.rate = 0.75;
                                window.speechSynthesis.speak(speechUttr);
                            }
                        });
                        elem.addEventListener('mouseover',(event)=>{
                            event.target.src="../images/rus_speaker_glow.png";
                        })
                        elem.addEventListener('mouseout',(event)=>{
                            event.target.src="../images/rus_speaker.png";
                        });
                    });
                }
                [...response.data].filter(post=>{
                    return post.name === window.localStorage.getItem('samve_directory_branch');
                }).forEach(post =>{
                    const postBox = document.createElement("div");
                    postBox.classList.add("post");
                    const name = document.createElement("h3");
                    const description = document.createElement("p");
                    const contactRow = document.createElement("p");
                    const speakerBox = document.createElement('div');
                    const speakerArm = document.createElement('img');
                    const speakerRus = document.createElement('img');
                    const speakerEng = document.createElement('img');
                    postBox.setAttribute('org-id',post._id);

                    let newPhoneNumber = post.phones[0];
                    if(post.phones[0].indexOf('+374 ') != -1)
                        newPhoneNumber = '0' + post.phones[0].slice(post.phones[0].indexOf('+374 ')+5);

                    contactRow.classList.add('contact-row');
                    contactRow.innerHTML = `<span><i class="fa fa-map-marker" style="font-size:24px;color:red;"></i> ${post.address}</span> <span><i class="fa fa-phone" style="font-size:24px;color:red;"></i> ${newPhoneNumber}</span><span>`;

                    speakerBox.classList.add('speaker-box');
                    speakerArm.src="../images/arm_speaker.png";
                    speakerArm.classList.add('speaker');
                    speakerArm.classList.add('speaker-arm');
                    speakerArm.style.width = "30px";
                    speakerArm.style.height = "30px";
                    speakerEng.style.width = "30px";
                    speakerEng.style.height = "30px";
                    speakerRus.style.width = "30px";
                    speakerRus.style.height = "30px";
                    speakerEng.src="../images/eng_speaker.png";
                    speakerEng.classList.add('speaker');
                    speakerEng.classList.add('speaker-eng');
                    speakerRus.src="../images/rus_speaker.png";
                    speakerRus.classList.add('speaker');
                    speakerRus.classList.add('speaker');
                    speakerRus.classList.add('speaker-rus');
                    speakerBox.append(speakerArm);
                    speakerBox.append(speakerEng);
                    speakerBox.append(speakerRus);
                    contactRow.append(speakerBox);
                    contactRow.innerHTML += "</span>";
                    name.setAttribute("org-id",post._id);
                    name.textContent = post.name;
                    if(+post.price > 0){
                        switch(post.price){
                            case "20000" : name.innerHTML += ` <img src="../images/info-gold.png" width="16">`; break;
                            case "30000" : name.innerHTML += ` <img src="../images/info-green.png" width="16">`; break;
                            case "45000" : name.innerHTML += ` <img src="../images/info-blue.png" width="16">`; break;
                        }
                    }
                    description.textContent = post.description;
                    postBox.append(name);
                    postBox.append(description);
                    postBox.append(contactRow);
                    posts.append(postBox);
                });
                singleClicks();
                speakerArmClicks();
                speakerEngClicks();
                speakerRusClicks();
            }else{
                const message = document.createElement("h3");
                message.textContent = "Not have organizations yet.";
                posts.append(message);
            }
        }
    }

    document.querySelector('#search').addEventListener('click',searchListener);

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
                    searchListener();
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

    increaseButton.addEventListener('click',()=>{
        [...document.querySelectorAll('.text-size-change')].forEach(elem=>{
            const elemSize = elem.style.fontSize;
            let sizeNumber = elemSize.slice(0,elemSize.indexOf("px"));
            elem.style.fontSize = ++sizeNumber + "px";
        })
    });
    decreaseButton.addEventListener('click',()=>{
        [...document.querySelectorAll('.text-size-change')].forEach(elem=>{
            const elemSize = elem.style.fontSize;
            let sizeNumber = elemSize.slice(0,elemSize.indexOf("px"));
            elem.style.fontSize = --sizeNumber + "px";
        })
    });
    hcmSwitch.addEventListener('change',(e)=>{
        isHCPModeOn = e.target.checked;
        setHighContrastMode(isHCPModeOn);
    });

    getLocaleData().then(res=>{
        if(res.success){
            myRecognition.recognition.lang = res.data.lang;
        }
        voiceButton.addEventListener('click',()=>{
            myRecognition.recognition.start();
            voiceButton.style.color="red";
        });
        myRecognition.recognition.addEventListener('result',(event)=>{
            voiceButton.style.color="white";
            searchInput.value = event.results[0][0].transcript;
            window.localStorage.setItem("samvel_directory_search_query",searchInput.value);
            window.location.reload();
        });
    });

    await localeLangsSet();
});

function findSpeechById(id, lang){
    for(let key in speechs){
        for(let s in speechs[key]){
            if(s == id){
                return speechs[key][s][lang];
            }
        }
    }
    return null;
}