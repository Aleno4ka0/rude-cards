// import SockJS from 'sockjs';

export default class Facade {
  constructor(gamePage) {
    this.gamePage = gamePage
    const host = 'http://rude-cards.herokuapp.com/game';
    const socket = new SockJS(host);

    this.stompClient = Stomp.over(socket);
    const gameId = null;

    const onRecieve =  (messageOutput) => {
      const msg = JSON.parse(messageOutput.body)
      switch (msg.type) {
        case "PLAYER_LIST_UPDATED":
          this.gamePage.onGameConnect(msg);
          break;
        case "NEW_ANSWER":
          this.gamePage.refreshAnswers(msg.Cards);
          break;
        case "EXCEPTION":
          this.gamePage.showError(msg.detail);
          break;
      }
    };

    const onConnect = (frame) => {
      this.userID = frame.headers['user-name'];
      this.stompClient.subscribe(`/user/${this.userID}/game/${gameId}/subscriber`, onRecieve.bind(this))
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
      type: 'NEW_ANSWER', 
      card: cardId }
    this.stompClient.send(Facade.getAddress, {}, JSON.stringify(answer))
  }

  static getAddress() {
    return '/game/null';
  }
}
