const express = require('express')
const fs = require('fs')
const app = express()
const port = 3000


app.get('/user',(req,res) => {
    console.log("Mansi dhingra")
    res.send("Hello world")
})
app.get('/listuser',(req,res) => {
    fs.readFile('./data.json','utf8', (error, data) => {
        if(error){
           console.log(error);
          }
        console.log("users",data);
        res.send(data)
    
    })
    console.log("Mansi dhingra")
    
  
})

//app.listen(port, ()=> {
  //  console.log(`Example app listening on port ${port}`)
//}
const server = app.listen(8081,function(){
    console.log("server",server.address());
    console.log("server",server.address().family);
    const host = server.address().address
    const port = server.address().port
    console.log(`Example app listening on port ${port}`)
})
