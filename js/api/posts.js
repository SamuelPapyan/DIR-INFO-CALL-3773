export const createPost = async(formData)=>{
    const response = await fetch("http://localhost:2021/posts",{
        method:"POST",
        body:formData
    });
    return response.json();
}

export const updatePost = async(formData, id)=>{
    const response = await fetch("http://localhost:2021/posts/"+id,{
        method:"PUT",
        body:formData
    });
    return response.json();
}

export const deletePost = async(id)=>{
    const response = await fetch("http://localhost:2021/posts/"+id,{
        method:"DELETE"
    });
    return response.json();
}

export const getOnePost = async(id)=>{
    const response = await fetch("http://localhost:2021/posts/"+id,{
        method:"GET"
    });
    return response.json();
}

export const getPosts = async(formData)=>{
    const response = await fetch("http://localhost:2021/posts",{
        method:"GET",
    });
    return response.json();
}