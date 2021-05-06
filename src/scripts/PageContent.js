import '../css/pageContent.scss';
import Player from './Player';
import InfoBar from './Infobar';
import Game from './Game';

export default class PageContent {
  constructor(parentNode, app) {
    this.page = parentNode;
    this.app = app;
  }

  renderPageContent(msg) {
    this.game = new Game(this.page, this.app);
    this.game.renderGame(msg);

    this.infoBar = new InfoBar(this.page);
    this.infoBar.renderInfoBar(msg.detail);

    this.player = new Player(this.page, this.app);
    this.player.renderPlayer(msg);
  }

  reRenderPageContent(msg) {
    this.game.reRenderGame(msg);
    this.infoBar.reRenderInfoBar(msg.detail); 
    this.player.reRenderPlayer(msg);
  }

}
