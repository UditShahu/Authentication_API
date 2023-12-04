const express = require('express');

const app = express();


app.get("/date",(request,response)=>{
    const date = new Date();
    response.send("Hi how are you!");
});

app.get("/date",(req,res)=>{
    res.send("My name is Udit Shahu");
})

app.listen(3005,()=>{
    console.log("server started");
});