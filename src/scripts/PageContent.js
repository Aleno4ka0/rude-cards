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
    this.infoBar = new InfoBar(this.wrapperElementInfoBar);
    this.infoBar.renderInfoBar(msg.detail);

    this.createWrapperCards();
    const onClick = (e) => {
      this.clickedAnswer = e.target;
      this.app.facade.sendAnswer(e.target.id);
    };
    this.onChoose = (e) => {
      this.app.facade.chooseWinner(e.target.id);  
    }
    this.cards = new Cards(this.wrapperCardsElement, onClick.bind(this));
    this.cards.renderCards(msg);
  }

  reRenderPageContent(msg) {
    this.wrapperElement.innerHTML = msg.card.text;
    this.wrapperAnswerCardsElement.innerHTML = '';
    this.answers = []; 
    this.infoBar.reRenderInfoBar(msg.detail); 
    this.cards.createListPlayers(msg.players);
    if(this.clickedAnswer){
      const newCard = msg.cards.pop();
      this.clickedAnswer.innerHTML = newCard.text;
      this.clickedAnswer.id = newCard.uid;
      this.clickedAnswer.classList.remove('card__invisible');
      this.clickedAnswer = undefined;
    } 
  }

  applyAnswer(){
    this.clickedAnswer.classList.add('card__invisible');
  }

  addAnswer(name, id) {
    const card = createDOMElement({
      elementName: 'div',
      classNames: 'card_answer',
      children: name,
      parent: this.wrapperAnswerCardsElement,
    });
    card.id = id;
    card.addEventListener('click', this.onChoose.bind(this));
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
