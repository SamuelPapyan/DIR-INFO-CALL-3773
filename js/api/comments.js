export const getAllComments = async()=>{
    const orgId = window.localStorage.getItem("samvel_directory_current_org");
    const response = await fetch('http://localhost:2021/comments?orgId='+orgId,{
        method:"GET",
    });
    return response.json();
}

export const createComment = async(content)=>{
    const token = window.localStorage.getItem("samvel_directory_user_token");
    const orgId = window.localStorage.getItem("samvel_directory_current_org");
    const response = await fetch('http://localhost:2021/comments?orgId='+orgId,{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            "token":token
        },
        body:JSON.stringify({
            content,
            orgId
        })
    });
    return response.json();
}

export const editComment = async(id,content)=>{
    const response = await fetch('http://localhost:2021/comments/'+id,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            content
        })
    });
    return response.json();
}

export const deleteComment = async(id)=>{
    const response = await fetch('http://localhost:2021/comments/'+id,{
        method:"DELETE",
    });
    return response.json();
}