import createDOMElement from './createDOMElement';
import '../css/infoBar.scss';

export default class InfoBar {
  constructor(parentNode) {
    this.parentNode = parentNode;
  }

  renderInfoBar(name) {
    this.infoWrapper = createDOMElement({
      elementName: 'div',
      classNames: 'page-content__info',
      parent: this.parentNode,
    });
    this.leaderElement = createDOMElement({
      elementName: 'div', 
      classNames: 'leader', 
      children: this.formatName(name), 
      parent: this.infoWrapper,
    });
    this.timerElement = createDOMElement({
      elementName: 'div', 
      classNames: 'timer', 
      children: '0:20', 
      parent: this.infoWrapper,
    });
  }

  reRenderInfoBar(name) {
    this.leaderElement.innerHTML = this.formatName(name);
  }

  formatName(name){
    return `Ведущий: ${name}`;
  }
}
