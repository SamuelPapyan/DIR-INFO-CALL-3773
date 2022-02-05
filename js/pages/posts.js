import {getPosts,deletePost} from "../api/posts.js";

window.addEventListener('load',async()=>{

    const posts = document.querySelector("#posts");
    const response = await getPosts();
    console.log(response);
    if(response.success){
        if(response.data.length > 0){
            const updateClicks = ()=>{
                [...document.getElementsByClassName("update-button")].forEach(elem=>{
                    elem.addEventListener('click',(event)=>{
                        window.localStorage.setItem("postId",event.target.getAttribute("post-id"));
                        window.location.href="/views/post-update.html";
                    });
                });
            }
            const deleteClicks = ()=>{
                [...document.getElementsByClassName("delete-button")].forEach(elem=>{
                    elem.addEventListener('click',(event)=>{
                        deletePost(event.target.getAttribute("post-id")).then(data=>{
                            console.log(data);
                            if(data.success){
                                window.location.reload();
                            }
                        });
                    });
                });
            }
            [...response.data].forEach(post =>{
                const postBox = document.createElement("div");
                postBox.classList.add("post");
                const title = document.createElement("h3");
                const image = document.createElement("img");
                const description = document.createElement("p");
                const updateButton = document.createElement('button');
                const deleteButton = document.createElement('button');
                updateButton.textContent = "Update";
                updateButton.classList.add("update-button");
                updateButton.setAttribute("post-id",post._id);
                deleteButton.textContent = "Delete";
                deleteButton.classList.add("delete-button");
                deleteButton.setAttribute("post-id",post._id);
                title.textContent = post.title;
                image.src = `../uploads/${post.image}`;
                description.textContent = post.description;
                postBox.append(title);
                postBox.append(image);
                postBox.append(description);
                postBox.append(updateButton);
                postBox.append(deleteButton);
                posts.append(postBox);
            });
            updateClicks();
            deleteClicks();
        }else{
            const message = document.createElement("h3");
            message.textContent = "Not have post yet.";
            posts.append(message);
        }
    }


});