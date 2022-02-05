const emailMgr = require('../managers/email-manager');
const codes = require('../codes.json');

class SendCtrl{
    static async sendMail(data){
        const {name, email, content, phone, company} = data;
        await emailMgr("samvel.directory@gmail.com", "", `<h4>From: ${name} (${email})</h4><h4>Company: ${company}</h4><h4>Phone: ${phone}</h4><p>${content}</p>`);
        return data;
    }
    static async searchCodeOrCountry(search){
        const entries = Object.entries(codes);
        const results = {};
        const regex = new RegExp(search.toLowerCase(),"i");
        entries.forEach((value) => {
            if(value[0].substr(1).startsWith(search) || regex.test(value[1])){
                results[value[0]] = value[1];
            }
        });
        return results;
    }
}

module.exports = SendCtrl;