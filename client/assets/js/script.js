let myHeaders = new Headers();
let url = '/liste';

let options = {
  method: 'GET',
  headers: myHeaders,
  mode: 'cors',
  cache: 'default'
};

let containerListe = document.querySelector('#liste');

fetch(url, options)
  .then((res) => {
    if(res.ok) {
      // on extraie le résultat en JSON
      return res.json();
    }
  })
  .then((response) => {
    response.forEach(elt => {
      let myAnime = document.createElement('div');
      let myTitle = document.createElement('h2');
      let myP = document.createElement('p');
      myP.innerHTML = `<strong>Pays :</strong> ${elt.pays} <strong>Chaine :</strong> ${elt.chanel}`;

      let myLink = document.createElement('a');
      myLink.href = './anime.html#'+ elt.id;
      myLink.innerText = 'détails';

      if(elt.onAir) {
        myAnime.style.backgroundColor = 'lightgreen';
      } else {
        myAnime.style.backgroundColor = 'tomato';
      }

      myTitle.innerText = elt.name;

      containerListe.appendChild(myAnime);
      myAnime.appendChild(myTitle);
      myAnime.appendChild(myP);
      myAnime.appendChild(myLink);
    });
  })