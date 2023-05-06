const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID

var db, collection;

const url = "mongodb+srv://johnjevora94:HcIKqVQvgGIIM7xh@cluster0.qqxjkps.mongodb.net/PERSONAL_EXPRESS?retryWrites=true&w=majority";
const dbName = "Personal";

app.listen(7610, () => {
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
        if(error) {
            throw error;
        }
        db = client.db(dbName);
        console.log("Connected to `" + dbName + "`!");
        console.log("Connected to Port 7610!");
    });
});

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
  db.collection('messages').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', {messages: result})
  })
})

app.post('/messages', (req, res) => {
  db.collection('messages').insertOne({name: req.body.name, desc: req.body.desc, img: req.body.img}, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})

app.delete('/messages', (req, res) => {
  db.collection('messages').findOneAndDelete({_id: ObjectID(req.body.anime)}, (err, result) => {
    if (err) return res.send(500, err)
    res.send('Message deleted!')
  })
})
