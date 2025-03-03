const { getPlanet } = require("./film");

let idH1;
let climateSpan;
let surface_waterSpan;
let nameSpan;
let diameterSpan;
let rotation_periodSpan;
let terrainSpan;
let gravitySpan;
let orbital_periodSpan;
let populationSpan;
let charactersUl;
let planetsUl;
let filmsDiv;
let planetDiv;
const baseUrl = `http://localhost:9001/api`;

addEventListener('DOMContentLoaded', () => {
    idH1 = document.querySelector('h1#id');
    climateSpan = document.querySelector('span#climate');
    surface_waterSpan = document.querySelector('span#surface_water');
    nameSpan = document.querySelector('span#name');
    diameterSpan = document.querySelector('span#diameter');
    rotation_periodSpan = document.querySelector('span#rotation_period');
    terrainSpan = document.querySelector('span#terrain');
    gravitySpan = document.querySelector('span#gravity');
    orbital_periodSpan = document.querySelector('span#orbital_period');
    populationSpan = document.querySelector('span#population');
    charactersUl = document.querySelector('#characters>ul');
    planetsUl = document.querySelector('#planets>ul');
    const sp = new URLSearchParams(window.location.search)
    const id = sp.get('id')
    getPlanet(id)
  });

  async function getPlanet(id) {
    let planet;
    try {
      planet = await fetchPlanet(id)
      planet.characters = await fetchCharacters(film)
      planet.films = await fetchFilms(film)
    }
    catch (ex) {
      console.error(`Error reading film ${id} data.`, ex.message);
    }
    renderplanet(planet);
  
  }

  async function fetchPlanet(id) {
    let planetUrl = `${baseUrl}/planets/${id}`;
    return await fetch(planetUrl)
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
    massSpan.textContent = character?.mass;
    birthYearSpan.textContent = character?.birth_year;
    homeworldSpan.innerHTML = `<a href="/planet.html?id=${character?.homeworld.id}">${character?.homeworld.name}</a>`;
    const filmsLis = character?.films?.map(film => `<li><a href="/film.html?id=${film.id}">${film.title}</li>`)
    filmsUl.innerHTML = filmsLis.join("");
  }
  