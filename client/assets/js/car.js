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
    method: 'POST', // SEND INFORMATIONS
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
      // Je stocke la marque / prix en local / numéro de réservation
      localStorage.setItem('carName', tmp.marque);
      localStorage.setItem('carPrice', tmp.prixJournee);
      localStorage.setItem('carNumber', tmp.numeroReservation);
      document.forms['formSpe'].reset(); 
    }
  });
}

// Je fais une fonction pour récupérer toutes les marques
function getAllCarNames(response) 
{
  let carNames = [];
  response.forEach(car => 
  {
    carNames.push(car.marque);
  });
  return carNames;
}
// Je fais une fonction pour récupérer touts les prix
function getAllCarPrices(response) 
{
  let carPrices = [];
  response.forEach(car => 
  {
    carPrices.push(car.prixJournee);
  });
  return carPrices;
}
// Je fais une fonction pour récupérer touts les n° de réservation correspondant à la voiture
function getAllCarNumbers(response) 
{
  let carNumbers = [];
  response.forEach(car => 
  {
    carNumbers.push(car.numeroReservation);
  });
  return carNumbers;
}
//

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
  btnSuppr.classList.add('btn', 'btn-danger');
  tdSuppr.appendChild(btnSuppr);
  newLine.appendChild(tdSuppr);

  btnSuppr.addEventListener('click', (e) => 
  {
    deleteCar(data._id);
  });

  tab.appendChild(newLine);
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
  // Ici je stocke l'objet dans le local storage
  const allCarNames = getAllCarNames(response);
  if (allCarNames.length > 0) 
  {
    localStorage.setItem('carNames', JSON.stringify(allCarNames));
  }
  // Ici je stocke l'objet dans le local storage
  const allCarPrices = getAllCarPrices(response);
  if (allCarPrices.length > 0) 
  {
    localStorage.setItem('carPrices', JSON.stringify(allCarPrices));
  }
    // Ici je stocke l'objet dans le local storage
    const AllCarNumbers = getAllCarNumbers(response);
    if (getAllCarNumbers.length > 0) 
    {
      localStorage.setItem('carNumbers', JSON.stringify(AllCarNumbers));
    }
})