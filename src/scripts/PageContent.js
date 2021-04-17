import createDOMElement from './createDOMElement';
import '../css/pageContent.scss';
import Cards from './Cards';
import InfoBar from './Infobar';

export default class PageContent {
  constructor(parentNode) {
    this.page = parentNode;
  }

  renderPageContent() {
    this.createWrapperPageContent();
    this.createPageContent();
    this.createWrapper('page-content__question');

    this.createWrapperInfoBar();
    const infoBar = new InfoBar(this.wrapperElementInfoBar);
    infoBar.renderInfoBar();

    this.createWrapperCards();
    const cards = new Cards(this.wrapperCardsElement);
    cards.renderCards();
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

  createWrapper(className) {
    this.wrapper = {
      elementName: 'div', classNames: className, children: 'sasa', parent: this.pageContentElement,
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
