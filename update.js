const express = require('express')
const fs = require('fs')
const app = express()
const port = 3000
const cors = require('cors')

app.use(cors())



// app.put('/updateUser/:id/:name',(req,res) => {
    
//         fs.readFile("./data.json",'utf8', (error, data) => {
//             if(error){
//                 console.log(error);
//                     return;
//             }
//                     var users = JSON.parse(data);
//                     users["user"+req.params.id].name = req.params.name;
//                     console.log(users)
       

        
//                         fs.writeFile("./data.json", JSON.stringify(users), (err) =>  {
//                             if(err) {
//                             return console.log(err);
//                             }
          
//                                 console.log(users);
            
//                         }); 
//                         res.end(JSON.stringify(users))


    
//         })
    
  
 
   
// })

 app.put('/updateUser/:id/:profession',(req,res) => {
    
         fs.readFile("./data.json",'utf8', (error, data) => {
             if(error){
                 console.log(error);
                     return;
             }
                     var users = JSON.parse(data);
                     let userId = req.params.id;
                     let userProfession = req.params.profession;
                     for(const i in users){
                         if(users[i].id === parseInt(userId)){
                             users[i].profession = userProfession;
                             console.log(users);
                             res.end(JSON.stringify(users))
                             fs.writeFile("./data.json", JSON.stringify(users), (err) =>  {
                                if(err) {
                                return console.log(err);
                                }
                                          
                                    console.log(users);
                                            
                            }); 
                         }
                        }

                                    
                            
                            



                     
                    //  if(users["user"+req.params.id]["id"]==userId))
                    //  users[req.params.Profession] = req.params.name;
                    //  console.log(users)
       
                    
        
                    


    
         })
    
  
 
   
 })







const server = app.listen(8081,function(){
    console.log("server",server.address());
    console.log("server",server.address().family);
    const host = server.address().address
    const port = server.address().port
    console.log(`Example app listening on port ${port}`)
})
