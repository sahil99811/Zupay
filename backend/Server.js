const express=require('express');
const app=express();
const dotenv=require('dotnev');
dotenv.config();

app.listen(process.env.PORT,()=>{
    console.log(`Server is Running on Port ${process.env.PORT}`)
})

