import createDOMElement from './createDOMElement';
import Footer from './Footer';
import Header from './Header';

import '../css/registrationPage.scss';

export default class RegistrationPage {
  constructor(app) {
    this.app = app;
  }

  renderPage() {
    this.createPage();
    this.app.header = new Header(this.pageElement);
    this.app.header.renderHeader();

    this.createPageContent();
    this.createRegistrationField();
    this.createJoinButton();

    this.app.footer = new Footer(this.pageElement);
    this.app.footer.renderFooter();
  }

  createPage() {
    this.pageElement = createDOMElement({
      elementName: 'div',
      classNames: 'page',
      parent: document.body,
    });
  }

  createPageContent() {
    this.pageContentElement = createDOMElement({
      elementName: 'div',
      classNames: 'page__content',
      parent: this.pageElement,
    });
  }

  createRegistrationField() {
    this.registrationField = createDOMElement({
      elementName: 'input',
      classNames: 'user__name',
      parent: this.pageContentElement,
    });
    this.registrationField.placeholder = 'введите имя'; 
  }

  createJoinButton() {
    this.userElement = createDOMElement({
      elementName: 'button',
      classNames: 'button__user',
      children: 'Присоединиться к игре',
      parent: this.pageContentElement,
    });

    const onClick = () => {
      this.app.joinAs(this.registrationField.value);
    };
    this.userElement.addEventListener('click', onClick.bind(this));
  }
}
