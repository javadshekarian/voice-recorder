var $=document
var recorderBox=$.getElementById("recorderBox")
var a=true,chunk=[],audio=$.querySelector("audio")
var recorder=null;

recorderBox.addEventListener("click",()=>{
    if(a){
        //************** style ******************/
        recorderBox.style.backgroundImage="url(./picture/audioRecorderActive.png)";recorderBox.classList.add("animate");a=false;
        //***************************************/
        navigator.mediaDevices.getUserMedia({audio:true})
        .then(stream=>{
            recorder=new MediaRecorder(stream)

            recorder.ondataavailable=e=>{
                chunk.push(e.data)

                if(recorder.state=='inactive'){
                    var blob=new Blob(chunk,{type:'audio/webm'})
                    var file=new File([blob],'voice.webm',{lastModified:Date.now()})

                    var formdata=new FormData()
                    formdata.append('voice',file)
                    
                    var req=new XMLHttpRequest()
                    req.open('post','/downloadVoice')
                    req.send(formdata)
                }
            }
            recorder.start()
        })
    }else{
        //************** style ******************/
        recorderBox.style.backgroundImage="url(./picture/audioRecorderT.png)";recorderBox.classList.remove("animate");a=true;
        //***************************************/
        recorder.stop()
    }
})

// var req=new XMLHttpRequest()
// req.onloadend=(e)=>{
//     var data=e.target.responseText
//     data=JSON.parse(data)
          
//     console.log(data.length);
//     for(var i=0;i<data.length;++i){
//         list.innerHTML+=`<audio src="upload/${data[i].filename}" controls></audio>`
//     }         
// }
// req.open('post','/readJson')
// req.send()

// var chunk=[]

// navigator.mediaDevices.getUserMedia({audio:true})
// .then(stream=>{
//     var audio=new MediaRecorder(stream)
//     audio.ondataavailable=(e)=>{
//         chunk.push(e.data)

//         if(audio.state=="inactive"){
//             blob=new Blob(chunk,{type:'audio/webm'})
//             var file=new File([blob],"voice.webm",{lastModified:new Date()})
            
//             var formdata=new FormData()
//             formdata.append('voice',file)

//             var req=new XMLHttpRequest()
//             req.onloadend=()=>{
//                 var req=new XMLHttpRequest()
//                 req.onloadend=(e)=>{
//                     var data=e.target.responseText
//                     data=JSON.parse(data)
//                     list.innerHTML+=`<audio src="upload/${data[data.length-1].filename}" controls></audio>`       
//                 }
//                 req.open('post','/readJson')
//                 req.send()
//             }
//             req.open('post','/downloadVoice')
//             req.send(formdata)

//             audioTag.innerHTML='<source src="'+URL.createObjectURL(blob)+'"type="video/webm"/>'
//         }
//     }
//     audio.start()
//     setTimeout(()=>{
//         audio.stop()
//     },2000)
// }).catch(err=>{
//     if(err.name==='NotAllowedError'){
//         console.log("the access is denied!");
//     }
// })