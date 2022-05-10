import {createOrganization} from "../api/organization.js";
import {getLocaleData, setLanguageData} from "../api/localization.js";

window.addEventListener('load',async()=>{
    const orgName = document.querySelector('input[name="orgName"]');
    const orgLogo = document.querySelector('input[name="orgLogo"]');
    const address = document.querySelector('input[name="address"]');
    const phone = document.querySelector('input[name="phone"]');
    const phone2 = document.querySelector('input[name="phone-2"]');
    const phone3 = document.querySelector('input[name="phone-3"]');
    const phone4 = document.querySelector('input[name="phone-4"]');
    const email = document.querySelector('input[name="email"]');
    const webstieURL = document.querySelector('input[name="website-url"]');
    const director = document.querySelector('input[name="director"]');
    const employees = document.querySelector('select[name="employees"]');
    const price = document.querySelector('select[name="price"]');
    const foundationYear = document.querySelector('input[name="foundationYear"]');
    const workingDays = document.querySelector('#working-days');
    const description = document.querySelector('textarea[name="description"]');
    const startTime = document.querySelector('input[name="start-time"]');
    const endTime = document.querySelector('input[name="end-time"]');
    const fax = document.querySelector('input[name="fax"]');
    const facebookURL = document.querySelector('input[name="facebook-url"]');
    const twitterURL = document.querySelector('input[name="twitter-url"]');
    const instagramURL = document.querySelector('input[name="instagram-url"]');
    const facebook = document.querySelector('input[name="facebook-url"]');
    const photos = [...document.querySelectorAll('.photo')];
    const video = document.querySelector('input[name="video"]');
    const map = document.querySelector('input[name="map"]');
    const more = document.querySelector('textarea[name="more"]');
    const category = document.querySelector('input[name="category"]');
    const button = document.querySelector('#create');
    const subcategory = document.querySelector('input[name="subcategory"]');
    const shortLink = document.querySelector('input[name="short-link"]');
    const hasLink = document.querySelector('input[name="has-link"]');
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
        formData.append('name',orgName.value);
        formData.append('image',orgLogo.files[0]);
        formData.append('address',address.value);
        formData.append('phones',[phone.value, phone2.value, phone3.value, phone4.value]);
        formData.append('email',email.value);
        formData.append('websiteUrl',webstieURL.value);
        formData.append('director',director.value);
        formData.append('employees',employees.value);
        formData.append('price',price.value);
        formData.append('foundationYear',foundationYear.value);
        const days = [...workingDays.children].filter(elem=>{
            return elem.tagName === 'INPUT' && elem.checked;
        }).map(elem=>{
            return elem.value;
        });
        formData.append('workingDays',days);
        const photoLinks = photos.map(elem=>{
            return elem.value;
        });
        formData.append('photos',photoLinks);
        formData.append('video',video.value);
        formData.append('startTime',startTime.value);
        formData.append('endTime',endTime.value);
        formData.append('description',description.value);
        formData.append('fax',fax.value);
        formData.append('facebookUrl',facebookURL.value);
        formData.append('twitterUrl',twitterURL.value);
        formData.append('instagramUrl',instagramURL.value);
        formData.append('map',map.value);
        formData.append('more',more.value);
        formData.append('category',category.value);
        formData.append('subcategory',subcategory.value);
        formData.append('hasLink',hasLink.checked);
        formData.append('shortLink',shortLink.value);
        createOrganization(formData).then(res=>{
            console.log(res);
            if(res.success){
                console.log(res.message);
                window.localStorage.setItem('samvel_directory_current_org',res.data._id);
                switch(price.value){
                    case "0": window.location.href = "/views/organization-single.html";break;
                    case "20000": window.location.href = "/views/organization-single-2.html";break;
                    case "30000": window.location.href = "/views/organization-single-3.html";break;
                    case "45000": window.location.href = "/views/organization-single-4.html";break;
                }
            }
            else{
                console.log("Something went wrong");
            }
        });
    });

    const hcmToogle = document.querySelector('#hcm-switch');

    const setHighContrastMode = (change)=>{
        const menuItems = [...document.querySelectorAll('#menu .col1 a'),
            ...document.querySelectorAll('#menu .col2 a'),
            ...document.querySelectorAll('#menu .col3 a')];
        const menu = document.querySelector('#menu');
        const mainLabels = [...document.querySelectorAll('.main-label')];
        const weekDaysLabels = [...document.querySelectorAll('#working-days span')];
        const heading = document.querySelector('#localize-createOrg');
        if(window.localStorage.getItem('samvel_directory_user_token')){
            const usernameSpan = document.querySelector('#usernameSpan');
            usernameSpan.style.color = change ? "yellow" : "white";
        }
        [heading, ...mainLabels].forEach(elem=>{
            elem.style.color = change ? "yellow" : "blue";
        });
        weekDaysLabels.forEach(elem=>{
            elem.style.color = change ? "white" : "black";
        })
        button.style.color = change ? "black" : "white";
        button.style.backgroundColor = change ? "yellow" : "blue";
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
    hcmToogle.addEventListener('change',(e)=>{
        setHighContrastMode(e.target.checked);
    });

    getLocaleData().then(response=>{
        if(response.success){
            document.querySelector('#localize-createOrg').textContent = response.data.createOrg
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