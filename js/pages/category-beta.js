import {
    getAllOrgsByCategory,
    deleteOrganization,
    getAllOrgsWithSubcategory
} from "../api/organization.js";

window.addEventListener('load',async()=>{
    const currentCategory = window.localStorage.getItem('samvel_directory_current_cat');
    const posts = document.querySelector("#organizations");
    const response = await getAllOrgsByCategory(currentCategory);
    if(window.location.href == "http://localhost:3000/views/category_1.html"){
        getList(response);
        document.querySelector('#content .col2 h1').textContent = currentCategory;
    }
    else if(window.location.href == 'http://localhost:3000/views/subcats/subcat1_2.html'){
        getAllOrgsWithSubcategory(currentCategory, 'Թատրոններ').then(response1=>{
            getList(response1);
        });
    }
    function getList(response){
        console.log(response);
        if(response.success){
            if(response.data.length > 0){
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
                        console.log(elem);
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
                const singleClicks = ()=>{
                    [...document.querySelectorAll('.post[has-link="true"] h2')].forEach(elem=>{
                        elem.addEventListener('click',(event)=>{
                            if(event.target.getAttribute('org-id')) {
                                window.localStorage.setItem("samvel_directory_current_org", event.target.getAttribute("org-id"));
                                window.location.href = "/views/orgs/org1_5.html";
                            }
                        })
                    });
                }
                [...response.data].forEach(post =>{
                    const postBox = document.createElement("div");
                    postBox.classList.add("post");
                    if(post.hasLink){
                        postBox.setAttribute('has-link',"true");
                    }
                    const name = document.createElement("h2");
                    const description = document.createElement('i');
                    const p = document.createElement('p');
                    const address = document.createElement('p');
                    name.setAttribute("org-id",post._id);
                    name.textContent = post.name + " / ";
                    description.textContent = post.description;
                    p.append(description);
                    address.textContent = post.address;
                    postBox.append(name);
                    postBox.append(p);
                    postBox.append(address);
                    posts.append(postBox);
                });
                updateClicks();
                deleteClicks();
                console.log("single click");
                singleClicks();
            }else{
                const message = document.createElement("h3");
                message.textContent = "Not have organizations yet.";
                posts.append(message);
            }
        }
    }
    document.querySelector('#blog-link').addEventListener('click',(event)=>{
        event.preventDefault();
        if(window.localStorage.getItem('samvel_directory_user_token')){
            window.location.href = "/views/blog.html";
        }
        else{
            window.location.href = "/views/login.html";
        }
    });
});