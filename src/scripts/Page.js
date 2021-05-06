import createDOMElement from './createDOMElement';
import Footer from './Footer';
import Header from './Header';
import PageContent from './PageContent';
import '../css/page.scss';

export default class Page {

  constructor(app){
    this.app = app
  }

  renderPage(msg) {
    this.createPageAndPageWrapper();
    this.header = new Header(this.page);
    this.header.renderHeader();

    this.pageContent = new PageContent(this.page, this.app);
    this.pageContent.renderPageContent(msg);

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

  onGameConnect(msg) {
    document.body.innerHTML = ''
    this.renderPage(msg)
  }

  refreshAnswers(msg, selfReply) {
    if (selfReply) {
      this.pageContent.player.applyAnswer();      
    }
    this.pageContent.game.addAnswer(msg.card.text, msg.card.uid);
  }

  showError(e) {
    console.log(e)
  }
}
