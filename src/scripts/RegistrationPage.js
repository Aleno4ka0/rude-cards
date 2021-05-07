import createDOMElement from './createDOMElement';
import Footer from './Footer';
import Header from './Header';

import '../css/registrationPage.scss';

export default class RegistrationPage {
  constructor(app) {
    this.app = app;
  }

  onConnect(){
    this.createGameButtonElement.disabled = false;
    this.userElement.disabled = false;
  }

  renderPage() {
    this.createPage();
    this.app.header = new Header(this.page);
    this.app.header.renderHeader();

    this.createPageContent();
    this.createRegistrationField();
    this.createJoinField();
    this.createJoinButton();
    this.createCreateButton();

    this.app.footer = new Footer(this.page);
    this.app.footer.renderFooter();
  }

  createPage() {
    this.pageWrapper = createDOMElement({
      elementName: 'div', 
      classNames: 'page-wrapper', 
      parent: document.body,
    });
    this.page = createDOMElement({
      elementName: 'div',
      classNames: 'page',
      parent: this.pageWrapper,
    });
  }

  createPageContent() {
    this.pageContentElement = createDOMElement({
      elementName: 'div',
      classNames: 'page__content',
      parent: this.page,
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
      if(this.registrationField.value && this.gameIdField.value){
        this.app.joinAs(this.registrationField.value, this.gameIdField.value);
      } else {
        alert('введи имя и id игры или создай новую')
      }
    };
    this.userElement.disabled = true;
    this.userElement.addEventListener('click', onClick.bind(this));
  }

  createCreateButton() {
    this.createGameButtonElement = createDOMElement({
      elementName: 'button',
      classNames: 'button__user',
      children: 'Создать новую игру',
      parent: this.pageContentElement,
    });

    const onClick = () => {
      if(this.registrationField.value){
        this.app.facade.createGame();
      } else {
        alert('имя введи')
      }
    };
    this.createGameButtonElement.disabled = true;
    this.createGameButtonElement.addEventListener('click', onClick.bind(this));
  }
  
  createJoinField() {
    this.gameIdField = createDOMElement({
      elementName: 'input',
      classNames: 'user__name',
      parent: this.pageContentElement,
    });
    this.gameIdField.placeholder = 'id игры'; 
  }
  
}
