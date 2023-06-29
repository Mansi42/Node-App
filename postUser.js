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

app.post('/addUser',(req,res) => {
    
    fs.readFile('./data.json','utf8', (error, data) => {
        if(error){
           console.log(error);
           return;
        }
        data = JSON.parse(data);
        //console.log("data",data);
        //data["user5"] = user;
        data["user5"] = user["user5"];
        console.log(data)
    //res.end(JSON.stringify(data))
    
fs.writeFile("./data.json", JSON.stringify(data), (err) =>  {
    if(err) {
        return console.log(err);
    }
  
    console.log(data);
    
}); 
res.end(JSON.stringify(data))
/*fs.appendFile('./data.json',jsonString, 'utf8',
   
    function(err) {     
        if (err) throw err;
       
});*/
    
    })
    
    console.log("Mansi dhingra")
   // res.send("Hello world 2")
   
})




const server = app.listen(8081,function(){
    console.log("server",server.address());
    console.log("server",server.address().family);
    const host = server.address().address
    const port = server.address().port
    console.log(`Example app listening on port ${port}`)
})
