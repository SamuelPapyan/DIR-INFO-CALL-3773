export const findAllUsers = async()=>{
    const response = await fetch('http://localhost:2021/user_actions?uaType=login',{
        method:'GET'
    });
    return response.json();
}

export const findAllUsersSignUps = async()=>{
    const response = await fetch('http://localhost:2021/user_actions?uaType=signup',{
        method:'GET'
    });
    return response.json();
}

export const editUA = async(id, comment)=>{
    const response = await fetch('http://localhost:2021/user_actions/'+id,{
        method:'PUT',
        headers:{
            'content-Type':"application/json"
        },
        body:JSON.stringify({
            comment
        })
    });
    return response.json();
}