const express = require('express');
const app = express();

let count =0;
//Let's create a request counter middle ware
function requestCounterMiddleware(req,res,next){
    count += 1;
    // Accessing req object and giving req.name
    req.name = "aryan";
    console.log(`Total requests: ${count}`);
    next();
}

//Now we want to access req.name in other middleware or endpoint function
function add(req,res){
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);
    console.log(req.name);
    res.json({
        "Sum":a+b
    });
}

app.get("/sum",requestCounterMiddleware,add);
app.listen(3000);