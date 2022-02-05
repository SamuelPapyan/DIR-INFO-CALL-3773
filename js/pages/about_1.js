import {getLocaleData, setLanguageData} from "../api/localization.js";

window.addEventListener('load',async()=>{
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
    getLocaleData().then(response=>{
        console.log(response);
        if(response.success){
            document.querySelector('#localize-about_us_info').src = `../images/${response.data.about_us_info}`
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