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


app.delete('/deleteuser/:id',(req,res) => {
    
    fs.readFile("./data.json",'utf8', (error, data) => {
        if(error){
           console.log(error);
           return;
        }
        data = JSON.parse(data);
        delete data["user"+ req.params.id]
        console.log(data)

        
         fs.writeFile("./data.json", JSON.stringify(data), (err) =>  {
            if(err) {
                return console.log(err);
            }
          
             console.log(data);
            
         }); 

         res.end(JSON.stringify(data))

    
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
