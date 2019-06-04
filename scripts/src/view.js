const newsSection = document.getElementsByClassName('news')[0];
const newsSourcesDiv = document.getElementsByClassName('news-sources')[0];
export default class View {
  SetNewsSources(newsSources) {
    for (let i = 0; i < newsSources.length; i++) {
      const newsSourcesItem = document.createElement('p');
      newsSourcesItem.setAttribute('class', 'news-sources__item');
      newsSourcesItem.setAttribute('id', newsSources[i].id);
      newsSourcesItem.innerText = newsSources[i].name;
      newsSourcesDiv.appendChild(newsSourcesItem);
    }
  }
  DeleteAllNews() {
    while (newsSection.firstChild) {
      newsSection.removeChild(newsSection.firstChild);
    }
  }
  ResetNews() {
    this.DeleteAllNews();
    const newsItemNone = document.createElement('p');
    newsItemNone.setAttribute('class', 'news__item_none');
    newsItemNone.innerText = 'There are no articles matching your request.';
    newsSection.appendChild(newsItemNone);
  }
  AddNews(articles, articlesBegin, articlesEnd) {
    for (let i = articlesBegin; i < Math.min(articles.length, articlesEnd, 40); i++) {
      if (document.getElementsByClassName('news__item_none').length != 0) {
        newsSection.removeChild(newsSection.firstChild);
      }

      const newsPicture = document.createElement('img');
      newsPicture.setAttribute('class', 'news__picture');
      newsPicture.setAttribute('src', articles[i].urlToImage);
      newsPicture.setAttribute('alt', 'shit happens');

      const newsHeader = document.createElement('h1');
      newsHeader.setAttribute('class', 'news__header');
      newsHeader.innerText = articles[i].title;

      const newsContent = document.createElement('p');
      newsContent.setAttribute('class', 'news__content');
      newsContent.innerText = articles[i].content;

      const newsText = document.createElement('div');
      newsText.setAttribute('class', 'news__text');
      newsText.appendChild(newsHeader);
      newsText.appendChild(newsContent);

      // const newsItem = document.createElement('div');
      // newsItem.setAttribute('class', 'news__item');
      // newsItem.appendChild(newsPicture);
      // newsItem.appendChild(newsText);

      const newsItem = document.createElement('a');
      newsItem.setAttribute('class', 'news__item');
      newsItem.setAttribute('href', articles[i].url);
      newsItem.appendChild(newsPicture);
      newsItem.appendChild(newsText);

      newsSection.appendChild(newsItem);
    }
  }
}
