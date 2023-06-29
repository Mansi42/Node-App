const express = require("express");
const userModel = require("./models/user");
const storyModel = require("./models/story");
const newuserModel = require("./models/newUser");
const res = require("express/lib/response");
const bodyParser = require('body-parser');
//const userController = require('./controllers/newuser');
const app = express();



app.use(bodyParser.urlencoded({limit: '5000mb', extended: true, parameterLimit: 100000000000}));

// const storySchema = Schema({
//     authors: [{ type: Schema.Types.ObjectId, ref: 'name' }],
//     title: String
//   });
  
//   // Later
  
//   const story = await Story.findOne({ title: 'Casino Royale' }).populate('authors');
//   story.authors;


app.post("/addUser",async(request,response)=>{
    const user = new userModel(request.body);

    try{
        await user.save();
        response.status(200).send(user);
    }catch(error){
        response.status(500).send(error);
    }

});

//app.post("/addNewUser",userController.postFunc)


app.get("/users",async(request,response)=>{
    const user = await userModel.find({});
    const userlen = user.length;
   

    try{
       response.send(user)
     
       // var user = users["user"+req.params.id]
        
    
       // response.status(200).send(user);
    }catch(error){
        response.status(500).send(error);
    }

});

// app.get("/newusers",async(request,response)=>{
//     const newuser = await newuserModel.find({});
//     const userlen = newuser.length;
   

//     try{
//        response.send(newuser)
     
//        // var user = users["user"+req.params.id]
        
    
//        // response.status(200).send(user);
//     }catch(error){
//         response.status(500).send(error);
//     }

// });

app.get('/',(req,res)=>{
    return res.sendFile(__dirname + '/index.html')
})



app.delete('/delete/:name',(request, response) => {
    userModel.deleteOne({name:request.params.name})
    .then(result=>{
        response.status(200).send(user);
    })
    .catch(error=>{
        response.status(500).send(error);
    })
  })

  app.patch('/update/:name',(request, response) => {
    userModel.updateOne({name:request.params.name})
    .then(result=>{
        response.status(200).send(user);
    })
    .catch(error=>{
        response.status(500).send(error);
    })
  })

  app.put('/updateNew/:name',(request, response) => {
      
   newuserModel.updateOne({name:request.params.name})
    .then(result=>{
        response.status(200).send(result);
    })
    .catch(error=>{
        response.status(500).send(error);
    })
  })


  

app.post("/add_user_story",(request,response)=>{
    const user = new userModel(request.body);

    try{
        user.save();
         const storydata = { 
             user:user._id,
             title:"mansi first story",
        }
        const story = new storyModel(storydata);
        try{
            story.save();
            response.send(story);
        }catch(error){
            response.status(500).send(error);
        }
    }catch(error){
        response.status(500).send(error);
    }

});
app.get("/get_user_story",(request,response)=>{
    storyModel.findOne({title:"mansi first story"})
    .populate("user").then(story=>{
      console.log("user is");
      //  console.log("the user is",story.user.name);
       response.send(story);
    
    });
    
})





module.exports = app;

