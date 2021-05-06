import createDOMElement from './createDOMElement';


export default class PlayerList {
  
  constructor(parent){
    this.parent = parent;
  }

  createListPlayers(players) {
    if (this.playersElement === undefined) {
      this.playersElement = createDOMElement({
        elementName: 'div', 
        classNames: 'list__players', 
        children: 'Игроки:', 
        parent: this.parent,
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