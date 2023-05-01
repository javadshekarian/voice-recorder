const path=require('path');

const express=require('express');
const bodyParser=require('body-parser');
const upload=require('express-fileupload');

const app=express()

app.use(express.static(path.join(__dirname,"public")))
app.use(bodyParser.urlencoded({extended:false}))
app.use(upload())

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,"public","index.html"))
})

app.post('/downloadVoice',(req,res)=>{
    const file=req.files.voice
    const filename=Date.now()+".webm"

    file.mv('./public/upload/'+filename,(err)=>{
        if(err){
            console.log(err);
        }
    })
})

app.listen(3000,()=>{
    console.log("the is listen to port 3000!");
})