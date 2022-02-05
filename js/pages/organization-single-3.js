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
        document.querySelector('#orgLogo').src = `../uploads/${res.data.logo}`;
        document.querySelector('#address').textContent = res.data.address;

        document.querySelector('#search').addEventListener('click',()=>{
            const query = document.querySelector('input[name="search-query"]').value;
            if(query){
                window.localStorage.setItem('samvel_directory_search_query',query);
                window.location.href = "/views/search-result.html";
            }
        });

        if(res.data.email){
            document.querySelector('#email').textContent = res.data.email;
        }else{
            document.querySelector('#email').parentElement.style.display = "none";
        }


        document.querySelector('#website').href = res.data.websiteUrl;
        document.querySelector('#website').setAttribute('target',"_blank");
        document.querySelector('#website').textContent = res.data.websiteUrl;

        document.querySelector('#description').textContent = res.data.description;

        if(res.data.fax){
            document.querySelector('#fax').textContent = res.data.fax;
        }else{
            document.querySelector('#fax').parentElement.style.display = "none";
        }

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


        res.data.phones.forEach(phone=>{
            if(phone){
                const li = document.createElement('li');
                li.textContent = phone;
                document.querySelector('#phones').append(li);
            }
        });

        document.querySelector('#shortLink').textContent = res.data.shortLink;

        if(res.data.workingDays.length == 7 && res.data.workingStartTime == res.data.workingEndTime){
            document.querySelector('#timeColide').innerHTML = `<p style="text-align:center;"><img width="100" height="40" src="../images/24-7.png"></p>`
        }else{
            if(res.data.workingDays.length < 7){
                document.querySelector('#working-days').textContent = res.data.workingDays.map(value=>{
                    return weekDays[value];
                }).join(" ");
            }else{
                document.querySelector('#working-days').textContent = "Ամեն օր";
            }
            if(res.data.workingStartTime != res.data.workingEndTime){
                document.querySelector('#working-time').textContent = `${res.data.workingStartTime} - ${res.data.workingEndTime}`;
            }
            else{
                document.querySelector('#working-time').textContent = `Շուրջօրյա`;
            }
        }
        console.log(res.data);
        console.log(res.data.photos);
        /*
        document.querySelector('#photo1').src = res.data.photos[0];
        document.querySelector('#photo2').src = res.data.photos[1];
        document.querySelector('#photo3').src = res.data.photos[2];
        document.querySelector('#photo4').src = res.data.photos[3];
        document.querySelector('#photo5').src = res.data.photos[4];
        */
        const restDays = Object.keys(weekDays).filter(
            function(e) {
                return this.indexOf(e) < 0;
            },
            res.data.workingDays
        );

        const dateUpdate = new Date(res.data.updatedAt);
        const year = dateUpdate.getFullYear();
        const month = (dateUpdate.getMonth() + 1 < 10) ? "0" + (dateUpdate.getMonth() + 1) : dateUpdate.getMonth() + 1;
        const day = (dateUpdate.getDate() < 10) ? "0" + dateUpdate.getDate() : dateUpdate.getDate();
        document.querySelector('#data-update').textContent = `${day}.${month}.${year}`;

        console.log(restDays);
        if(document.querySelector('#rest-days-box')){
            if(restDays.length > 0){
                document.querySelector('#rest-days').textContent = restDays.map(value=>{
                    return weekDays[value];
                }).join(" ");
            }else{
                document.querySelector('#rest-days-box').style.display = "none";
            }
        }

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
    await localeLangsSet();
});