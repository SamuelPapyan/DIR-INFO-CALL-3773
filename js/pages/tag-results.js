import {getOneOrganization, deleteOrganization} from "../api/organization.js";
import {getOneTag} from "../api/tags.js";

window.addEventListener('load',async()=>{
    const tagId = window.localStorage.getItem('samvel_directory_current_tag');
    const posts = document.querySelector("#organizations");
    const response = await getOneTag(tagId);
    console.log(response);
    if(response.success){
        document.querySelector('#heading').textContent = `Search results from tag ${response.data.content}`;
        if(response.data.organizations.length > 0){
            const updateClicks = ()=>{
                console.log("update clicks");
                console.log(document.getElementsByClassName("update-button").length);
                [...document.getElementsByClassName("update-button")].forEach(elem=>{
                    elem.addEventListener('click',(event)=>{
                        window.localStorage.setItem("samvel_directory_current_org",event.target.getAttribute("org-id"));
                        window.location.href="/views/organization-update.html";
                    });
                });
            }
            const deleteClicks = ()=>{
                console.log("delete clicks");
                console.log(document.getElementsByClassName("delete-button").length);
                [...document.getElementsByClassName("delete-button")].forEach(elem=>{
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
                [...document.querySelectorAll('.post h3')].forEach(elem=>{
                    elem.addEventListener('click',(event)=>{
                        window.localStorage.setItem("samvel_directory_current_org",event.target.getAttribute("org-id"));
                        window.location.href="../../views/organization-single-4.html";
                    })
                });
            }
            [...response.data.organizations].forEach(orgId =>{
                getOneOrganization(orgId).then(res=>{
                    if(res.success){
                        const postBox = document.createElement("div");
                        postBox.classList.add("post");
                        const name = document.createElement("h3");
                        const logo = document.createElement("img");
                        const description = document.createElement("p");
                        const updateButton = document.createElement('button');
                        const deleteButton = document.createElement('button');
                        name.setAttribute("org-id",res.data._id);
                        updateButton.textContent = "Update";
                        updateButton.classList.add("update-button");
                        updateButton.setAttribute("org-id",res.data._id);
                        deleteButton.textContent = "Delete";
                        deleteButton.classList.add("delete-button");
                        deleteButton.setAttribute("org-id",res.data._id);
                        name.textContent = res.data.name;
                        logo.src = `../uploads/${res.data.logo}`;
                        description.textContent = res.data.description;
                        postBox.append(name);
                        postBox.append(logo);
                        postBox.append(description);
                        postBox.append(updateButton);
                        postBox.append(deleteButton);
                        posts.append(postBox);
                    }
                    console.log(document.getElementsByClassName("update-button").length);
                    console.log(document.getElementsByClassName("delete-button").length);
                    updateClicks();
                    deleteClicks();
                    singleClicks();
                });
            });
        }else{
            const message = document.createElement("h3");
            message.textContent = "Not have organizations yet.";
            posts.append(message);
        }
    }

});