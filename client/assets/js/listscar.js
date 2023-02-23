function addCar() {
  // Je récupère l'ensemble des informations de mon formulaire
  var name = document.querySelector('#name');
  var marque = document.querySelector('#marque');
  var prixJournee = document.querySelector('#prixJournee');
  var immatriculation = document.querySelector('#immatriculation');
  var dateMiseEnService = document.querySelector('#dateMiseEnService');
  var kilometrage = document.querySelector('#kilometrage');
  var numeroReservation = document.querySelector('#numeroReservation');
  var dateDeDebut = document.querySelector('#dateDeDebut');
  var dateDeFin = document.querySelector('#dateDeFin');

  // Objet temporaire respectant la même structure que le schéma du model
  var tmp = {
    nom: name.value,
    marque: marque.value,
    prixJournee: prixJournee.value,
    immatriculation: immatriculation.value,
    dateMiseEnService: dateMiseEnService.value,
    kilometrage: kilometrage.value,
    numeroReservation: numeroReservation.value,
    dateDeDebut: dateDeDebut.value,
    dateDeFin: dateDeFin.value
  };

  let url = '/cars';

  let options = {
    method: 'POST', // SEND
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    mode: 'cors',
    cache: 'default',
    body: JSON.stringify(tmp)
  }

  fetch(url, options)
  .then((res) => {
    if(res.ok) {
      addOneLine(tmp);
      document.forms['formSpe'].reset(); // je selectionne parmis tous les forms de la page celui d'identifiant formSpe 
      // .reset() permet de remettre à vide les champs du form
    }
  });
}

function deleteCar(id) {
  let url = '/cars/' + id;
  let options = {
    method: 'DELETE',
  }

  fetch(url, options)
    .then((res) => {
      if(res.ok) {
        window.location.href = '/pages/listscar.html';
      }
    })
}

function addOneLine(data) {
  var tab = document.querySelector('#cars');
  var newLine = document.createElement('tr');
  for (const prop in data) {
    if(prop != '_id' && prop != '__v') {
      var tmp = document.createElement('td');
      tmp.innerText = data[prop];  // data.prop
      newLine.appendChild(tmp);
    }
  }

  // Je créé un lien vers la page détail
  var tdLink = document.createElement('td');
  var link = document.createElement('a');
  link.href = '/pages/detail.html#' + data._id;
  link.innerText = 'Détails';
  tdLink.appendChild(link);
  newLine.appendChild(tdLink);

  // Je créé le bouton suppression
  var tdSuppr = document.createElement('td');
  var btnSuppr = document.createElement('button');
  btnSuppr.innerText = 'Delete';
  btnSuppr.classList.add('btn', 'btn-outline-danger');
  tdSuppr.appendChild(btnSuppr);
  newLine.appendChild(tdSuppr);

  btnSuppr.addEventListener('click', (e) => {
    deleteCar(data._id);
  });

  // tab.appendChild(newLine);
}

// Je créé l'écouteur d'evt associé au clic du bouton validaiton
var btn = document.querySelector('#valid');
btn.addEventListener('click', (e) => {
  // je stop l'action par défaut du bouton
  e.preventDefault();
  addCar();
});

let myHeaders = new Headers();
let url = '/cars';

let options = {
  method: 'GET', // GET INFORMATIONS
  headers: myHeaders,
  mode: 'cors',
  cache: 'default'
};

fetch(url, options)
  .then((res) => {
    if(res.ok) {
      // on extraie le résultat en JSON
      return res.json();
    }
  })
  .then((response) => {
    response.forEach(elt => {
      addOneLine(elt);
    });
  })