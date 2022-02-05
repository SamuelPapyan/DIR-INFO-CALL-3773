const express = require('express');
const http = require('http');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const router = require('./router');

app.use(cors());
app.use('/uploads',express.static('uploads'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
global.__homedir = __dirname;

const server = http.createServer(app);
router(app);
mongoose.connect('mongodb+srv://test1234:nodejs21@cluster0.2zbcu.mongodb.net/directoryDb?retryWrites=true&w=majority',{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:false,
    useCreateIndex:true
}).then(()=>{
    console.log("Connect DB");
    server.listen(2021,(req,res)=>{
        console.log("localhost:2021");
    });
})

