import RegistrationPage from './RegistrationPage';
import Page from './Page';
import Facade from './Facade';

export default class App {
    constructor() {
      this.inGame = false;
      this.onRecieve = (messageOutput) => {
          const msg = JSON.parse(messageOutput.body)
          switch (msg.type) {
            case 'PLAYER_LIST_UPDATED':
              if (this.inGame) {
                this.gamePage.pageContent.cards.createListPlayers(msg.players);
              } else {
                this.gamePage.onGameConnect(msg);
                this.inGame = true;
              }
              break;
            case 'NEW_ANSWER':
              this.gamePage.refreshAnswers(msg, msg.detail == this.facade.userID);
              break;
            case 'NEXT_ROUND':
              this.gamePage.endRound(msg);
              break;
            case 'EXCEPTION':
              this.gamePage.showError(msg.detail);
              break;
          }
        };
      const onCommonRecieve = (messageOutput) => {
        this.facade.setGameId(messageOutput.body, this.onRecieve);
        const username = this.registrationPage.registrationField.value;
        this.joinAs(username);  
      };
    
      this.start();
      this.facade = new Facade(onCommonRecieve.bind(this), this.registrationPage.onConnect.bind(this.registrationPage));
    }

    createPage() {
      this.pageElement = createDOMElement({
        elementName: 'div', 
        classNames: 'page', 
        parent: document.body,
      });
    }

    start(){
        this.registrationPage = new RegistrationPage(this);
        this.registrationPage.renderPage();    
    }

    joinAs(user, gameId){
        this.gamePage = new Page(this);
        if(gameId){
          this.facade.setGameId(gameId, this.onRecieve.bind(this));
        }
        this.facade.addUser(user);
    }

}
