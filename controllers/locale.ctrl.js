const locale = require('../managers/locale-manager');

class LocaleCtrl{
    static async getOne(){
        locale.refresh();
        return locale.myWords;
    }
    static async update(lang){
        locale.setCurrentLocale(lang);
        locale.refresh();
        return locale.myWords;
    }
}

module.exports = LocaleCtrl;