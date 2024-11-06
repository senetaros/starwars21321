const API_BASE_URL = 'https://swapi.dev/api/films/';

// Загрузить список эпизодов
async function loadFilms() {
    const response = await fetch(API_BASE_URL);
    const data = await response.json();
    const filmList = document.getElementById('filmList');

    data.results.forEach((film, index) => {
        const li = document.createElement('li');
        li.innerHTML = `<a href="film.html?film=${index + 1}">${film.title}</a>`;
        filmList.appendChild(li);
    });
}

// Загрузить детали эпизода
async function loadFilmDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const filmId = urlParams.get('film');

    const response = await fetch(`${API_BASE_URL}${filmId}/`);
    const film = await response.json();

    document.getElementById('filmTitle').innerText = `${film.title} (Episode ${filmId})`;
    document.getElementById('openingCrawl').innerText = film.opening_crawl;

    // Загрузка планет
    const planetList = document.getElementById('planetList');
    for (const planetUrl of film.planets) {
        const planetResponse = await fetch(planetUrl);
        const planetData = await planetResponse.json();
        const planetLi = document.createElement('li');
        planetLi.innerText = planetData.name;
        planetList.appendChild(planetLi);
    }

    // Загрузка рас
    const speciesList = document.getElementById('speciesList');
    for (const speciesUrl of film.species) {
        const speciesResponse = await fetch(speciesUrl);
        const speciesData = await speciesResponse.json();
        const speciesLi = document.createElement('li');
        speciesLi.innerText = speciesData.name;
        speciesList.appendChild(speciesLi);
    }
}

// Проверяем, на какой странице мы находимся и вызываем соответствующую функцию
if (document.getElementById('filmList')) {
    loadFilms();
} else if (document.getElementById('filmTitle')) {
    loadFilmDetails();
}
