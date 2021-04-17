import createDOMElement from './createDOMElement';
import Footer from './Footer';
import Header from './Header';
import PageContent from './PageContent';
import '../css/page.scss';

export default class Page {
  renderPage(msg) {
    this.createPage();
    const header = new Header(this.pageElement);
    header.renderHeader();

    const pageContent = new PageContent(this.pageElement, this.facade);
    pageContent.renderPageContent(msg);

    const footer = new Footer(this.pageElement);
    footer.renderFooter();
  }

  createPage() {
    this.page = {
      elementName: 'div', classNames: 'page', parent: document.body,
    };
    this.pageElement = createDOMElement(this.page);
  }

  onGameConnect(msg) {
    document.body.innerHTML = ''
    this.renderPage(msg)
  }

  refreshAnswers(cards) {

  }

  showError(e) {
    console.log(e)
  }
}
