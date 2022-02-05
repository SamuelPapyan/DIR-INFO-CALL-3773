export const getLocaleData = async()=>{
    const response = await fetch("http://localhost:2021/locale",{
        method:'GET'
    });
    return response.json();
}

export const setLanguageData = async(language)=>{
    const response = await fetch("http://localhost:2021/locale/"+language,{
        method:'PUT'
    });
    return response.json();
}