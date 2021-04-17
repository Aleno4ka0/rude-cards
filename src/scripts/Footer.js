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
    this.footer = {
      elementName: 'div', classNames: 'footer', parent: this.page,
    };
    this.footerElement = createDOMElement(this.footer);
  }

  createFooterContent() {
    this.footerContent = {
      elementName: 'div', classNames: 'footer__content', parent: this.footerElement,
    };
    this.footerContentElement = createDOMElement(this.footerContent);
  }

  createFooterText(text) {
    this.textContent = {
      elementName: 'div', classNames: 'footer__text', children: text, parent: this.footerContentElement,
    };
    this.textContentElement = createDOMElement(this.textContent);
  }
}
