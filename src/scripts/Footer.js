import createDOMElement from './createDOMElement';
import '../css/footer.scss';

export default class Footer {
  constructor(parentNode) {
    this.page = parentNode;
  }

  renderFooter() {
    this.createFooter();
    this.createFooterContent();
    this.createFooterText('Над проектом работали: <br>Леха <br> Алемба');
  }

  createFooter() {
    this.footerElement = createDOMElement({
      elementName: 'div', 
      classNames: 'footer', 
      parent: this.page,
    });
  }

  createFooterContent() {
    this.footerContentElement = createDOMElement({
      elementName: 'div', 
      classNames: 'footer__content', 
      parent: this.footerElement,
    });
  }

  createFooterText(text) {
    this.textContentElement = createDOMElement({
      elementName: 'div', 
      classNames: 'footer__text', 
      children: text, 
      parent: this.footerContentElement,
    });
  }
}
