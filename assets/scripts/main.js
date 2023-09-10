const API_KEY = '23c7a1fa38a5446ab9c659489a302943';
const BASE_URL = 'https://newsapi.org/v2/everything?q=';

const defaultQueries = ['World Affairs', 'Top Headlines', 'Technology', 'Indian Politics', 'Sports', 'Entertainment'];

async function fetchNews(query) {
    // let response = await fetch(`${BASE_URL}${query}&apiKey=${API_KEY}`);
    // let newsData = await response.json();
    let newsData = dummyData;
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
    let days = Math.floor(difference / (1000 * 3600 * 24));
    let hours = Math.floor((difference % (1000 * 3600 * 24)) / (1000 * 3600));
    image.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsSource.innerHTML = `${article.source.name}, ${hours} hours ago`;
    newsDescription.innerHTML = article.description;
}

function bindData(articles) {
    const cardsContainer = document.getElementById('cards-container');
    const newsTemplate = document.getElementById('template-news-card');
    cardsContainer.innerHTML = '';
    for (let i = 0; i < articles.length; i++) {
        if (articles.urlToImage) {
            continue;
        }
        const card = newsTemplate.content.cloneNode(true);
        fillCard(card, articles[i]);
        cardsContainer.appendChild(card);
    }
}

window.addEventListener('load', () => fetchNews(defaultQueries[2]));
