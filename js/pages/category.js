import {
    getAllOrgsByCategory,
    deleteOrganization,
    getOneOrganization,
    getAllOrgsWithSubcategory
} from "../api/organization.js";

import {getCategory} from "../api/site.js";

import {getLocaleData, setLanguageData} from "../api/localization.js";

import {speechs} from "../resources/speakers_speechs.js";
import {dictionary} from "../resources/dictionary.js";
import myRecognition from "../api/recognition.js";

setTimeout(()=>{
    console.log(window.speechSynthesis.getVoices());
},3000);

console.log(window.speechSynthesis.getVoices());
console.log(window.speechSynthesis.getVoices());
console.log(window.speechSynthesis.getVoices());


window.addEventListener('load',async()=>{
    const currentCategory = window.localStorage.getItem('samvel_directory_current_cat');
    const posts = document.querySelector("#organizations");
    const response = await getAllOrgsByCategory(currentCategory);
    const linkedRow = document.querySelector('#path');
    const subcats = document.querySelector('#subcats');
    const categoryNames = [
        'Առևտուր՝ ոչ պարենային ապրանքներ',
        'Առևտուր՝ պարենային ապրանքներ'
    ];
    const artadrutyunNames = [
        'Արտադրություն՝ ոչ պարենային ապրանքներ',
        'Արտադրություն՝ պարենային ապրանքներ'
    ];
    const startRow = linkedRow.innerHTML;

    console.log(currentCategory);
    if(window.location.href != "http://localhost:3000/views/mak.html"){
        getCategory(currentCategory).then(res=>{
            console.log("Hello");
            console.log(res);
            if(!res.data || (res.data.subcategories.length == 1 && !res.data.subcategories[0])){
                let imageSource = "";
                switch(currentCategory){
                    case "Գրադարաններ": imageSource = "../images/library-2.png"; break;
                    case "Եկեղեցիներ": imageSource = "../images/church-2.png"; break;
                }
                document.querySelector('#subcats').outerHTML = `<div id="cat-img"><img src="${imageSource}"></div>`;
            }
            else{
                res.data.subcategories.forEach(subcat=>{
                    const link = document.createElement('a');
                    const li = document.createElement('li');
                    link.href = "#";
                    link.textContent = subcat;
                    li.append(link);
                    subcats.append(li);
                });
                [...document.querySelectorAll('#content .col1 ul li a')].forEach((elem)=>{
                    if(currentCategory == "Միջազգային կազմակերպություններ"){
                        if(elem.textContent == "ՄԱԿ"){
                            elem.href = "http://localhost:3000/views/mak.html";
                        }else{
                            elem.href = "https://www.embassy.am/am/";
                            elem.setAttribute("target","_blank");
                        }
                    }
                    else {
                        elem.setAttribute('subcat', elem.textContent);
                        elem.addEventListener('click', (event) => {
                            event.preventDefault();
                            getAllOrgsWithSubcategory(currentCategory, elem.getAttribute('subcat')).then(response1 => {
                                //linkedRow.innerHTML = startRow + `&raquo; <b>${elem.getAttribute('subcat')}</b>`;
                                if(categoryNames.includes(currentCategory)){
                                    linkedRow.innerHTML= startRow + `<a href="/views/category.html">Առևտուր</a> `;
                                }
                                else if(artadrutyunNames.includes(currentCategory)){
                                    linkedRow.innerHTML = startRow + `<a href="/views/category.html">Արտադրություն</a> `;
                                }
                                else{
                                    linkedRow.innerHTML = startRow + `<a href="/views/category.html">${currentCategory}</a> `;
                                }
                                getList(response1);
                                document.querySelector('#heading').textContent = elem.getAttribute('subcat');
                            });
                        });
                    }
                });
            }
        });
        if(categoryNames.includes(currentCategory)){
            document.querySelector('#content .col2 h1').textContent = "Առևտուր";
        }
        else if(artadrutyunNames.includes(currentCategory)){
            document.querySelector('#content .col2 h1').textContent = "Արտադրություն";
        }
        else{
            document.querySelector('#heading').textContent = currentCategory;
        }

    }else{
        [...document.querySelectorAll('#content .col1 ul li a')].forEach((elem)=>{
            elem.setAttribute('subcat', elem.textContent);
            elem.addEventListener('click', (event) => {
                event.preventDefault();
                getAllOrgsWithSubcategory(currentCategory, elem.getAttribute('subcat')).then(response1 => {
                    linkedRow.innerHTML = startRow + `&raquo; <b>${elem.getAttribute('subcat')}</b>`;
                    getList(response1);
                });
            });
        });
    }
    const subcat = window.localStorage.getItem('samvel_directory_received_subcat');
    if(subcat){
        getAllOrgsWithSubcategory(currentCategory,subcat).then(res1=>{
            linkedRow.innerHTML = startRow + `<b><a href="/views/category.html" style="font-family:sans-serif">${currentCategory}</a></b>`;
            window.localStorage.removeItem('samvel_directory_received_subcat');
            document.querySelector('#heading').textContent = subcat;
            getList(res1);
        });
    }
    else{
        getList(response);
    }
    function getList(response){
        console.log(response);
        if(response.success){
            posts.innerHTML = "";
            if(response.data.length > 0){
                /*
                const updateClicks = ()=>{
                    [...document.getElementsByClassName("update-button")].forEach(elem=>{
                        elem.addEventListener('click',(event)=>{
                            window.localStorage.setItem("samvel_directory_current_org",event.target.getAttribute("org-id"));
                            window.location.href="/views/organization-update.html";
                        });
                    });
                }
                const deleteClicks = ()=>{
                    [...document.getElementsByClassName("delete-button")].forEach(elem=>{
                        elem.addEventListener('click',(event)=>{
                            deleteOrganization(event.target.getAttribute("org-id")).then(data=>{
                                console.log(data);
                                if(data.success){
                                    window.location.reload();
                                }
                            });
                        });
                    });
                }
                */
                const singleClicks = ()=>{
                    [...document.querySelectorAll('.post h3')].forEach(elem=>{
                        elem.addEventListener('click',(event)=>{
                            window.localStorage.setItem("samvel_directory_current_org",event.target.getAttribute("org-id"));
                            getOneOrganization(event.target.getAttribute("org-id")).then(res1=>{
                                if(res1.data.price == "45000"){
                                    window.location.href="../../views/organization-single-4.html";
                                }else if(res1.data.price == "20000"){
                                    window.location.href="../../views/organization-single-2.html";
                                }
                                else if(res1.data.price == "0"){
                                    window.location.href="../../views/organization-single.html";
                                }
                                else if(res1.data.price == "30000"){
                                    window.location.href="../../views/organization-single-3.html";
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
                    speakerRus.classList.add('speaker');
                    speakerRus.classList.add('speaker-rus');
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
                document.querySelector('#counter').textContent = response.data.length;
            }else{
                const message = document.createElement("h3");
                message.textContent = "Not have organizations yet.";
                posts.append(message);
                document.querySelector('#counter').textContent = response.data.length;
            }
        }
    }

    const localeLangsSet = async()=>{
        [...document.querySelectorAll('.locale')].forEach(elem=>{
            elem.addEventListener('click',async(e)=>{
                e.preventDefault();
                const currentCategory = window.localStorage.getItem("samvel_directory_current_cat");
                if(currentCategory == "Գրադարաններ"){
                [...document.querySelectorAll('#organizations .post h3')].forEach(elem1=>{
                    if(elem.getAttribute('locale-lang') == "hy_AM"){
                        elem1.textContent = dictionary[currentCategory][elem1.getAttribute('org-id')]['arm'];
                    }
                    else if(elem.getAttribute('locale-lang') == "en_US"){
                        elem1.textContent = dictionary[currentCategory][elem1.getAttribute('org-id')]['eng'];
                    }else if(elem.getAttribute('locale-lang') == "ru_RU"){
                        elem1.textContent = dictionary[currentCategory][elem1.getAttribute('org-id')]['rus'];
                    }
                });
                }else {
                    const response = await setLanguageData(elem.getAttribute('locale-lang'));
                    if (response.success) {
                        window.location.reload();
                    }
                }
            })
        });
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

    getLocaleData().then(response=>{
        console.log(response);
        if(response.success){
            myRecognition.setLang(response.data.lang);
            console.log(response.data.lang);
            console.log(myRecognition.recognition.lang);
        }
        else{
            console.log("GoodBye");
        }
        document.querySelector("#voiceRecorder").addEventListener('click',()=>{
            document.querySelector('#voiceRecorder').style.color = "green";
            myRecognition.recognition.start();
        });

        myRecognition.recognition.addEventListener('result',(event)=>{
            document.querySelector('#voiceRecorder').style.color = "white"
            document.querySelector('input[name="search-query"]').value = event.results[0][0].transcript;
            window.localStorage.setItem("samvel_directory_search_query",document.querySelector('input[name="search-query"]').value);
            window.location.href = "search-result.html";
        });
    });


    await localeLangsSet();
});