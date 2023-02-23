let mongoose = require('mongoose');

let carSchema = mongoose.Schema
({
  nom: String,
  marque: String,
  prixJournee: String,
  immatriculation: String,
  dateMiseEnService: String,
  kilometrage: String,
  numeroReservation: String,
  dateDeDebut: String,
  dateDeFin: String
});

let Car = mongoose.model('Car', carSchema);
module.exports = Car;