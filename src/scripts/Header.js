import createDOMElement from './createDOMElement';
import '../css/header.scss';

export default class Header {
  constructor(parentNode) {
    this.page = parentNode;
  }

  renderHeader() {
    this.createHeader();
    this.createHeaderContent();
  }

  createHeader() {
    this.headerElement = createDOMElement({
      elementName: 'div', 
      classNames: 'header', 
      parent: this.page,
    });
  }

  createHeaderContent() {
    this.headerContentElement = createDOMElement({
      elementName: 'div', 
      classNames: 'header__content', 
      children: 'Карты против всех', 
      parent: this.headerElement,
    });
  }
}
