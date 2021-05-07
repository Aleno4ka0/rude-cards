// import SockJS from 'sockjs';

export default class ClientFacade {
  constructor(onCommonRecieve, onAppConnect) {
    const host = 'http://rude-cards.herokuapp.com/game';
    const socket = new SockJS(host);

    this.stompClient = Stomp.over(socket);

    const onConnect = (frame) => {
      this.userID = frame.headers['user-name'];
      this.stompClient.subscribe(`/user/${this.userID}/common`, onCommonRecieve);
      onAppConnect();
    };

    this.stompClient.connect({}, onConnect.bind(this));
  }

  addUser(name) {
    const answer = { 
      senderUid: this.userID, 
      type: 'ADD_USER', 
      detail: name }
    this.stompClient.send(this.getAddress(), {}, JSON.stringify(answer));
  }

  sendAnswer(cardId) {
    const answer = { 
      senderUid: this.userID, 
      type: 'CHOOSE_OWN', 
      cardUid: cardId }
    this.stompClient.send(this.getAddress(), {}, JSON.stringify(answer))
  }

  chooseWinner(cardId) {
    const answer = { 
      senderUid: this.userID, 
      type: 'CHOSE_BEST', 
      cardUid: cardId }
    this.stompClient.send(this.getAddress(), {}, JSON.stringify(answer))
  }

  startGame() {
    const answer = { 
      senderUid: this.userID, 
      type: 'START'}
    this.stompClient.send(this.getAddress(), {}, JSON.stringify(answer))
  }

  createGame() {
    this.stompClient.send("/common/createGame", {}, '');
  }

  getAddress() {
    return '/game/' + this.gameId;
  }
  
  setGameId(id, onRecieve){
    this.gameId = id;
    this.stompClient.subscribe(`/user/${this.userID}/game/${this.gameId}/subscriber`, onRecieve);
  }
}
