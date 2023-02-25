function addCar() 
{
  var marque = document.querySelector('#marque');
  var prixJournee = document.querySelector('#prixJournee');
  var immatriculation = document.querySelector('#immatriculation');
  var dateMiseEnService = document.querySelector('#dateMiseEnService');
  var kilometrage = document.querySelector('#kilometrage');
  var numeroReservation = document.querySelector('#numeroReservation');
  var dateDeDebut = document.querySelector('#dateDeDebut');
  var dateDeFin = document.querySelector('#dateDeFin');


  var tmp = 
  {
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

  let options = 
  {
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
  .then((res) => 
  {
    if(res.ok) 
    {
      addOneLine(tmp);
      localStorage.setItem('carName', tmp.nom);
      document.forms['formSpe'].reset(); 
    }
  });
}

function deleteCar(id) 
{
let url = '/cars/' + id;
let options = {
  method: 'DELETE',
}

fetch(url, options)
  .then((res) => 
  {
    if(res.ok) 
    {
      window.location.href = '/pages/listscar.html';
    }
  })
}

function addOneLine(data) 
{
  var tab = document.querySelector('#cars');
  var newLine = document.createElement('tr');
  for (const prop in data) 
  {
    if(prop != '_id' && prop != '__v') 
    {
      var tmp = document.createElement('td');
      tmp.innerText = data[prop]; 
      newLine.appendChild(tmp);
    }
  }

  var tdLink = document.createElement('td');
  var link = document.createElement('a');
  link.href = '/pages/detail.html#' + data._id;
  link.innerText = 'Détails';
  tdLink.appendChild(link);
  newLine.appendChild(tdLink);

  var tdSuppr = document.createElement('td');
  var btnSuppr = document.createElement('button');
  btnSuppr.innerText = 'Delete';
  btnSuppr.classList.add('btn', 'btn-outline-danger');
  tdSuppr.appendChild(btnSuppr);
  newLine.appendChild(tdSuppr);

  btnSuppr.addEventListener('click', (e) => 
  {
    deleteCar(data._id);
  });

  // tab.appendChild(newLine);
}

var btn = document.querySelector('#valid');
btn.addEventListener('click', (e) => 
{
e.preventDefault();
addCar();
});

let myHeaders = new Headers();
let url = '/cars';

let options = 
{
method: 'GET', // GET INFORMATIONS
headers: myHeaders,
mode: 'cors',
cache: 'default'
};

fetch(url, options)
.then((res) => 
{
  if(res.ok) 
  {
    return res.json();
  }
})
.then((response) => 
{
  response.forEach(elt => 
    {
    addOneLine(elt);
  });
})