let nameH1;
let producerSpan;
let heightSpan;
let titleSpan;
let filmsDiv;
let planetDiv;
const baseUrl = `http://localhost:9001/api`;

// Runs on page load
addEventListener('DOMContentLoaded', () => {
  nameH1 = document.querySelector('h1#film');
  producerSpan = document.querySelector('span#producer');
  titleSpan = document.querySelector('span#title');
  directorSpan = document.querySelector('span#director');
  releaseDateSpan = document.querySelector('span#releaseDate');
  episodeIdSpan = document.querySelector('span#episodeId');
  openingCrawlSpan = document.querySelector('span#openingCrawl');
  homeworldSpan = document.querySelector('span#homeworld');
  filmsUl = document.querySelector('#films>ul');
  const sp = new URLSearchParams(window.location.search)
  const id = sp.get('id')
  getCharacter(id)
});

async function getCharacter(id) {
  let character;
  try {
    character = await fetchCharacter(id)
    character.homeworld = await fetchHomeworld(character)
    character.films = await fetchFilms(character)
  }
  catch (ex) {
    console.error(`Error reading character ${id} data.`, ex.message);
  }
  renderCharacter(character);

}
async function fetchCharacter(id) {
  let characterUrl = `${baseUrl}/characters/${id}`;
  return await fetch(characterUrl)
    .then(res => res.json())
}

async function fetchHomeworld(character) {
  const url = `${baseUrl}/planets/${character?.homeworld}`;
  const planet = await fetch(url)
    .then(res => res.json())
  return planet;
}

async function fetchFilms(character) {
  const url = `${baseUrl}/characters/${character?.id}/films`;
  const films = await fetch(url)
    .then(res => res.json())
  return films;
}

const renderCharacter = character => {
  document.title = `SWAPI - ${character?.name}`;  // Just to make the browser tab say their name
  nameH1.textContent = character?.name;
  heightSpan.textContent = character?.height;
  titleSpan.textContent = character?.mass;
  producerSpan.textContent = character?.birth_year;
  homeworldSpan.innerHTML = `<a href="/planet.html?id=${character?.homeworld.id}">${character?.homeworld.name}</a>`;
  const filmsLis = character?.films?.map(film => `<li><a href="/film.html?id=${film.id}">${film.title}</li>`)
  filmsUl.innerHTML = filmsLis.join("");
}
