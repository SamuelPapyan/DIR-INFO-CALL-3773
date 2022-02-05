import {getAllOrgsWithSubcategory, getOneOrganization} from "../api/organization.js";
import {createTag, getOneTag, updateTag} from "../api/tags.js";
import {getLocaleData, setLanguageData} from "../api/localization.js";
import {createComment, getAllComments} from "../api/comments.js";
import {getCategory} from "../api/site.js";

function openCloseBool(start,end){
    const currDate = new Date();
    const startHours = +start.substr(0,2);
    const startMinutes = +start.substr(3,2);
    const endHours = +end.substr(0,2);
    const endMinutes = +end.substr(3,2);
    const bool1 = (currDate.getHours() >= startHours);
    const bool2 = (currDate.getHours() == startHours && currDate.getMinutes() >= startMinutes);
    const bool3 = (currDate.getHours() == endHours && currDate.getMinutes() < endMinutes);
    const bool4 = (currDate.getHours() < endHours);
    return bool2 || bool1 && bool3 || bool4;
}

window.addEventListener('load',async()=>{

    const orgId = window.localStorage.getItem('samvel_directory_current_org');
    const currentCategory = window.localStorage.getItem('samvel_directory_current_cat');
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
    getCategory(currentCategory).then(res=>{
        console.log(res);
        res.data.subcategories.forEach(subcat=>{
            const link = document.querySelector('a');
            const li = document.createElement('li');
            link.href = "#";
            link.textContent = subcat;
            li.append(link);
            subcats.append(li);
        });
        [...document.querySelectorAll('#content .col1 ul li a')].forEach((elem)=>{
            elem.setAttribute('subcat',elem.textContent);
            elem.addEventListener('click',(event)=>{
                event.preventDefault();
                getAllOrgsWithSubcategory(currentCategory, elem.getAttribute('subcat')).then(response1=>{
                    linkedRow.innerHTML = startRow + `&raquo; <b>${elem.getAttribute('subcat')}</b>`;
                    getList(response1);
                });
            });
        });
    });
    getOneOrganization(orgId).then(res=>{
        document.querySelector('#organizationName').textContent = res.data.name;
        document.querySelector('#org-category').textContent = res.data.category;
        document.querySelector('#org-subcategory').textContent = res.data.subcategory;
        document.querySelector('#orgLogo').src = `../../uploads/${res.data.logo}`;
        document.querySelector('#address').textContent = res.data.address;
        document.querySelector('#email').textContent = res.data.email;
        document.querySelector('#website').textContent = res.data.websiteUrl;
        document.querySelector('#director').textContent = res.data.director;
        document.querySelector('#employees').textContent = res.data.employees;
        document.querySelector('#foundationYear').textContent = res.data.foundationYear;
        document.querySelector('#startTime').textContent = res.data.workingStartTime;
        document.querySelector('#endTime').textContent = res.data.workingEndTime;
        document.querySelector('#description').textContent = res.data.description;
        document.querySelector('#fax').textContent = res.data.fax;
        document.querySelector('#facebook-url').setAttribute('href',res.data.facebookUrl);
        document.querySelector('#twitter-url').setAttribute('href',res.data.twitterUrl);
        document.querySelector('#instagram-url').setAttribute('href',res.data.instagramUrl);
        document.querySelector('#map').setAttribute('href',res.data.map);
        if(openCloseBool(res.data.workingStartTime,res.data.workingEndTime)){
            document.querySelector('#openClose').style.color = "green";
            document.querySelector('#openClose').textContent = "ԲԱՑ Է";
        }
        else{
            document.querySelector('#openClose').style.color = "red";
            document.querySelector('#openClose').textContent = "ՓԱԿ Է";
        }
        res.data.phones.forEach(phone=>{
            const li = document.createElement('li');
            li.textContent = phone;
            document.querySelector('#phones').append(li);
        });
        res.data.workingDays.forEach(day=>{
            const li = document.createElement('li');
            li.textContent = day;
            document.querySelector('#working-days').append(li);
        });

    });
    getLocaleData().then(response=>{
        if(response.success){
            //document.querySelector('#localize-createOrg').textContent = response.data.createOrg
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