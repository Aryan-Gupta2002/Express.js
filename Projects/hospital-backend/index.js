const express = require('express');
const app = express();

const users = [{
    name : "John",
    kidneys : [{
        healthy: false
    }]
}];

app.use(express.json());

app.get('/', function(req,res){
    const johnKidneys = users[0].kidneys;
    const noOfKidneys = johnKidneys.length;
    let noOfHealthyKidneys = 0;
    for (let i = 0; i<johnKidneys.length;i++){
        if (johnKidneys[i].healthy){
            noOfHealthyKidneys += 1;
        }
    }
    const noOfUnhealthyKidneys = noOfKidneys - noOfHealthyKidneys;
    res.json(
        {noOfKidneys,
        noOfUnhealthyKidneys,
        noOfHealthyKidneys}
    )
});

app.post('/', function(req,res){
    const isHealthy = req.body.isHealthy;
    users[0].kidneys.push({
        healthy:isHealthy
    });
    res.json({
        "msg":"Done!"
    })
})

// The put request will update all the kidneys to be healthy
app.put('/',function(req,res){
    // If user does not have any unhealthy kidney, send status code 411
    // Else run normal code
    if(atleastOneUnhealthy()){
        for(let i = 0;i<users[0].kidneys.length;i++){
            users[0].kidneys[i].healthy = true;
        }
        res.json({});
    }else{
        res.status(411).json({
            "msg":"All kidneys are already healthy, nothing to update"
        })
    }
    
})  // NOTE: if no res.send or res.json is send back, the request will not end in postman

function atleastOneUnhealthy(){
    let oneUnhealthy = false;
    for(let i = 0; i<users[0].kidneys.length; i++){
        if (!users[0].kidneys[i].healthy)
            oneUnhealthy = true;
    }
    return oneUnhealthy;
}

// Now suppose, user wants to delete the kidneys, specifically the unhealthy ones
app.delete('/', function(req,res){
    // If user does not have any unhealthy kidney, send status code 411
    // Else run normal code
    if(atleastOneUnhealthy()){
        const newKidneys = [];
        for(let i = 0; i<users[0].kidneys.length; i++){
            if (users[0].kidneys[i].healthy)
                newKidneys.push({healthy:true});
        }
        users[0].kidneys = newKidneys;
        res.json({});
    }
    else{
        res.status(411).json({
            "msg":"You do not have any unhealthy kidney"
        })
    }
})

app.listen(3000, function(){
    console.log('Server Running');
});