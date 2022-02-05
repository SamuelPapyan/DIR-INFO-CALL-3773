import {getAllOrganizations, deleteOrganization} from "../api/organization.js";

window.addEventListener('load',async()=>{

    const posts = document.querySelector("#organizations");
    const response = await getAllOrganizations();
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
            [...response.data].forEach(post =>{
                const postBox = document.createElement("div");
                postBox.classList.add("post");
                const name = document.createElement("h3");
                const logo = document.createElement("img");
                const description = document.createElement("p");
                const updateButton = document.createElement('button');
                const deleteButton = document.createElement('button');
                name.setAttribute("org-id",post._id);
                updateButton.textContent = "Update";
                updateButton.classList.add("update-button");
                updateButton.setAttribute("org-id",post._id);
                deleteButton.textContent = "Delete";
                deleteButton.classList.add("delete-button");
                deleteButton.setAttribute("org-id",post._id);
                name.textContent = post.name;
                logo.src = `../uploads/${post.logo}`;
                description.textContent = post.description;
                postBox.append(name);
                postBox.append(logo);
                postBox.append(description);
                postBox.append(updateButton);
                postBox.append(deleteButton);
                posts.append(postBox);
            });
            updateClicks();
            deleteClicks();
            singleClicks();
        }else{
            const message = document.createElement("h3");
            message.textContent = "Not have organizations yet.";
            posts.append(message);
        }
    }

});