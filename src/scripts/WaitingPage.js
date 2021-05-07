import createDOMElement from './createDOMElement';
import Footer from './Footer';
import Header from './Header';
import img from '../assets/img/play.png';

import '../css/waitingPage.scss';

export default class WaitingPage {
  constructor(app) {
    this.app = app;
  }

  reRenderPage(msg) {
    this.refreshPlayers(msg.players);
    this.startButton.disabled = msg.players.length < 3;
  }

  renderPage() {
    document.body.innerHTML = '';
    this.createPageAndPageWrapper();
    this.header = new Header(this.page);
    this.header.renderHeader();

    this.createPageContent();
    this.createPlayerList();
    this.createControlPanelWrapper();
    this.createStartButton();
    this.createIdButton();

    const footer = new Footer(this.page);
    footer.renderFooter();
  }

  createPageContent() {
    this.pageContent = createDOMElement({
      elementName: 'div',
      classNames: 'waiting-page__content',
      parent: this.page,
    });
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

  createPlayerList() {
    this.playerList = createDOMElement({
      elementName: 'div',
      classNames: 'page__player-list',
      parent: this.pageContent,
    });
  }

  refreshPlayers(players) {
    this.playerList.innerHTML = '';
    this.playerTitle = createDOMElement({
      elementName: 'div',
      classNames: 'player-title',
      children: 'Ожидание игроков:',
      parent: this.playerList,
    });
    for (const i in players) {
      this.status = createDOMElement({
        elementName: 'div',
        children: players[i].username,
        classNames: 'player-row',
        parent: this.playerList,
      });
    }
  }

  createControlPanelWrapper() {
    this.controlPanelWrapper = createDOMElement({
      elementName: 'div',
      classNames: 'note',
      children: 'Для старта игры необходимо хотя бы 3 игрока',
      parent: this.pageContent,
    });
  }

  createStartButton() {
    const image = new Image(40, 40);
    image.src = img;

    this.startButton = createDOMElement({
      elementName: 'button',
      classNames: 'button__user',
      children: [image, 'Начать игру'],
      parent: this.controlPanelWrapper,
    });

    const onStartClick = () => {
      this.app.facade.startGame();
    };
    this.startButton.disabled = true;
    this.startButton.addEventListener('click', onStartClick.bind(this));
  }

  createIdButton() {
    this.idButton = createDOMElement({
      elementName: 'button',
      classNames: 'button__user',
      children: 'Скопировать id игры',
      parent: this.controlPanelWrapper,
    });

    const onCopyClick = () => {
      navigator.clipboard.writeText(this.app.facade.gameId).andThen(alert('Id игры сохранено в буфер обмена'));
    };
    this.idButton.addEventListener('click', onCopyClick.bind(this));
  }
}
