import {searchOrganizations, deleteOrganization, getOneOrganization} from "../api/organization.js";
import {speechs} from "../resources/speakers_speechs.js";
import {getLocaleData, setLanguageData} from "../api/localization.js";
import myRecognition from "../api/recognition.js";

setTimeout(()=>{
    console.log(window.speechSynthesis.getVoices());
},3000)
console.log(window.speechSynthesis.getVoices());
console.log(window.speechSynthesis.getVoices());
console.log(window.speechSynthesis.getVoices());

window.addEventListener('load',async()=>{
    const posts = document.querySelector("#organizations");
    const searchInput = document.querySelector('input[name="search-query"]');
    const voiceButton = document.querySelector('#voiceRecorder');
    const searchQuery = window.localStorage.getItem('samvel_directory_search_query');

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
                            speechUttr.voice = window.speechSynthesis.getVoices()[15];
                            speechUttr.rate = 0.75;
                            window.speechSynthesis.speak(speechUttr);
                        })
                    });
                }
                const speakerEngClicks = ()=>{
                    [...document.querySelectorAll('.post .speaker-eng')].forEach(elem=>{
                        elem.addEventListener('click',(event)=>{
                            event.preventDefault();
                            const catName = elem.getAttribute('cat-name');
                            const speechUttr = new SpeechSynthesisUtterance(speechs[catName][elem.parentElement.parentElement.parentElement.getAttribute('org-id')]["eng"]);
                            speechUttr.voice = window.speechSynthesis.getVoices()[1];
                            speechUttr.rate = 0.75;
                            window.speechSynthesis.speak(speechUttr);
                        })
                    });
                }
                const speakerRusClicks = ()=>{
                    [...document.querySelectorAll('.post .speaker-rus')].forEach(elem=>{
                        elem.addEventListener('click',(event)=>{
                            event.preventDefault();
                            const catName = elem.getAttribute('cat-name');
                            const speechUttr = new SpeechSynthesisUtterance(speechs[catName][elem.parentElement.parentElement.parentElement.getAttribute('org-id')]["rus"]);
                            speechUttr.voice = window.speechSynthesis.getVoices()[15];
                            speechUttr.rate = 0.75;
                            window.speechSynthesis.speak(speechUttr);
                        })
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
                    contactRow.innerHTML = `<span><i class="fa fa-map-marker" style="font-size:24px;color:red;"></i> ${post.address}</span> <span><i class="fa fa-phone" style="font-size:24px;color:red;"></i> ${post.phones[0]}</span><span>`;
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
                    if(+post.price > 0){
                        switch(post.price){
                            case "20000" : name.innerHTML += ` <img src="../images/info-gold.png" width="16">`; break;
                            case "30000" : name.innerHTML += ` <img src="../images/info-green.png" width="16">`; break;
                            case "45000" : name.innerHTML += ` <img src="../images/info-blue.jpg" width="16">`; break;
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
                            const speechUttr = new SpeechSynthesisUtterance(speechs[currentCategory][elem.parentElement.parentElement.parentElement.getAttribute('org-id')]["arm"]);
                            speechUttr.voice = window.speechSynthesis.getVoices()[15];
                            speechUttr.rate = 0.75;
                            window.speechSynthesis.speak(speechUttr);
                        })
                    });
                }
                const speakerEngClicks = ()=>{
                    [...document.querySelectorAll('.post .speaker-eng')].forEach(elem=>{
                        elem.addEventListener('click',(event)=>{
                            event.preventDefault();
                            const speechUttr = new SpeechSynthesisUtterance(speechs[currentCategory][elem.parentElement.parentElement.parentElement.getAttribute('org-id')]["eng"]);
                            speechUttr.voice = window.speechSynthesis.getVoices()[1];
                            speechUttr.rate = 0.75;
                            window.speechSynthesis.speak(speechUttr);
                        })
                    });
                }
                const speakerRusClicks = ()=>{
                    [...document.querySelectorAll('.post .speaker-rus')].forEach(elem=>{
                        elem.addEventListener('click',(event)=>{
                            event.preventDefault();
                            const speechUttr = new SpeechSynthesisUtterance(speechs[currentCategory][elem.parentElement.parentElement.parentElement.getAttribute('org-id')]["rus"]);
                            speechUttr.voice = window.speechSynthesis.getVoices()[15];
                            speechUttr.rate = 0.75;
                            window.speechSynthesis.speak(speechUttr);
                        })
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
                    contactRow.classList.add('contact-row');
                    contactRow.innerHTML = `<span><i class="fa fa-map-marker" style="font-size:24px;color:red;"></i> ${post.address}</span> <span><i class="fa fa-phone" style="font-size:24px;color:red;"></i> ${post.phones[0]}</span><span>`;
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
                            case "45000" : name.innerHTML += ` <img src="../images/info-blue.jpg" width="16">`; break;
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

    document.querySelector('#search').addEventListener('click',()=>{
        const searchQuery = document.querySelector('input[name="search-query"]').value;
        window.localStorage.setItem('samvel_directory_search_query',searchQuery);
        window.location.href = "/views/search-result.html";
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

    getLocaleData().then(res=>{
        if(res.success){
            myRecognition.recognition.lang = res.data.lang;
        }
        voiceButton.addEventListener('click',()=>{
            myRecognition.recognition.start();
            voiceButton.style.color="green";
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