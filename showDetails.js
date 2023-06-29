const express = require('express')
const fs = require('fs')
const app = express()
const port = 3000
const cors = require('cors')

app.use(cors())

var user={
    "user5":{
    "id":5,
    "name":"anshu",
    "profession":"IT",
    "role":"student"},

        "user4":{
        "id":4,
        "name":"mansi",
        "profession":"IT",
        "role":"student"}
}

/*app.get('/addUser',(req,res) => {
    fs.readFile('./data.json','utf8', (error, data) => {
        if(error){
           console.log(error);
           return;
        }
        data = JSON.parse(data);
        console.log("data",data);
        data["user5"] = user;
        //data["users"] = user["user5"];
    console.log(data)
    })
    console.log("Mansi dhingra")
    res.send("Hello world 2")
   
})*/

app.get('/getUser/:id/:name',(req,res) => {
    
    fs.readFile("./data.json",'utf8', (error, data) => {
        if(error){
           console.log(error);
           return;
        }
        var users = JSON.parse(data);
        console.log("req.params",req.params)
       // var user = users["user"+req.params.id]
        var user = users[req.params.name]
        console.log(user)
      

   res.end(JSON.stringify(user))

    
    })
    
    console.log("Mansi dhingra")
 
   
})




const server = app.listen(8081,function(){
    console.log("server",server.address());
    console.log("server",server.address().family);
    const host = server.address().address
    const port = server.address().port
    console.log(`Example app listening on port ${port}`)
})
