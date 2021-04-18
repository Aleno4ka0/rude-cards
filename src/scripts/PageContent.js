import createDOMElement from './createDOMElement';
import '../css/pageContent.scss';
import Cards from './Cards';
import InfoBar from './Infobar';

export default class PageContent {
  constructor(parentNode, app) {
    this.page = parentNode;
    this.app = app;
  }

  renderPageContent(msg) {
    this.createWrapperPageContent();
    this.createPageContent();
    this.createWrapper('page-content__question', msg.card.text);

    this.createWrapperInfoBar();
    const infoBar = new InfoBar(this.wrapperElementInfoBar);
    infoBar.renderInfoBar();

    this.createWrapperCards();
    const onClick = (e) => {
      e.target.classList.add('card__invisible');
      this.app.sendAnswer(e.target.id);
    }
    this.cards = new Cards(this.wrapperCardsElement, onClick.bind(this));
    this.cards.renderCards(msg);
  }

  createWrapperPageContent() {
    this.wrapperPageContentElement = createDOMElement({
      elementName: 'div', 
      classNames: 'page-content__wrapper', 
      parent: this.page,
    });
  }

  createPageContent() {
    this.pageContentElement = createDOMElement({
      elementName: 'div', 
      classNames: 'page-content', 
      parent: this.wrapperPageContentElement,
    });
  }

  createWrapper(className, qustion) {
    this.wrapperElement = createDOMElement({
      elementName: 'div', 
      classNames: className, 
      children: qustion, 
      parent: this.pageContentElement,
    });
  }

  createWrapperInfoBar() {
    this.wrapperElementInfoBar = createDOMElement({
      elementName: 'div', 
      classNames: 'page-content__info', 
      parent: this.pageContentElement,
    });
  }

  createWrapperCards() {
    this.wrapperCardsElement = createDOMElement({
      elementName: 'div', 
      classNames: 'page-content__cards', 
      parent: this.pageContentElement,
    });
  }

}
