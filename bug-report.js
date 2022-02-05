const Organization = require('./models/organizations');
const Tag = require('./models/tags');
async function  foo(){
    const org = await Organization.findById("608e41754a8ebf2274c1a9db");
    console.log(org);
    console.log(await org.tags.includes("608e41754a8ebf2274c1a9db"));
    if(await org.tags.includes("608e41754a8ebf2274c1a9db")){
        console.log("tag pulling");
        org.tags.pull("608e41754a8ebf2274c1a9db");
        await org.save();
    }
    console.log("tag pullen");
}

module.exports = foo;