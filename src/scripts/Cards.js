import createDOMElement from './createDOMElement';
import '../css/cards.scss';

export default class Cards {
  constructor(parentNode, clickEvent) {
    this.event = clickEvent;
    this.wrapper = parentNode;
  }

  renderCards(msg) {
    this.createListPlayers();
    this.createWrapperCards();
    for (let i = 0; i < msg.cards.length; i += 1) {
      let card = msg.cards[i];
      this.createCard(card.text, card.uid);
    }
  }

  createWrapperCards() {
    this.WrapperCards = {
      elementName: 'div', classNames: 'wrapper__cards', parent: this.wrapper,
    };
    this.wrapperCardsElement = createDOMElement(this.WrapperCards);
  }

  createCard(textContent, id) {
    this.card = {
      elementName: 'div', classNames: 'card', children: textContent, parent: this.wrapperCardsElement,
    };
    this.cardElement = createDOMElement(this.card);
    this.cardElement.id = id;
    this.cardElement.addEventListener('click', this.event)
  }

  createListPlayers() {
    this.players = {
      elementName: 'div', classNames: 'list__players', children: 'Игроки:', parent: this.wrapper,
    };
    this.playersElement = createDOMElement(this.players);

    for (let i = 0; i < 15; i += 1) {
      this.createPlayer('Perdun');
    }
  }

  createPlayer(namePlayer) {
    this.player = {
      elementName: 'div', classNames: 'player', children: namePlayer, parent: this.playersElement,
    };
    this.playerElement = createDOMElement(this.player);
  }
}
