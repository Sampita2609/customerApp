let express=require("express");
let app=express();
app.use(express.json());
app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Methods","GET,POST,OPTIONS,PUT,PATCH,DELETE,HEAD");
    res.header("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept");
    next();
})
const port=process.env.PORT||2410;
2410;
app.listen(port,()=>console.log(`Node app listening on port ${port}!`));

let {customerData}=require("./customerData.js");

let fs=require("fs");
let fName="customer.json";

 app.get("/customers/resetData",function(req,res){
    let data=JSON.stringify(customerData);
    fs.writeFile(fName,data,function(err){
        if(err) res.status(404).send(err);
        else res.send("Data in file is reset");
    })
 });

 app.get("/customers",function(req,res){
    fs.readFile(fName,"utf8",function(err,data){
        if(err) res.status(404).send(err);
        else {
            let customerArr=JSON.parse(data);
            res.send(customerArr);
        }
    })
 })

 app.post("/customers",function(req,res){
    let body=req.body;
    customerData.push(body);
    let data=JSON.stringify(customerData);
    fs.writeFile(fName,data,function(err){
        if(err) res.status(404).send(err);
        else res.send(body)
    })
 })

 app.put("/customers/:id",function(req,res){
    let id=req.params.id;
    let body=req.body;
    fs.readFile(fName,"utf8",function(err,data){
        if(err) res.status(404).send(err);
        else{
            let obj=JSON.parse(data);
            let index=obj.findIndex((c)=>c.id===id);
            if(index>=0) {
                obj[index]=body;
                let data1=JSON.stringify(obj);
                fs.writeFile(fName,data1,function(err){
                    if(err) res.status(404).send(err);
                    else res.send(body)
                })
            }
            else res.status(404).send("Data Not Found");
        }
    })
 })

 app.delete("/customers/:id",function(req,res){
    let id=req.params.id;
    fs.readFile(fName,"utf8",function(err,data){
        if(err) res.status(404).send(err);
        else{
            let obj=JSON.parse(data);
            let index=obj.findIndex((c)=>c.id===id);
            if(index>=0){
                let deletedData=customerData.splice(index,1);
                let data1=JSON.stringify(customerData);
                fs.writeFile(fName,data1,function(err){
                    if(err) res.status(404).send(err);
                    else res.send(deletedData);
                })
            }
            else res.status(404).send("No Data Found")
        }
    })
 })