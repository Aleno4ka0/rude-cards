import createDOMElement from './createDOMElement';
import PlayerList from './PlayerList'

export default class Player {
  constructor(parentNode, app) {
    this.page = parentNode;
    this.app = app;
    this.onClick = (e) => {
      this.clickedAnswer = e.target;
      this.app.facade.sendAnswer(e.target.id);
    };
    this.onClick = this.onClick.bind(this);
    this.cardIds = [];
  }

  reRenderPlayer(msg) {
    this.playerList.createListPlayers(msg.players);
    if(this.clickedAnswer){
      const newCard = msg.cards.find((currentCard) => !this.cardIds.includes(currentCard.uid));
      this.clickedAnswer.innerHTML = newCard.text;
      this.clickedAnswer.id = newCard.uid;
      this.clickedAnswer.classList.remove('card__invisible');
      this.clickedAnswer = undefined;
      this.cardIds.push(newCard.uid);
    } 
  }

  renderPlayer(msg) {
    this.createPlayerWrapper();

    this.playerList = new PlayerList(this.wrapper)
    this.playerList.createListPlayers(msg.players);

    this.createCardsWrapper();
    for (let i = 0; i < msg.cards.length; i += 1) {
      let card = msg.cards[i];
      this.createCard(card.text, card.uid);
    }
  }

  createCardsWrapper() {
    this.wrapperCardsElement = createDOMElement({
      elementName: 'div', 
      classNames: 'wrapper__cards', 
      parent: this.wrapper,
    });
  }

  createCard(textContent, id) {
    this.cardElement = createDOMElement({
      elementName: 'div', 
      classNames: 'card', 
      children: textContent, 
      parent: this.wrapperCardsElement,
    });
    this.cardElement.id = id;
    this.cardElement.addEventListener('click', this.onClick);
    this.cardIds.push(id);
  }

  
  createPlayerWrapper() {
    this.wrapper = createDOMElement({
      elementName: 'div',
      classNames: 'page-content__cards',
      parent: this.page,
    });
  }

  applyAnswer(){
    let indexToRemove = this.cardIds.indexOf(this.clickedAnswer.id);
    this.cardIds.splice(indexToRemove, 1);
    this.clickedAnswer.classList.add('card__invisible');
  }
}
