const Localization = require('localizationjs');
const locale = new Localization({
    defaultLocale: 'en_US',
    currentLocale: {language:"hy", country:"AM"}
});

const dictionaryEN = require('../dictionnaries/en_US.json');
const dictionaryRU = require('../dictionnaries/ru_RU.json');
const dictionaryAM = require('../dictionnaries/hy_AM.json');

locale.addDict("en", dictionaryEN);
locale.addDict("ru", dictionaryRU);
locale.addDict("hy", dictionaryAM);

locale.words = Object.keys(dictionaryEN);

locale.myWords = {};

locale.refresh = ()=>{
    locale.words.forEach(word=>{
        locale.myWords[word] = locale.translate(word)
    });
}
locale.refresh();
module.exports = locale;