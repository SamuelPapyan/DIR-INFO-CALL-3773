import {createPost} from "../api/posts.js";
import {getLocaleData, setLanguageData} from "../api/localization.js";

window.addEventListener('load',async()=>{
    const title = document.querySelector('input[name="title"]');
    const image = document.querySelector('input[name="image"]');
    const description = document.querySelector('input[name="description"]');
    const button = document.querySelector('#create');
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
    button.addEventListener('click',async()=>{
        const formData = new FormData();
        formData.append('title',title.value);
        formData.append('image',image.files[0]);
        formData.append('description',description.value);
        createPost(formData).then(data=>{
            console.log(data);
            if(data.success){
                console.log(data.message);
            }
            else{
                console.log("Something went wrong");
            }
        });
    });
    getLocaleData().then(response=>{
        if(response.success){
            console.log(response);
            console.log("Hello");
            console.log(document.querySelector('#localize-createPost'));
            document.querySelector('#localize-createPost').textContent = response.data.createPost
        }
        else{
            console.log("GoodBye");
        }
    });
    await localeLangsSet();
});