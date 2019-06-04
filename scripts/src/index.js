import Controller from './controller.js';

function ConfigureDOMItems(controller) {
  const mainFilterInput = document.getElementById('mainFilterInput');
  const btnMainFilter = document.getElementById('btnMainFilter');
  mainFilterInput.addEventListener("keyup", e => {
    e.preventDefault();
    if (e.keyCode == 13) {
      btnMainFilter.click();
    }
});
  const sourceItems = document.getElementsByClassName('news-sources__item');
  for (let i = 0; i < sourceItems.length; i++) {
    sourceItems[i].onclick = function() {
      controller.SourceNewsClick(sourceItems[i].id);
    };
  }
  btnMainFilter.onclick = () => { controller.RequestClick(mainFilterInput.value); };
  document.getElementById('btnMainLoadMore').onclick = () => { controller.LoadMore(); };
}

const controller = new Controller();
controller.SetNewsSources()
    .then(() => {
      ConfigureDOMItems(controller);
    });
controller.SourceNewsClick('');
