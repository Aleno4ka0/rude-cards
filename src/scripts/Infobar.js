import createDOMElement from './createDOMElement';
import '../css/infoBar.scss';

export default class InfoBar {
  constructor(parentNode) {
    this.wrapperInfoBar = parentNode;
  }

  renderInfoBar(name) {
    this.leaderElement = createDOMElement({
      elementName: 'div', 
      classNames: 'leader', 
      children: `Ведущий: ${name}`, 
      parent: this.wrapperInfoBar,
    });
    this.timerElement = createDOMElement({
      elementName: 'div', 
      classNames: 'timer', 
      children: '0:20', 
      parent: this.wrapperInfoBar,
    });

  }
}
