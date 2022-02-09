class MySpeechRecognition{
    constructor(){
        const TheSpeechRecognition = webkitSpeechRecognition;
        this.recognition = new TheSpeechRecognition();
        this.recognition.continuous = false;
        this.recognition.lang = "en-US";
        this.recognition.interimResults = false;
        this.recognition.maxAlternatives = 1;
    }
    setLang(lang){
        this.recognition.lang = lang;
    }
}

export default new MySpeechRecognition();