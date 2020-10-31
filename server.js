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


mongoose.connect(url,{useNewUrlParser:true, useUnifiedTopology:true})
        .then(()=>{
            app.use(express.json())
            app.use("/api",routes)
        })
        .catch((connectionError)=>{
          console.log(connectionError)
        })
		
app.use(cors());


app.get('/budget',(req,res) => {
    res.json(loadData);
});

app.listen(port, () => {
    console.log(`Example app listening at:+ http://localhost:${port}`);
});