const express = require('express');

let app = express();

const mongoose = require('mongoose');
mongoose.set('strictQuery', false); // Pour supprimer une erreur au niveau de la console
const uri = 'mongodb+srv://thomas:Futuroscopedu971@binkstobinks.yoxsb9m.mongodb.net/?retryWrites=true&w=majority';
let promise = mongoose.connect(uri, {useNewUrlParser: true});

promise.then((db) => 
{
  console.log('DB connecté');
  app.listen(3000, () => {
    console.log('Listening on port 3000 !');
  });
})

app.use('/pages', express.static('./client/pages'));
app.use('/assets', express.static('./client/assets'));
app.use(require('express').json());

app.use(express.static('client'));

app.get('/', (req, res) => 
{
  res.sendFile(__dirname + '/client/index.html');
});

const Car = require('./models/car');

app.get('/form-names', (req, res) => 
{
  // Utilisez la méthode find() pour récupérer tous les documents de FormData
  Car.find({}, 'nom', (err, data) => 
  {
    if (err) 
    {
      console.log(err);
      return res.send(500);
    }
    // Si aucun document n'est trouvé, renvoyer une erreur
    if (!data || data.length === 0) 
    {
      return res.status(404).send('Aucune saisie de formulaire trouvée');
    }
    // Extraire tous les noms des documents et les afficher dans la page HTML
    const names = data.map(d => d.nom).join(", ");
    res.send(`<h1>Les noms des saisies de formulaires sont : ${names}</h1>`);
  });
});

app.post('/cars', (req, res) => 
{
  let newCar = new Car(req.body);
  newCar.save((err, ob) => 
  {
    if(err) 
    {
      console.log(err);
      return res.send(500);
    }
    res.sendStatus(200);
  });
});

app.get('/cars', (req, res) => 
{
  Car.find({}, (err, obj) => 
  {
    if(err) 
    {
      console.log(err);
      return res.send(500);
    }
    return res.send(obj);
  });
});

app.get('/cars/:id', (req, res) => 
{
  Car.findOne({_id: req.params.id}, (err, obj) => 
  {
    if(err) 
    {
      console.log(err);
      return res.send(500);
    }
    return res.send(obj);
  })
});

app.put('/cars/:id', (req, res) => 
{
  Car.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true}, (err, obj) => 
  {
    if(err) 
    {
      console.log(err);
      return res.send(500);
    }
    return res.send(obj);
  });
});

app.delete('/cars/:id', (req, res) => 
{
  Car.deleteOne({_id: req.params.id}, (err, obj) => 
  {
    if(err) 
    {
      console.log(err);
      return res.send(500);
    }
    res.sendStatus(200);
  });
});