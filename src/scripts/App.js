import RegistrationPage from './RegistrationPage';
import Page from './Page';
import ClientFacade from './ClientFacade';

export default class App {
  constructor() {
    this.inGame = false;
    this.onRecieve = (messageOutput) => {
        const msg = JSON.parse(messageOutput.body)
        switch (msg.type) {
          case 'PLAYER_LIST_UPDATED':
            if (this.inGame) {
              this.gamePage.pageContent.player.createListPlayers(msg.players);
            } else {
              this.forwardGamePage(msg);  
            }
            break;
          case 'NEW_ANSWER':
            this.gamePage.refreshAnswers(msg, msg.detail == this.facade.userID);
            break;
          case 'NEXT_ROUND':
            this.gamePage.pageContent.reRenderPageContent(msg);
            break;
          case 'EXCEPTION':
            this.gamePage.showError(msg.detail);
            break;
        }
      };
    const onCommonRecieve = (messageOutput) => {
      this.facade.setGameId(messageOutput.body, this.onRecieve);
      const username = this.gamePage.registrationField.value;
      this.joinAs(username);  
    };
  
    this.forwardRegistrationPage();
    this.facade = new ClientFacade(onCommonRecieve.bind(this), this.gamePage.onConnect.bind(this.gamePage));
  }


  forwardRegistrationPage(){
      this.gamePage = new RegistrationPage(this);
      this.gamePage.renderPage(); 
      this.resize();   
  }

  forwardGamePage(msg){
    this.gamePage = new Page(this);
    this.gamePage.onGameConnect(msg);
    this.inGame = true;  
    this.resize();
  }

  joinAs(user, gameId){
      if(gameId){
        this.facade.setGameId(gameId, this.onRecieve.bind(this));
      }
      this.facade.addUser(user);
  }

  resize(){
    const min = Math.min(window.innerWidth / 1024, window.innerHeight / 768)
    this.gamePage.page.style.transform = 'scale(' + min + ')'
    this.gamePage.page.style.webkitTransform = 'scale(' + min + ')'
  }

}
