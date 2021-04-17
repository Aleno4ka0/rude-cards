import createDOMElement from './createDOMElement';
import '../css/pageContent.scss';
import Cards from './Cards';
import InfoBar from './Infobar';

export default class PageContent {
  constructor(parentNode, facade) {
    this.page = parentNode;
    this.facade = facade;
  }

  renderPageContent(msg) {
    this.createWrapperPageContent();
    this.createPageContent();
    this.createWrapper('page-content__question', 'question');

    this.createWrapperInfoBar();
    const infoBar = new InfoBar(this.wrapperElementInfoBar);
    infoBar.renderInfoBar();

    this.createWrapperCards();
    const onClick = (e) => {
      e.path[0].style.visibility = "hidden"
      this.facade.sendAnswer(e.id)  
    }
    const cards = new Cards(this.wrapperCardsElement, onClick);
    cards.renderCards(msg);
  }

  createWrapperPageContent() {
    this.wrapperPageContent = {
      elementName: 'div', classNames: 'page-content__wrapper', parent: this.page,
    };
    this.wrapperPageContentElement = createDOMElement(this.wrapperPageContent);
  }

  createPageContent() {
    this.pageContent = {
      elementName: 'div', classNames: 'page-content', parent: this.wrapperPageContentElement,
    };
    this.pageContentElement = createDOMElement(this.pageContent);
  }

  createWrapper(className, qustion) {
    this.wrapper = {
      elementName: 'div', classNames: className, children: qustion, parent: this.pageContentElement,
    };
    this.wrapperElement = createDOMElement(this.wrapper);
  }

  createWrapperInfoBar() {
    this.wrapper = {
      elementName: 'div', classNames: 'page-content__info', parent: this.pageContentElement,
    };
    this.wrapperElementInfoBar = createDOMElement(this.wrapper);
  }

  createWrapperCards() {
    this.wrapperCards = {
      elementName: 'div', classNames: 'page-content__cards', parent: this.pageContentElement,
    };
    this.wrapperCardsElement = createDOMElement(this.wrapperCards);
  }
}
