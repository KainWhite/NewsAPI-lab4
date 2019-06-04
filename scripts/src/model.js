import View from './view.js';
var Promise = require('promise');
const DEFAULT_NEWS_COUNT = 5;
const NEWS_ADD_COUNT = 5;

export default class Model {
  constructor() {
    this.view = new View();
  }
  ResetArticleCount() {
    this.articleCount = DEFAULT_NEWS_COUNT;
  }
  SetNewsSources() {
    const fakeThis = this;
    return new Promise(function(resolve, reject) {
      const url = 'https://newsapi.org/v2/sources?' +
                  'apiKey=41950848958d4781988fa88a37b96003';
      const req = new Request(url);
      fetch(req)
          .then(response => {
            return response.json();
          }, error => {
            alert(error);
          }).then(data => {
            fakeThis.view.SetNewsSources(data.sources);
            resolve();
          });
    });
  }
  GetNewsFromSource(source) {
    console.log(source);
    const url = 'https://newsapi.org/v2/top-headlines?' +
                (source == '' ? 'country=us&' : `sources=${source}&`) +
                'sortBy=popularity&' +
                'apiKey=41950848958d4781988fa88a37b96003';
    /*const url = 'https://newsapi.org/v2/top-headlines?' +
                'sources=bbc-news&' +
                'apiKey=41950848958d4781988fa88a37b96003';*/
    const req = new Request(url);
    const fakeThis = this;
    fetch(req)
        .then(response => {
          return response.json();
        }, error => {
          alert(error);
        }).then(function (data) {
          fakeThis.view.ResetNews();
          fakeThis.ResetArticleCount();
          fakeThis.articles = data.articles;
          fakeThis.view.AddNews(fakeThis.articles, 0, fakeThis.articleCount);
        });
  }
  GetNewsByRequest(request) {
    const url = 'https://newsapi.org/v2/everything?' +
                'q=' + request + '&' +
                'sortBy=popularity&' +
                'apiKey=41950848958d4781988fa88a37b96003';
    const fakeThis = this;
    const req = new Request(url);
    fetch(req)
        .then(response => {
          return response.json();
        }, error => {
          alert(error);
        }).then(function (data) {
          fakeThis.view.ResetNews();
          fakeThis.ResetArticleCount();
          fakeThis.articles = data.articles;
          fakeThis.view.AddNews(fakeThis.articles, 0, fakeThis.articleCount);
        });
  }
  LoadMore() {
    this.articleCount += NEWS_ADD_COUNT;
    console.warn(this.articles);
    this.view.AddNews(this.articles, this.articleCount - NEWS_ADD_COUNT, this.articleCount);
  }
}
