let filmH1;
let producerSpan;
let directorSpan;
let titleSpan;
let filmsDiv;
let planetDiv;
let releaseDateSpan;
let episodeIdSpan;
let openingCrawlSpan;
let charactersUl;
let planetsUl;
const baseUrl = `http://localhost:9001/api`;

// Runs on page load
addEventListener('DOMContentLoaded', () => {
  filmH1 = document.querySelector('h1#film');
  producerSpan = document.querySelector('span#producer');
  titleSpan = document.querySelector('span#title');
  directorSpan = document.querySelector('span#director');
  releaseDateSpan = document.querySelector('span#releaseDate');
  episodeIdSpan = document.querySelector('span#episodeId');
  openingCrawlSpan = document.querySelector('span#openingCrawl');
  //homeworldSpan = document.querySelector('span#homeworld');
  charactersUl = document.querySelector('#characters>ul');
  planetsUl = document.querySelector('#planets>ul');
  const sp = new URLSearchParams(window.location.search)
  const id = sp.get('id')
  getFilm(id)
});

async function getFilm(id) {
  let film;
  try {
    film = await fetchFilm(id)
    film.characters = await fetchCharacters(film)
    film.planets = await fetchPlanets(film)
  }
  catch (ex) {
    console.error(`Error reading film ${id} data.`, ex.message);
  }
  renderfilm(film);

}
async function fetchFilm(id) {
  let filmUrl = `${baseUrl}/films/${id}`;
  return await fetch(filmUrl)
    .then(res => res.json())
}

async function fetchCharacters(film) {
  const url = `${baseUrl}/films/${film?.id}/characters`;
  const characters = await fetch(url)
    .then(res => res.json())
  return characters;
}

async function fetchPlanets(film) {
  const url = `${baseUrl}/films/${film?.id}/planets`;
  const planets = await fetch(url)
    .then(res => res.json())
  return planets;
}

const renderfilm = film => {
  document.title = `SWAPI - ${film?.title}`;  // Just to make the browser tab say their name
  filmH1.textContent = film?.title;
  producerSpan.textContent = film?.producer;
  titleSpan.textContent = film?.title;
  directorSpan.textContent = film?.director;
  releaseDateSpan.textContent = film?.release_date;
  episodeIdSpan.textContent = film?.episode_id;
  openingCrawlSpan.textContent = film?.opening_crawl;
  //homeworldSpan.innerHTML = `<a href="/planet.html?id=${film?.homeworld.id}">${film?.homeworld.name}</a>`;
  const charactersList = film?.characters?.map(character => `<li><a href="/character.html?id=${character.id}">${character.name}</li>`)
  charactersUl.innerHTML = charactersList.join("");
  const planetsList = film?.planets?.map(planet => `<li><a href="/planets.html?id=${planet.id}">${planet.name}</li>`)
  planetsUl.innerHTML = planetsList.join("");
}
