import {getOneOrganization} from "../api/organization.js";
import {createTag, getOneTag, updateTag} from "../api/tags.js";
import {getLocaleData, setLanguageData} from "../api/localization.js";
import {createComment, getAllComments} from "../api/comments.js";

const weekDays = {
    monday:"Երկ",
    tuesday:"Երք",
    wednesday:"Չրք",
    thursday:"Հնգ",
    friday:"Ուրբ",
    saturday:"Շբթ",
    sunday:"Կիր"
};

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
    //const comments = document.querySelector('#comments');
    //const commentInput = document.querySelector('textarea[name="comment"]');
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
    getOneOrganization(orgId).then(res=>{
        document.querySelector('#category').textContent = res.data.category;
        document.querySelector('#subcategory').textContent = res.data.subcategory;
        document.querySelector('#subcategory').setAttribute("subcat-href",res.data.subcategory);
        document.querySelector('#organizationName').textContent = res.data.name;
        document.querySelector('#address').textContent = res.data.address;
        if(res.data.more){
            const activities = res.data.more.substr(1).replace(/•/g,"<br>•");
            document.querySelector("#activities").innerHTML = "•" + activities;
        }
        document.querySelector('#search').addEventListener('click',()=>{
            const query = document.querySelector('input[name="search-query"]').value;
            if(query){
                window.localStorage.setItem('samvel_directory_search_query',query);
                window.location.href = "/views/search-result.html";
            }
        });
        /*
        if(res.data.email){
            document.querySelector('#email').textContent = res.data.email;
        }else{
            document.querySelector('#email').parentElement.style.display = "none";
        }
         */

            document.querySelector('#website').href = res.data.websiteUrl;
            document.querySelector('#website').setAttribute('target',"_blank");
            document.querySelector('#website').textContent = res.data.websiteUrl;

        document.querySelector('#director').textContent = res.data.director;
        document.querySelector('#description').textContent = res.data.description;

        document.querySelector('#fax').textContent = res.data.fax;

        /*
        if(res.data.facebookUrl){
            document.querySelector('#facebook-url').setAttribute('href',res.data.facebookUrl);
        }else{
            document.querySelector('#facebook-url').style.display = "none";
        }

        if(res.data.twitterUrl){
            document.querySelector('#twitter-url').setAttribute('href',res.data.twitterUrl);
        }else{
            document.querySelector('#twitter-url').style.display = "none";
        }

        if(res.data.instagramUrl){
            document.querySelector('#instagram-url').setAttribute('href',res.data.instagramUrl);
        }else{
            document.querySelector('#instagram-url').style.display = "none";
        }
         */

        res.data.phones.forEach(phone=>{
            if(phone !== "undefined"){
                const li = document.createElement('li');
                li.textContent = phone;
                document.querySelector('#phones').append(li);
            }
        });

        //document.querySelector('#shortLink').textContent = res.data.shortLink;

        const dateUpdate = new Date(res.data.updatedAt);
        const year = dateUpdate.getFullYear();
        const month = (dateUpdate.getMonth() + 1 < 10) ? "0" + (dateUpdate.getMonth() + 1) : dateUpdate.getMonth() + 1;
        const day = (dateUpdate.getDate() < 10) ? "0" + dateUpdate.getDate() : dateUpdate.getDate();
        document.querySelector('#data-update').textContent = `${day}.${month}.${year}`;

        document.title = `${res.data.name} | DIR INFO CALL 3773`;

        console.log(res.data);
        console.log(res.data.photos);
        if(openCloseBool(res.data.workingStartTime,res.data.workingEndTime) || res.data.workingStartTime == res.data.workingEndTime){
            document.querySelector('#openClose').textContent = "ԲԱՑ Է";
        }
        else{
            document.querySelector('#openClose').textContent = "ՓԱԿ Է";
        }
        console.log(res.data);
        res.data.tags.forEach(tagId=>{
            getOneTag(tagId).then(res1=>{
                const tagMain = document.createElement('div');
                const tagLink = document.createElement('button');
                const deleteTag = document.createElement('span');
                console.log(res1);
                tagLink.setAttribute('tag-id',res1.data._id);
                tagLink.textContent = res1.data.content;
                deleteTag.setAttribute('tag-id',res1.data._id);
                deleteTag.textContent = 'x';
                tagMain.append(tagLink);
                tagMain.append(deleteTag);
                document.querySelector('#tags').insertBefore(tagMain,newTag);
                tagLink.addEventListener('click',()=>{
                    window.localStorage.setItem('samvel_directory_current_tag', res1.data._id);
                    window.location.href="/views/tag-results.html";
                });
                deleteTag.addEventListener('click', ()=>{
                    updateTag(res1.data._id).then(res2=>{
                        console.log(res2);
                        tagMain.parentElement.removeChild(tagMain);
                    });
                });
            });
        })
    });
    document.querySelector('#subcategory').addEventListener('click',(event)=>{
        event.preventDefault();
        window.localStorage.setItem('samvel_directory_received_subcat',event.target.getAttribute('subcat-href'));
        window.localStorage.setItem('samvel_directory_current_cat', document.querySelector('#category').textContent)
        console.log(window.localStorage.getItem('samvel_directory_received_subcat'));
        console.log(window.localStorage.getItem('samvel_directory_current_cat'));
        window.location.href = '/views/category.html';
    });
    document.querySelector('#category').addEventListener('click',(event)=>{
        event.preventDefault();
        window.localStorage.setItem('samvel_directory_current_cat',event.target.textContent);
        console.log(window.localStorage.getItem('samvel_directory_current_cat'));
        window.location.href = event.target.getAttribute('href');
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

    const hcmToogle = document.querySelector('#hcm-switch');

    const setHighContrastMode = (change)=>{
        const menuItems = [...document.querySelectorAll('#menu .col1 a'),
            ...document.querySelectorAll('#menu .col2 a'),
            ...document.querySelectorAll('#menu .col3 a')];
        const menu = document.querySelector('#menu');
        const column1 = document.querySelector('#content .col1');
        const activities = document.querySelector('#activities');
        if(window.localStorage.getItem('samvel_directory_user_token')){
            const usernameSpan = document.querySelector('#usernameSpan');
            usernameSpan.style.color = change ? "yellow" : "white";
        }
        column1.style.backgroundColor = change ? "yellow" : "powderblue";
        activities.style.backgroundColor = change ? "yellow" : "#dde9db";
        if(change){
            document.body.style.backgroundColor = "black";
            [...document.querySelectorAll('.black-texted')].forEach(elem=>{
                elem.style.color = "white";
            });
            [...document.querySelectorAll('.red-texted')].forEach(elem=>{
                elem.style.color = "yellow";
            });
            [...document.querySelectorAll('.link-texted')].forEach(elem=>{
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
            [...document.querySelectorAll('.link-texted')].forEach(elem=>{
                elem.style.color = "dodgerblue";
            });
            menu.style.backgroundColor="dodgerblue";
            menuItems.forEach(elem=>{elem.style.color = "white"; elem.style.backgroundColor="blue"});
        }
    }
    hcmToogle.addEventListener('change',(e)=>{
        setHighContrastMode(e.target.checked);
    });

    await localeLangsSet();
});