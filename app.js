const express = require('express');
const app = new express();
const fs = require('fs');
app.use(express.json());
const data = require('./dataset.json');

// GET
app.get('/hospital',(req,res)=>{
    res.send(data)
})

// POST
app.post("/hospital",(req,res)=>{
    data.push(req.body);
    fs.writeFile("dataset.json",JSON.stringify(data),(err)=>{
        if(err){
            res.send("Data cannot be written");
        }
        else{
            res.send("Data written successfully");
        }
    });
});


// PUT
app.put("/hospital/:name",(req,res)=>{
    let name = req.params.name;
    data.forEach((item)=>{
        if(item.name == name){
            item.location=req.body.location;
            item.patientCount=req.body.patientCount;
        }
    })
    fs.writeFile("dataset.json",JSON.stringify(data),(err)=>{
        if(err){
            res.send("data could not be updated");
        }
        else{
            res.send("data updated successfully");
        }
    });
});

//DELETE 

app.delete("/hospital/:name",(req,res)=>{
    let name = req.params.name;
    let val = data.filter(item => item.name !== name );
    fs.writeFile("dataset.json",JSON.stringify(val),(err)=>{
        if(err){
            res.send("data could not be deleted");
        }
        else{
            res.send("data deleted successfully");
        }
    });
})

app.listen(3000,()=>{console.log("listening at 3000")})