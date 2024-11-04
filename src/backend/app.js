var path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require("axios");
require('dotenv').config();
const app = express();
const API_URL = 'https://api.meaningcloud.com/sentiment-2.1'
app.use(cors());
app.use(bodyParser.json());
app.post('/api/submit',(req,res)=>{
    const {url} = req.body;
    const urlRegex = /^(http|https):\/\/[^ "]+$/;
    const isValid = urlRegex.test(url);
    if(isValid) {
        axios.post(API_URL,null,{
            params:{
                key:process.env.API_KEY,
                lang:'en',
                url: url
            }
        }).then(response=>{
            const data = response.data;
            if(data.status.code === '102'){
                res.status(503).json({status:'error',message:'Service Unavailable due to daily limit'});
            }else{
                res.json({status:'ok',data});
            }
        }).catch(err=>{
            res.status(503).json({status:'error',message:'Service Unavailable'});
        });
    }else{
        res.status(400).json({status:'error',message:'Invalid URL'});
    }
});
app.use('/', express.static(path.join(__dirname, 'dist')));
const port = process.env.LISTEN_PORT || '9000';
app.listen(port, function () {
    console.log(`Server is running on port: ${port}`);
});