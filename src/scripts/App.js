import RegistrationPage from './RegistrationPage';
import Page from './Page';
import Facade from './Facade';

export default class App {
    constructor() {
      this.inGame = false;
      const onRecieve =  (messageOutput) => {
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
    
        this.facade = new Facade(onRecieve.bind(this));
    }

    createPage() {
      this.pageElement = createDOMElement({
        elementName: 'div', 
        classNames: 'page', 
        parent: document.body,
      });
    }

    start(){
        const registrationPage = new RegistrationPage(this);
        registrationPage.renderPage();    
    }

    joinAs(user){
        this.gamePage = new Page(this);
        this.facade.addUser(user);
    }

}
