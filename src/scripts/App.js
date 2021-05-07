import RegistrationPage from './RegistrationPage';
import WaitingPage from './WaitingPage';
import Page from './Page';
import ClientFacade from './ClientFacade';

export default class App {
  constructor() {
    this.inGame = false;
    this.onRecieve = (messageOutput) => {
      const msg = JSON.parse(messageOutput.body);
      switch (msg.type) {
        case 'PLAYER_LIST_UPDATED':
          if (this.inGame) {
            this.gamePage.pageContent.player.playerList.createListPlayers(msg.players);
          } else {
            if (msg.gameStatus == 'NEW'){
              this.forwardWaitingPage();
              this.gamePage.reRenderPage(msg); 
            } else {
              this.forwardGamePage(msg); 
            }
          }
          break;
        case 'NEW_ANSWER':
          this.gamePage.refreshAnswers(msg, msg.detail == this.facade.userID);
          break;
        case 'NEXT_ROUND':
          if (this.inGame) {
            this.gamePage.pageContent.reRenderPageContent(msg);
          } else {
            this.forwardGamePage(msg);  
          }
          break;
        case 'EXCEPTION':
          this.gamePage.showError(msg.detail);
          break;
      }
    };
    const onCommonRecieve = (messageOutput) => {
      this.facade.setGameId(messageOutput.body, this.onRecieve);
      const username = this.gamePage.registrationField.value;
      this.forwardWaitingPage();
      this.joinAs(username);
    };

    this.forwardRegistrationPage();
    this.facade = new ClientFacade(onCommonRecieve.bind(this), this.gamePage.onConnect.bind(this.gamePage));
  }

  forwardRegistrationPage() {
    this.gamePage = new RegistrationPage(this);
    this.gamePage.renderPage();
    this.resize();
  }

  forwardWaitingPage() {
    this.gamePage = new WaitingPage(this);
    this.gamePage.renderPage();
    this.resize();
  }

  forwardGamePage(msg) {
    this.gamePage = new Page(this);
    this.gamePage.onGameConnect(msg);
    this.inGame = true;
    this.resize();
  }

  joinAs(user, gameId) {
    if (gameId) {
      this.facade.setGameId(gameId, this.onRecieve.bind(this));
    }
    this.facade.addUser(user);
  }

  resize() {
    const min = Math.min(window.visualViewport.width / 1024, window.visualViewport.height / 768);
    this.gamePage.page.style.transform = `scale(${min})`;
    this.gamePage.page.style.webkitTransform = `scale(${min})`;
  }
}
