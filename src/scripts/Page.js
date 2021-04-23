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
    this.createPage();
    const header = new Header(this.pageElement);
    header.renderHeader();

    this.pageContent = new PageContent(this.pageElement, this.app);
    this.pageContent.renderPageContent(msg);

    const footer = new Footer(this.pageElement);
    footer.renderFooter();
  }

  createPage() {
    this.pageElement = createDOMElement({
      elementName: 'div', 
      classNames: 'page', 
      parent: document.body,
    });
  }

  onGameConnect(msg) {
    document.body.innerHTML = ''
    this.renderPage(msg)
  }

  refreshAnswers(msg, selfReply) {
    if (selfReply) {
      this.pageContent.applyAnswer();      
    }
    this.pageContent.addAnswer(msg.card.text, msg.card.uid);
  }

  endRound(msg){
    this.pageContent.reRenderPageContent(msg);
  }

  showError(e) {
    console.log(e)
  }
}
