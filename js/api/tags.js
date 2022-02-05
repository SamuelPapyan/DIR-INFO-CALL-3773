export const getAllTags = async()=>{
    const response = await fetch('http://localhost:2021/tags',{
        method:'GET'
    });
    return response.json();
}

export const updateTag = async(id)=>{
    const orgId = window.localStorage.getItem("samvel_directory_current_org");
    const response = await fetch('http://localhost:2021/tags/'+id+'?orgId='+orgId,{
        method:'PUT',
        headers:{
            'Content-Type':'application/json'
        }
    });
    return response.json();
}

export const deleteTag = async(id)=>{
    const response = await fetch('http://localhost:2021/tags/'+id,{
        method:'DELETE',
    });
    return response.json();
}

export const createTag = async(orgId, content)=>{
    const response = await fetch('http://localhost:2021/tags',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            orgId,
            content
        })
    });
    return response.json();
}

export const getOneTag = async(id)=>{
    const response = await fetch('http://localhost:2021/tags/'+id,{
        method:'GET'
    });
    return response.json();
}