import express from  "express";
const app=express();
const PORT=5000;

app.get("/",(req,res)=>{
    res.send("yeah it's me")
});

app.get("/user/:name",(req,res)=>{
    res.status(200).type("text/plain").send(`hello ${req.params.name} your id is ${req.query.id}`)

});

app.listen(PORT,()=>{
    console.log("i'm listening talk to me")
});