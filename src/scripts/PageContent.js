import createDOMElement from './createDOMElement';
import '../css/pageContent.scss';
import Cards from './Cards';
import InfoBar from './Infobar';

export default class PageContent {
  constructor(parentNode, app) {
    this.page = parentNode;
    this.app = app;
    this.answers = [];
  }

  renderPageContent(msg) {
    this.createWrapperPageContent();
    this.createPageContent();

    this.createWrapperQuestion();
    this.createWrapper('page-content__question', msg.card.text);
    this.createWrapperAnswerCards();

    this.createWrapperInfoBar();
    const infoBar = new InfoBar(this.wrapperElementInfoBar);
    infoBar.renderInfoBar(msg.detail);

    this.createWrapperCards();
    const onClick = (e) => {
      e.target.classList.add('card__invisible');
      this.addAnswer(e.target.innerHTML, e.target.id);
      this.app.sendAnswer(e.target.id);
    };
    this.cards = new Cards(this.wrapperCardsElement, onClick.bind(this));
    this.cards.renderCards(msg);
  }

  addAnswer(name, id) {
    const card = createDOMElement({
      elementName: 'div',
      classNames: 'card_answer',
      children: name,
      parent: this.wrapperAnswerCardsElement,
    });
    card.id = id;
    card.addEventListener('click', this.event);
    this.answers.push(card);
  }

  createWrapperPageContent() {
    this.wrapperPageContentElement = createDOMElement({
      elementName: 'div',
      classNames: 'page-content__wrapper',
      parent: this.page,
    });
  }

  createPageContent() {
    this.pageContentElement = createDOMElement({
      elementName: 'div',
      classNames: 'page-content',
      parent: this.wrapperPageContentElement,
    });
  }

  createWrapperQuestion() {
    this.wrapperQuestionElement = createDOMElement({
      elementName: 'div',
      classNames: 'page-content_wrapper-question',
      parent: this.pageContentElement,
    });
  }

  createWrapper(className, qustion) {
    this.wrapperElement = createDOMElement({
      elementName: 'div',
      classNames: className,
      children: qustion,
      parent: this.wrapperQuestionElement,
    });
  }

  createWrapperInfoBar() {
    this.wrapperElementInfoBar = createDOMElement({
      elementName: 'div',
      classNames: 'page-content__info',
      parent: this.pageContentElement,
    });
  }

  createWrapperAnswerCards() {
    this.wrapperAnswerCardsElement = createDOMElement({
      elementName: 'div',
      classNames: 'page-content__cards_answer',
      parent: this.wrapperQuestionElement,
    });
  }

  createWrapperCards() {
    this.wrapperCardsElement = createDOMElement({
      elementName: 'div',
      classNames: 'page-content__cards',
      parent: this.pageContentElement,
    });
  }
}
