import {getOnePost, updatePost} from "../api/posts.js";

window.addEventListener('load',async()=>{
    const title = document.querySelector('input[name="title"]');
    const image = document.querySelector('input[name="image"]');
    const description = document.querySelector('input[name="description"]');
    const button = document.querySelector('#update');
    const imagePreview = document.querySelector('#imagePreview');
    const postId = window.localStorage.getItem('postId');
    getOnePost(postId).then(response=>{
        console.log(response);
        title.value = response.data.title;
        imagePreview.src = `../uploads/${response.data.image}`;
        description.value = response.data.description;
    });
    button.addEventListener('click',async()=>{
        const formData = new FormData();
        formData.append('title',title.value);
        formData.append('image',image.files[0]);
        formData.append('description',description.value);
        updatePost(formData,postId).then(data=>{
            console.log(data);
            if(data.success){
                console.log(data.message);
            }
            else{
                console.log("Something went wrong");
            }
        });
    });
});