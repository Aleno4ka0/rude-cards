// import SockJS from 'sockjs';

export default class Facade {
  constructor(onRecieve) {
    const host = 'http://rude-cards.herokuapp.com/game';
    const socket = new SockJS(host);

    this.stompClient = Stomp.over(socket);
    const gameId = null;

    const onConnect = (frame) => {
      this.userID = frame.headers['user-name'];
      this.stompClient.subscribe(`/user/${this.userID}/game/${gameId}/subscriber`, onRecieve)
    };

    this.stompClient.connect({}, onConnect.bind(this));
  }

  addUser(name) {
    const answer = { 
      senderUid: this.userID, 
      type: 'ADD_USER', 
      detail: name }
    this.stompClient.send(Facade.getAddress(), {}, JSON.stringify(answer));
  }

  sendAnswer(cardId) {
    const answer = { 
      senderUid: this.userID, 
      type: 'CHOOSE_OWN', 
      card: cardId }
    this.stompClient.send(Facade.getAddress, {}, JSON.stringify(answer))
  }

  chooseWinner(cardId) {
    const answer = { 
      senderUid: this.userID, 
      type: 'CHOSE_BEST', 
      card: cardId }
    this.stompClient.send(Facade.getAddress, {}, JSON.stringify(answer))
  }

  static getAddress() {
    return '/game/null';
  }
}
