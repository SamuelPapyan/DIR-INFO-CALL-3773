export function speechTextByElement(element)
{
    element.addEventListener('mouseover',()=>{
        window.speechSynthesis.cancel();
        const lang = element.getAttribute('speech-lang');
        const speechText = element.getAttribute('speech-text');
        if(lang && speechText){
            let voice, rate = 1;
            if(lang == 'hy' || lang == 'ru')
                voice = window.speechSynthesis.getVoices()[16];
            if(lang == 'en')
                voice = window.speechSynthesis.getVoices()[2];
            switch(lang){
                case 'hy': rate = 0.85; break;
                case 'ru': rate = 0.75; break;
                case 'en': rate = 0.75; break;
            }
            const speechUttr = new SpeechSynthesisUtterance(speechText);
            console.log(speechUttr);
            speechUttr.voice = voice;
            speechUttr.rate = rate;
            window.speechSynthesis.speak(speechUttr);
        }
    });
}

export function speechElementsTexts(elem, speeches){
    speeches.forEach((obj,index)=>{
        if(index == 0)
            window.speechSynthesis.cancel();
        speechText(obj.text, obj.lang, false);
    });
}

export function speechText(text, lang, enableCancel = true){
    if(enableCancel)
        window.speechSynthesis.cancel();
    if(text){
        let voice, rate = 1;
        if(lang == 'hy' || lang == 'ru')
            voice = window.speechSynthesis.getVoices()[16];
        if(lang == 'en')
            voice = window.speechSynthesis.getVoices()[2];
        switch(lang){
            case 'hy': rate = 0.85; break;
            case 'ru': rate = 0.75; break;
            case 'en': rate = 0.75; break;
        }
        const speechUttr = new SpeechSynthesisUtterance(text);
        speechUttr.voice = voice
        speechUttr.rate = rate;
        window.speechSynthesis.speak(speechUttr);
    }
}

export function setSpeechInElement(elem,speech)
{
    return new SpeechElem(elem, speech);
}

export class SpeechElem{
    constructor(elem, speech)
    {
        this.speeches = [speech];
        elem.addEventListener('mouseover',()=>{
            this.speechTexts();
        });
        elem.addEventListener('mouseout',()=>{
            window.speechSynthesis.cancel();
        })
        this.isEnable = true;
    }
    addSpeech(speech){
        this.speeches.push(speech);
        return this;
    }
    setSpeechEnable(enable){
        this.isEnable = enable;
    }
    speechTexts(){
        if(!this.isEnable)
            return ;
        this.speeches.forEach((obj,index)=>{
            if(index == 0)
                window.speechSynthesis.cancel();
            speechText(obj.text, obj.lang, false);
        });
    }
}