import createDOMElement from './createDOMElement';
import '../css/cards.scss';

export default class Game {

    constructor(parentNode, app){
      this.app = app;
      this.answers = [];
      this.onChoose = (e) => {
        this.app.facade.chooseWinner(e.target.id);  
      }
      this.onChoose = this.onChoose.bind(this)
      this.page = parentNode;
    }

    addAnswer(name, id){
      const card = this.answers.shift();  
      card.id = id;
      card.innerHTML = name;
      card.classList.remove('card__invisible')
    }

    addEmptyAnswer() {
      const card = createDOMElement({
        elementName: 'div',
        classNames: 'card_answer',
        children: '[placeholder]',
        parent: this.answersWrapper,
      });
      card.classList.add('card__invisible')
      card.addEventListener('click', this.onChoose);
      this.answers.push(card);
    }

    reRenderGame(msg){
      this.questionWrapper.innerHTML = msg.card.text;
      this.answersWrapper.innerHTML = '';
      this.answers = []; 
      for(var i = 0; i < 10; i++){
          this.addEmptyAnswer();
      }
    }

    renderGame(msg) {
      this.gameWrapper = createDOMElement({
        elementName: 'div',
        classNames: 'page-content_wrapper-question',
        parent: this.page,
      });
      this.createQuestionWrapper('page-content__question', msg.card.text);
      this.createAnswersWrapper();
        for(var i = 0; i < 10; i++){
          this.addEmptyAnswer();
        }
    }

    createQuestionWrapper(className, qustion) {
      this.questionWrapper = createDOMElement({
        elementName: 'div',
        classNames: className,
        children: qustion,
        parent: this.gameWrapper,
      });
    }

    createAnswersWrapper() {
      this.answersWrapper = createDOMElement({
        elementName: 'div',
        classNames: 'page-content__cards_answer',
        parent: this.gameWrapper,
      });
    }
}