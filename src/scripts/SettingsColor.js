import createDOMElement from './createDOMElement';
import '../css/header.scss';

export default class SettingsColor {
  constructor(page, parent) {
    this.page = page;
    this.menuList = parent;
  }

  renderButton() {
    console.log('anime');
    this.createButton();
  }

  createButton() {
    this.button = {
      elementName: 'div', classNames: 'button', children: 'Изменить цветовую гамму', parent: this.menuList,
    };
    this.buttonElement = createDOMElement(this.button);
  }
}
