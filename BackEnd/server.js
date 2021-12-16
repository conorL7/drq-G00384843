const express = require('express')
const app = express()
const port = 4000
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());
app.use(function(req, res, next) {
res.header("Access-Control-Allow-Origin", "*");
res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
res.header("Access-Control-Allow-Headers",
"Origin, X-Requested-With, Content-Type, Accept");
next();
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// requiring mongoose
const mongoose = require('mongoose');

// using strConnection to connect to databbase
const strConnection = 'mongodb+srv://admin:admin@cluster0.8taek.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(strConnection);
}

//defining schema
const clubSchema = new mongoose.Schema({
    Club:String,
    Position:String,
    Crest:String
});

// creating new model for database
const clubModel = mongoose.model('martindfgdfgdfg', clubSchema);

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/api/clubs', (req,res)=>{
    console.log(req.body);
    console.log(req.body.Club);
    console.log(req.body.Position);
    console.log(req.body.Crest);

    // clubModel model
    clubModel.create({
        Club:req.body.Club,
        Position:req.body.Position,
        Crest:req.body.Crest
    });
    // Data sent notification
    res.send('Data Sent to Server!')
})

app.get('/api/clubs/:id',(req, res)=>{
    console.log(req.params.id);

    clubModel.findById(req.params.id,(error,data)=>{
        res.json(data);
    })
})

// HTTP delete() method Listening at /api/clubs/:id.
app.delete('/api/clubs/:id', (req, res)=>{
    console.log('Deleteing : '+req.params.id);

    // finds record by ID and Deletes it.
    clubModel.deleteOne({_id:req.params.id},
        (error, data)=>{
            if(error)
                res.send(error)
            res.send(data);
        })
})

// passing up an object containing new club
app.put('/api/clubs/:id',(req, res)=>{
    console.log('update');
    console.log(req.body);
    console.log("Updating: " + req.params.id);

    clubModel.findByIdAndUpdate(req.params.id, req.body, {new:true},
        (err,data)=>{
            res.send(data);
        })

})

app.get('/api/clubs', (req, res) => {
    clubModel.find((err, data)=>{
        res.json(data);
    })
          
           // https://m.media-amazon.com/images/M/MV5BNDQ4YzFmNzktMmM5ZC00MDZjLTk1OTktNDE2ODE4YjM2MjJjXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg
      
})



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})