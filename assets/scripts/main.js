const API_KEY = '23c7a1fa38a5446ab9c659489a302943';
const BASE_URL = 'https://newsapi.org/v2/everything?q=';

const defaultQueries = ['World Politics India', 'Top Headlines', 'Technology', 'Indian Politics', 'Sports', 'Entertainment'];

async function fetchNews(query) {
    let response = await fetch(`${BASE_URL}${query}&apiKey=${API_KEY}`);
    let newsData = await response.json();
    // let newsData = dummyData;
    console.log(newsData);
    bindData(newsData.articles);
}

function fillCard(card, article) {
    let image = card.querySelector('#news-img');
    let newsTitle = card.querySelector('#news-title');
    let newsSource = card.querySelector('#news-source');
    let newsDescription = card.querySelector('#news-description');
    let publishedDate = new Date(article.publishedAt);
    let currentDate = new Date().getTime();
    let difference = currentDate - publishedDate;
    let hours = Math.floor((difference % (1000 * 3600 * 24)) / (1000 * 3600));
    image.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsSource.innerHTML = `${article.source.name}, ${hours} hours ago`;
    newsDescription.innerHTML = article.description;

    card.firstElementChild.addEventListener('click', () => {
        window.open(article.url, '_blank');
    });
}

function bindData(articles) {
    const cardsContainer = document.getElementById('cards-container');
    const newsTemplate = document.getElementById('template-news-card');
    cardsContainer.innerHTML = '';
    for (let i = 0; i < articles.length; i++) {
        // if (articles.urlToImage) {
        //     continue;
        // }
        const card = newsTemplate.content.cloneNode(true);
        fillCard(card, articles[i]);
        cardsContainer.appendChild(card);
    }
}

const searchButton = document.getElementById('search-button');
const userInput = document.getElementById('user-input');
let activeNav = null;

searchButton.addEventListener('click', async () => {
    if (userInput.value) {
        await search(userInput.value);
        activeNav?.classList.remove('active');
        activeNav = null;
    }
});
async function search(query, navClicked, id) {
    await fetchNews(query);
    if (navClicked) {
        const navItem = document.getElementById(id);
        activeNav?.classList.remove('active');
        activeNav = navItem;
        activeNav.classList.add('active');
    }
}

window.addEventListener('load', () => fetchNews(defaultQueries[0]));
