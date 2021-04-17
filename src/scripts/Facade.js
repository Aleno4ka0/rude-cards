// import SockJS from 'sockjs';

export default class Facade {
  constructor() {
    const host = 'http://rude-cards.herokuapp.com/game';
    const socket = new SockJS(host);

    this.stompClient = Stomp.over(socket);
    const gameId = null;

    const onConnect = (frame) => {
      this.userID = frame.headers['user-name'];
      this.stompClient.subscribe(`/user/${this.userID}/game/${gameId}/subscriber`, (messageOutput) => {
        console.log(messageOutput.body);
        console.log('ну ты и чертила');
      });
    };

    this.stompClient.connect({}, onConnect.bind(this));
  }

  addUser(name) {
    this.stompClient.send(Facade.getAddress(), {}, JSON.stringify({ senderUid: this.userID, type: 'ADD_USER', detail: name }));
  }

  static getAddress() {
    return '/game/null';
  }
}
