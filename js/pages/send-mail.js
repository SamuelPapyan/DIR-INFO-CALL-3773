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
    await localeLangsSet();
});