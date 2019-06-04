import Model from './model.js';

export default class Controller {
  constructor() {
    this.model = new Model();
  }
  SetNewsSources() {
    return new Promise((resolve, reject) => {
      this.model.SetNewsSources().then(() => {
        resolve();
      });
    });
  }
  SourceNewsClick(source) {
    if(source == 'allNews') {
      source = '';
    }
    this.model.GetNewsFromSource(source);
  }
  RequestClick(request) {
    this.model.GetNewsByRequest(request);
  }
  LoadMore() {
    this.model.LoadMore();
  }
}
