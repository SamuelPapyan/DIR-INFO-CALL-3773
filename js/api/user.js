export const getCurrentUserData = async () =>{
    const token = window.localStorage.getItem('samvel_directory_user_token');
    const response = await fetch('http://localhost:2021/users/current',{
        method:'POST',
        headers:{
            'Content-Type':"application/json",
            "token":token
        }
    });
    return response.json();
}

export const findUsers = async (name) => {
    const token = window.localStorage.getItem('samvel_directory_user_token');
    const response = await fetch('http://localhost:2021/users?name=' + name, {
        method: 'GET',
        headers: {
            'Content-Type': "application/json",
            "token": token
        }
    });

    return response.json();
}

export const updateAccount = async (formData) => {
    const token = window.localStorage.getItem('samvel_directory_user_token');
    const response = await fetch('http://localhost:2021/users/current', {
        method: 'PUT',
        headers: {
            'token': token
        },
        body: formData
    });
    return response.json();
}