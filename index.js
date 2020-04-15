let express = require('express');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let ip = require('ip')

let Food = require('./models/food.js');

let app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/fooddb', { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false });

app.post('/new', (req, res) => {
    let newFood = new Food({
        name: req.body.name,
        description: req.body.description,
        foodType: req.body.foodType,
        packageType: req.body.packageType,
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

function handleDbResults(res, err, results) {
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
}

app.get('/get/all', (req, res) => {
    Food.find((err, results) => {
        handleDbResults(res, err, results);
    });
});

app.get('/get/type/:foodType', (req, res) => {
    let type = req.params.foodType;
    Food.find({ foodType: type }, (err, results) => {
        handleDbResults(res, err, results);
    });
});

function update(id, field, newval, res) {
    console.log(`Update ${id} field ${field} with value ${newval}`);
    let obj = {};
    obj[field] = newval;
    console.log(obj);
    Food.findByIdAndUpdate(id, obj, (err, results) => {
        if (err) {
            console.log(err);
            res.statusCode = 500;
            res.json({ error: err });
        } else {
            res.statusCode = 200;
            res.json(results);
        }
    });
}

app.post('/update', (req, res) => {
    let id = req.body.id;
    let nName = req.body.name
    let nDescription = req.body.description;
    let nFType = req.body.foodType;
    let nPType = req.body.packageType;
    let nQuantity = req.body.quantity;

    let obj = {}
    obj["name"] = nName;
    obj["description"] = nDescription;
    obj["foodType"] = nFType;
    obj["packageType"] = nPType;
    obj["quantity"] = nQuantity;

    Food.findById(id, obj, (err, results) => {
        if (err) {
            console.log(err)
            res.statusCode = 500;
            res.json({error: err})
        } else {
            res.statusCode = 200;
            res.json(results)
        }
    })
})

app.post('/update/quantity', (req, res) => {
    let id = req.body.id;
    let nquantity = req.body.quantity;
    update(id, "quantity", nquantity, res);
});

app.post('/update/name', (req, res) => {
    let id = req.body.id;
    let nname = req.body.name;
    update(id, "name", nname, res);
});

app.post('/update/description', (req, res) => {
    let id = req.body.id;
    let ndescription = req.body.description;
    update(id, "description", ndescription, res);
});

app.post('/update/foodtype', (req, res) => {
    let id = req.body.id;
    let nfoodtype = req.body.foodtype;
    update(id, "foodType", nfoodtype, res);
});

app.post('/update/packagetype', (req, res) => {
    let id = req.body.id;
    let npackagetype = req.body.packagetype;
    update(id, "packageType", npackagetype, res);
})

app.delete('/delete/:id', (req, res) => {
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
    console.log(`Server running at ip ${ip.address()} on port ${port}`);
});
