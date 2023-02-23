// J'appelle le package express grâce à require
const express = require('express');
/*
  Je déclare une variable app pour application
  j'y affecte le résultat de la fonction express
  cela me eprmet de créer un serveur node express
*/
let app = express();
/*
  Je récupère l'adresse de ma BdD MONGO sur mongo atlas
  en cliquant sur connect puis connect your application
  je choisi nodejs dans la liste déroulante puis la version 
  4.1 ou plus
*/
const mongoose = require('mongoose');
mongoose.set('strictQuery', false); // Pour supprimer une erreur au niveau de la console
const uri = 'mongodb+srv://thomas:Futuroscopedu971@binkstobinks.yoxsb9m.mongodb.net/?retryWrites=true&w=majority';
let promise = mongoose.connect(uri, {useNewUrlParser: true});

promise.then((db) => {
  // J'indique que ma bdd est connecté
  console.log('DB connecté');
  // Mon application va écouter les événements sur le port 3000
  app.listen(3000, () => {
    // A l'ouverture du servur je mets ce message d'accueil
    console.log('Listening on port 3000 !');
  });
})

/*
  J'initialise une variable liste qui contiendra
  l'ensemble des valeurs exporté depuis le fichier
  liste.js
*/

app.use('/pages', express.static('./client/pages'));
app.use('/assets', express.static('./client/assets'));
app.use(require('express').json());

// Bien rediriger son action "button" lorsque l'on clique sur le bouton Home
app.use(express.static('client'));
// Quand mon application est sollicitée à la racine ....
app.get('/', (req, res) => {
  // ... je lui envoie le fichier index.html à afficher
  res.sendFile(__dirname + '/client/index.html');
  // __dirname permet d'obtenir automatiquement l'arborescence
  // du dossier courant
});

// Route pour récupérer tous les noms de formulaire
// app.get('/form-names', (req, res) => {
//   // Utilisez la méthode find() pour récupérer tous les documents de FormData
//   Car.find({}, 'name', (err, data) => {
//     if (err) {
//       console.log(err);
//       return res.send(500);
//     }
//     // Extrayez les noms de chaque document et mettez-les dans un tableau
//     const names = data.map(d => d.name);
//     // Envoyez les noms au client sous forme de JSON
//     res.json(names);
//   });
// });

const Car = require('./models/car');

app.get('/form-names', (req, res) => {
  // Utilisez la méthode find() pour récupérer tous les documents de FormData
  Car.find({}, 'nom', (err, data) => {
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

app.post('/cars', (req, res) => {
  /*
    Je créé un nouveau car respectant
    le schéma défini dans mon modèle
    lors de la requête il est contenu dans req.body
  */
  let newCar = new Car(req.body);
  /*
    j'utilise mon nouveua car respectant le model
    et la méthode save pour sauvegarder
  */
  newCar.save((err, ob) => {
    /*
      La fonction save a 2 paramètres
      le premier enregistr les erreurs eventuelles
      le second contient l'objet sauvegardé
    */
    if(err) {
      // Si erreur je l'affiche et j'envoie
      // l'info au client
      console.log(err);
      return res.send(500);
    }
    // Dans le cas contraire j'envoie le status 200
    // pour indiquer que tout s'est bien déroulé
    res.sendStatus(200);
  });
});

app.get('/cars', (req, res) => {
  Car.find({}, (err, obj) => {
    if(err) {
      console.log(err);
      return res.send(500);
    }
    return res.send(obj);
  });
});


// Le :id sera automatiquement transofrmé par l'identifiant
// envoyé par fetch
app.get('/cars/:id', (req, res) => {
  // Pour effectuer une recherche on va utiliser le modèle
  // BodyParser permet de conserver l'id dans req.params.id
  Car.findOne({_id: req.params.id}, (err, obj) => {
    if(err) {
      console.log(err);
      return res.send(500);
    }

    return res.send(obj);
  })
});

app.put('/cars/:id', (req, res) => {
  Car.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true}, (err, obj) => {
    if(err) {
      console.log(err);
      return res.send(500);
    }

    return res.send(obj);
  });
});

app.delete('/cars/:id', (req, res) => {
  Car.deleteOne({_id: req.params.id}, (err, obj) => {
    if(err) {
      console.log(err);
      return res.send(500);
    }
    res.sendStatus(200);
  });
});