let express = require('express');
let bodyParser = require('body-parser');
let path = require('path');
let mongoose = require('mongoose');

let Food = require('./models/food.js');

let app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/fooddb', { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false });

app.post('/new', (req, res, next) => {
    let newFood = new Food({
        name: req.body.name,
        description: req.body.description,
        foodType: req.body.foodType,
        quantity: req.body.quantity
    });

    newFood.save((err, result) => {
        if (err) {
            console.log(err);
            res.statusCode = 500;
            res.json({ error: err });
        } else {
            res.statusCode = 200;
            res.json(result)
        }
    });
});

app.get('/get/all', (req, res, next) => {
    Food.find((err, results) => {
        if (err) {
            console.log(err);
            res.statusCode = 500;
            res.json({ error: err });
        } else {
            let len = (results == null) ? 0 : results.length;
            res.statusCode = 200;
            res.json({
                size: len,
                results: results
            });
        }
    });
});

app.get('/get/type/:foodType', (req, res, next) => {
    let type = req.params.foodType;
    Food.find({ foodType: type }, (err, results) => {
        if (err) {
            console.log(err);
            res.statusCode = 500;
            res.json({ error: err });
        } else {
            let len = (results == null) ? 0 : results.length;
            res.statusCode = 200;
            res.json({
                size: len,
                results: results
            });
        }
    });
});

app.post('/update/quantity', (req, res, next) => {
    let id = req.body.id;
    let nquantity = req.body.quantity;
    Food.findByIdAndUpdate(id, { quantity: nquantity }, (err, results) => {
        if (err) {
            console.log(err);
            res.statusCode = 500;
            res.json({ error: err });
        } else {
            res.statusCode = 200;
            res.json(results);
        }
    });
});

app.delete('/delete/:id', (req, res, next) => {
    let id = req.params.id;
    Food.findByIdAndDelete(id, (err) => {
        if (err) {
            console.log(err);
            res.statusCode = 500;
            res.json({ error: err });
        } else {
            res.statusCode = 200;
            res.json({ status: "Delete successful" });
        }
    });
});

let port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
