import createDOMElement from './createDOMElement';
import '../css/cards.scss';

export default class Cards {
  constructor(parentNode, clickEvent) {
    this.event = clickEvent;
    this.wrapper = parentNode;
  }

  renderCards(msg) {
    this.createListPlayers(msg.players);
    this.createWrapperCards();
    for (let i = 0; i < msg.cards.length; i += 1) {
      let card = msg.cards[i];
      this.createCard(card.text, card.uid);
    }
  }

  createWrapperCards() {
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
    this.cardElement.addEventListener('click', this.event)
  }

  createListPlayers(players) {
    if (this.playersElement === undefined) {
      this.playersElement = createDOMElement({
        elementName: 'div', 
        classNames: 'list__players', 
        children: 'Игроки:', 
        parent: this.wrapper,
      });  
    }

    if (this.players !== undefined && this.players.length){
      this.players.forEach((pl) => this.playersElement.removeChild(pl))
    }
    this.players = [];
    for (let i = 0; i < players.length; i += 1) {
      this.createPlayer(`${players[i].score} - ${players[i].username}`);
    }
  }

  createPlayer(namePlayer) {
    this.players.push(createDOMElement({
      elementName: 'div', 
      classNames: 'player', 
      children: namePlayer, 
      parent: this.playersElement,
    }));
  }
}
