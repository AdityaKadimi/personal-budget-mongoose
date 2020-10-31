const express = require('express');
var mongoose=require("mongoose");
const cors= require('cors')
const app = express();
const routes=require("./routes");
const port = 3000;
var url = "mongodb://localhost:27017/mongo_personal";
var budgetModel=require('./models/budgetData');
const loadData = require("./LoadData");
const router = express.Router()
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('',express.static('public'));


mongoose.connect(url,{useNewUrlParser:true, useUnifiedTopology:true})
        .then(()=>{
            app.use(express.json())
        })
        .catch((connectionError)=>{
          console.log(connectionError)
        })

app.get('/budget',(req,res)=>{
    mongoose.connect(url,{useNewUrlParser: true, useUnifiedTopology: true})
            .then(()=>{
                console.log("Connection to database");
                budgetModel.find({})
                           .then((data)=>{
                               console.log(data);
                               res.status(200).send(data);
                               mongoose.connection.close();
                           })
                           .catch((err)=>{
                               console.log(err);
                               res.status(500).send();
                           })
            })
})

app.listen(port, () => {
    console.log(`Example app listening at:+ http://localhost:${port}`);
});

// new post route to simulate data addition
app.post('/budget',(req,res)=>{
    console.log("inside post");
    console.log(req.body);
    let data = {id: req.body._id, title: req.body.title, budget: req.body.budget, color: req.body.color}
    mongoose.connect(url,{useNewUrlParser: true, useUnifiedTopology: true})
            .then(()=>{
                console.log("Connection to the database is established");
                budgetModel.insertMany(data,(err,data)=>{
                    if(err){
                        console.log(err);      
                        res.send(err);
                        mongoose.connection.close();
                    }else{
                        console.log("insert successful"); 
                        res.send(data);    
                        mongoose.connection.close();
                    }                    
                })                              
})
});