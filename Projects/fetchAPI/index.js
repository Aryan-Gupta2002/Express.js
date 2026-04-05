const express = require('express');
const app = express();

function mult(a,b){
    return a*b;
}
app.get('/sum',function(req,res){
    // const a = req.query.a;
    // const b = req.query.b;
    // If we take a & b as it is, req.query returns a string not number
    // To convert a and b to numbers, we use parseInt method
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);
    // const ans = mult(a,b);
    res.json({
        "ans":a+b
    });
});

app.listen(3000);