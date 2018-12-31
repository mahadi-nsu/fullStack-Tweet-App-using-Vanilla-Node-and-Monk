const express = require('express');
const cors = require('cors');


//database
const monk = require('monk');

const app = express();

const Filter = require('bad-words');

//create db connection
const db = monk('localhost/mewer');
const mews = db.get('mews');

const filter = new Filter();

app.use(cors());
app.use(express.json());

//default route
app.get('/',(req,res)=>{
    res.json({
        message : 'Meaw!! Meaw!!'
    });
})


// get request to send the data back to the client from the database
app.get('/mews',(req,res)=>{
    mews
       .find()
       .then(mews=>{
           res.json(mews);
       })
})



function isValid(mew){
    return mew.name && mew.name.toString().trim() !== '' &&
        mew.content && mew.content.toString().trim() !== '';

}

//post request
//get the datas from client and store to the database
app.post('/mews',(req,res) => {
//    console.log(req.body);
if(isValid(req.body)){
    //insert into db
    const mew ={
        name : filter.clean(req.body.name.toString()),
        content : filter.clean(req.body.content.toString()),
        created : new Date()
    };
   // console.log(mew)
   mews
   .insert(mew)
   .then(createdMew =>{
       res.json(createdMew);
   });
}
else{
    res.status(422);
    res.json({
        message : 'Hey! name and Content are required!!'
    })
}

})

app.listen(8000,()=>{
    console.log('Listening on http://localhost:8000');

})