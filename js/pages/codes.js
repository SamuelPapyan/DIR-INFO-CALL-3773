import {searchCodeOrCountry} from "../api/site.js";
import {getLocaleData, setLanguageData} from "../api/localization.js";

window.addEventListener('load',async()=>{
    const myInput = document.querySelector('input[name="myInput"]');
    const searchButton = document.querySelector('#search');
    const resultsTable = document.querySelector('#results');
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
    searchButton.addEventListener('click',()=>{
        searchCodeOrCountry(myInput.value).then(res=>{
            console.log(res);
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
        })
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
    await localeLangsSet();
});