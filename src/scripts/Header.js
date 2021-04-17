import createDOMElement from './createDOMElement';
import '../css/header.scss';
// import Menu from './Menu';

export default class Header {
  constructor(parentNode) {
    this.page = parentNode;
  }

  renderHeader() {
    this.createHeader();
    this.createHeaderContent();
  }

  createHeader() {
    this.header = {
      elementName: 'div', classNames: 'header', parent: this.page,
    };
    this.headerElement = createDOMElement(this.header);
  }

  createHeaderContent() {
    this.headerContent = {
      elementName: 'div', classNames: 'header__content', children: 'Карты против всех', parent: this.headerElement,
    };
    this.headerContentElement = createDOMElement(this.headerContent);
    // const menu = new Menu(this.headerContentElement, this.page);
    // menu.renderMenu();
  }
}
