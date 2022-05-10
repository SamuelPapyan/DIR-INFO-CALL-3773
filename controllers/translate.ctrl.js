const translate = require('translate-google')

class TranslateCtrl{
    static async translateText(text, lang){
        try {
            const data = await translate(text, {to:lang});
            return data;
        }
        catch(e){
            throw new Error(e.message);
        }
    }
    static async translateTexts(texts, lang){
        try {
            const data = await translate(texts, {to:lang});
            return data;
        }
        catch(e){
            throw new Error(e.message);
        }
    }
}

module.exports = TranslateCtrl