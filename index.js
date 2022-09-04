const express = require('express')
const os = require('os');
require('dotenv').config()

const port = process.env.PORT || 3000

const app=express()

app.use(express.json())

//Routes

app.get('/',function(req, res){
    const result ={
        "hostname":os.hostname(),
        "os":{
            "platform":os.platform(),
            "release":os.release()
        },
        "port":port,
        "database":{
            "url":process.env.DB_HOST,
            "port":process.env.DB_PORT,
            "username":process.env.DB_USERNAME,
            "password":"*************"
        }
    }
    res.json(result)
})

app.listen(3000, function(){
    console.log('Server listen in port ',port)
})