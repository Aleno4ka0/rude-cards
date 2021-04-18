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

  createJoinButton() {
    this.userElement = createDOMElement({
      elementName: 'button', 
      classNames: 'button__user', 
      children: 'добавить пользователя', 
      parent: this.pageContentElement,
    });

    const onClick = () => {
      this.app.joinAs('valera1');
    };
    this.userElement.addEventListener('click', onClick.bind(this));
  }
}
