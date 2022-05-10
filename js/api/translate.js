export const translateText = async(text, lang)=>{
    const response = await fetch('http://localhost:2021/translate?text='+text+'&lang='+lang);
    return response.json();
}

export const translateTexts = async(texts, lang)=>{
    const textString = texts.join('|-|');
    const response = await fetch('http://localhost:2021/translate',{
        method:'POST',
        body:JSON.stringify({
            texts:textString, lang:lang
        }),
        headers:{
            'Content-Type':"application/json"
        }
    });
    return response.json();
}