var name = document.querySelector('#name');
var marque = document.querySelector('#marque');
var prixJournee = document.querySelector('#prixJournee');
var immatriculation = document.querySelector('#immatriculation');
var dateMiseEnService = document.querySelector('#dateMiseEnService');
var kilometrage = document.querySelector('#kilometrage');
var numeroReservation = document.querySelector('#numeroReservation');
var dateDeDebut = document.querySelector('#dateDeDebut');
var dateDeFin = document.querySelector('#dateDeFin');

var url = window.location;
console.log(url);
var carId = url.hash;
carId = carId.substring(1);
console.log(carId);

let myHeaders = new Headers();
let urlFinal = '/cars/' + carId;

let options = 
{
  method: 'GET',
  headers: myHeaders,
  mode: 'cors',
  cache: 'default'
};

fetch(urlFinal, options)
  .then((res) => 
  {
    if(res.ok) 
    {
      return res.json();
    }
  })
  .then((response) => 
  {
    console.log(response)
    nom.value = response.nom;
    marque.value = response.marque;
    prixJournee.value = response.prixJournee;
    immatriculation.value = response.immatriculation;
    dateMiseEnService.value = response.dateMiseEnService;
    kilometrage.value = response.kilometrage;
    numeroReservation.value = response.numeroReservation;
    dateDeDebut.value = response.dateDeDebut;
    dateDeFin.value = response.dateDeFin;
  });


function modify() 
{
  var tmp = 
  {
    nom: nom.value,
    marque: marque.value,
    prixJournee: prixJournee.value,
    immatriculation: immatriculation.value,
    dateMiseEnService: dateMiseEnService.value,
    kilometrage: kilometrage.value,
    numeroReservation: numeroReservation.value,
    dateDeDebut: dateDeDebut.value,
    dateDeFin: dateDeFin.value
  };

  let urlModif = '/cars/' + carId;

  let options = 
  {
    method: 'PUT',
    headers: 
    {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    mode: 'cors',
    cache: 'default',
    body: JSON.stringify(tmp)
  }

  fetch(urlModif, options)
  .then((res) => 
  {
    if(res.ok) 
    {
      // Je me redirige vers la liste des car
      window.location.href = '/pages/listscar.html';
    }
  });
}

var btn = document.querySelector('#modif');
btn.addEventListener('click', (e) => 
{
  e.preventDefault();
  modify();
});