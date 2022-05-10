import {searchCodeOrCountry} from "../api/site.js";
import {getLocaleData, setLanguageData} from "../api/localization.js";
import playSound from "../api/playSound.js";
import myRecognition from "../api/recognition.js";

window.addEventListener('load',async()=>{
    const myInput = document.querySelector('input[name="myInput"]');
    const searchButton = document.querySelector('#search');
    const resultsTable = document.querySelector('#results');
    const hcmSwitch = document.querySelector('#hcm-switch');

    let isHCMOn = false;

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
    const searchResult = ()=>{
        searchCodeOrCountry(myInput.value).then(res=>{
            resultsTable.innerHTML="<tr>\n" +
                "        <th class='code'>Կոդ</th>\n" +
                "        <th class='location'>Տարածաշրջան</th>\n" +
                "    </tr>";
            Object.keys(res.data).forEach(key=>{
                const tr = document.createElement("tr");
                const code = document.createElement("td");
                const country = document.createElement("td");
                code.textContent = key;
                country.textContent = res.data[key];
                tr.append(code);
                tr.append(country);
                resultsTable.append(tr);
            });
            if(isHCMOn){
                const ths = [...document.querySelectorAll('#container table th')];
                const tds = [...document.querySelectorAll('#container table td')];
                ths.forEach(elem=>{
                    elem.style.color = "black";
                    elem.style.backgroundColor = "yellow";
                });
                tds.forEach(elem=>elem.style.color = "white");
            }
        })
    }

    const setHighContrastMode = (change)=>{
        const menuItems = [...document.querySelectorAll('#menu .col1 a'),
            ...document.querySelectorAll('#menu .col2 a'),
            ...document.querySelectorAll('#menu .col3 a')];
        const menu = document.querySelector('#menu');
        const ths = [...document.querySelectorAll('#container table th')];
        const tds = [...document.querySelectorAll('#container table td')];
        const formHeading = document.querySelector('#input-form label');
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
            formHeading.style.color = "yellow";
            ths.forEach(elem=>{
                elem.style.color = "black";
                elem.style.backgroundColor = "yellow";
            });
            tds.forEach(elem=>elem.style.color = "white");
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
            formHeading.style.color = "blue";
            ths.forEach(elem=>{
                elem.style.color = "white";
                elem.style.backgroundColor = "dodgerblue";
            });
            tds.forEach(elem=>elem.style.color = "black");
        }
    }

    myRecognition.setLang('hy-AM');

    searchButton.addEventListener('click',searchResult);

    [...document.querySelectorAll('.yellow-hover')].forEach(elem=>{
        const currentColor = elem.style.color;
        elem.addEventListener('mouseover',(e)=>e.target.style.color="#FFA825");
        elem.addEventListener('mouseout',(e)=>e.target.style.color=currentColor);
    });

    [...document.querySelectorAll('.red-click')].forEach(elem=>{
        elem.addEventListener('click',(e)=>e.target.style.color = "red");
    });
    document.querySelector('#voiceRecorder').addEventListener('click',()=>{
        document.querySelector("#voiceRecorder").style.color = "red";
        myRecognition.recognition.start();
    });
    myRecognition.recognition.addEventListener('result',(event)=>{
        document.querySelector("#voiceRecorder").style.color = "white";
        document.querySelector('input[name="myInput"]').value = event.results[0][0].transcript;
        searchResult();
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
        isHCMOn = e.target.checked;
        setHighContrastMode(isHCMOn);
    });
    await localeLangsSet();
});