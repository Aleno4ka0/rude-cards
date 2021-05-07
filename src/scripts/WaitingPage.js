import createDOMElement from './createDOMElement';
import Footer from './Footer';
import Header from './Header';

export default class WaitingPage {

  constructor(app){
    this.app = app
  }

  reRenderPage(msg){
    this.updateCount(msg.players.length);
    this.startButton.disabled = msg.players.length < 3
  }

  renderPage() {
    document.body.innerHTML = ''
    this.createPageAndPageWrapper();
    this.header = new Header(this.page);
    this.header.renderHeader();

    this.createPageContent();
    this.updateCount(1);
    this.createStartButton();

    const footer = new Footer(this.page);
    footer.renderFooter();
  }

  createPageAndPageWrapper() {
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
    this.pageContent = createDOMElement({
      elementName: 'div',
      classNames: 'page__content',
      parent: this.page,
    });
  }

  updateCount(count){
    if (this.status === undefined) {
      this.status = createDOMElement({
        elementName: 'div',
        classNames: 'status',
        parent: this.pageContent,
      }); 
    }
    this.status.innerHTML = `Ожидание игроков... <br> ${count}/10 <br> Для старта нужно хотя бы 3 <br> id игры: ${this.app.facade.gameId}`
  }

  createStartButton() {
    this.startButton = createDOMElement({
      elementName: 'button',
      classNames: 'button__user',
      children: 'Начать игру',
      parent: this.pageContent,
    });

    const onClick = () => {
      this.app.facade.startGame();
    };
    this.startButton.disabled = true;
    this.startButton.addEventListener('click', onClick.bind(this));
  }

}
