import createDOMElement from './createDOMElement';
import Footer from './Footer';
import Header from './Header';

import '../css/registrationPage.scss';

export default class RegistrationPage {
  constructor(facade) {
    this.facade = facade;
  }

  renderPage() {
    this.createPage();
    const header = new Header(this.pageElement);
    header.renderHeader();
    this.createPageContent();
    this.createUser();

    const footer = new Footer(this.pageElement);
    footer.renderFooter();
  }

  createPage() {
    this.page = {
      elementName: 'div', classNames: 'page', parent: document.body,
    };
    this.pageElement = createDOMElement(this.page);
  }

  createPageContent() {
    this.pageContent = {
      elementName: 'div', classNames: 'page__content', parent: this.pageElement,
    };
    this.pageContentElement = createDOMElement(this.pageContent);
  }

  createUser() {
    this.user = {
      elementName: 'button', classNames: 'button__user', children: 'добавить пользователя', parent: this.pageContentElement,
    };
    this.userElement = createDOMElement(this.user);

    const onClick = () => {
      this.facade.addUser('valera1');
    };
    this.userElement.addEventListener('click', onClick.bind(this));
  }
}
