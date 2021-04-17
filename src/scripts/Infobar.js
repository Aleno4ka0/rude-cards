import createDOMElement from './createDOMElement';
import '../css/infoBar.scss';

export default class InfoBar {
  constructor(parentNode) {
    this.wrapperInfoBar = parentNode;
  }

  renderInfoBar() {
    this.createLeader('Leha - lepeha');
    this.createTimer();
  }

  createLeader(name) {
    this.leader = {
      elementName: 'div', classNames: 'leader', children: `Ведущий: ${name}`, parent: this.wrapperInfoBar,
    };
    this.LeaderElement = createDOMElement(this.leader);
  }

  createTimer() {
    this.timer = {
      elementName: 'div', classNames: 'timer', children: '0:20', parent: this.wrapperInfoBar,
    };
    this.timerElement = createDOMElement(this.timer);
  }
}
