export const sendMail = async(data)=>{
    const response = await fetch('http://localhost:2021/site/sendmail',{
        method:'POST',
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({...data})
    });
    return response.json();
}

export const searchCodeOrCountry = async(content)=>{
    const response = await fetch('http://localhost:2021/site/code?search='+content,{
        method:"GET"
    });
    return response.json();
}

export const getCategory = async(name)=>{
    console.log(name);
    const response = await fetch('http://localhost:2021/categories/'+name,{
        method:'GET'
    });
    return response.json();
}