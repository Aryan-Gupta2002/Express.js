const express = require('express');
const app = express();

function mult(a,b){
    return a*b;
}   // a & b will be passed as query parameters by the user after URL route.

app.get('/', function(req,res){
    // now the server has to catch the parameters and work on them
    // we use req.query.(parameter)
    const a = req.query.a;
    const b = req.query.b;
    let ans = mult(a,b);
    res.send(`Your answer is ${ans}, have a nice day`);
})

app.listen(3000, function(){
    console.log("Server running");
});