import createDOMElement from './createDOMElement';
import '../css/header.scss';
import SettingsColor from './SettingsColor';

export default class Menu {
  constructor(parent, page) {
    this.parent = parent;
    this.page = page;
  }

  renderMenu() {
    this.createMenu();
    this.createMenuList();

    const settingsColor = new SettingsColor(this.page, this.menuListElement);
    settingsColor.renderButton();
  }

  createMenu() {
    this.menu = {
      elementName: 'div', classNames: 'header__menu', parent: this.parent,
    };
    this.menuElement = createDOMElement(this.menu);
    for (let index = 0; index < 3; index += 1) {
      this.createLine();
    }
  }

  createMenuList() {
    this.menuList = {
      elementName: 'div', classNames: 'list', parent: this.parent,
    };
    this.menuListElement = createDOMElement(this.menuList);
  }

  createLine() {
    this.line = {
      elementName: 'div', classNames: 'line', parent: this.menuElement,
    };
    this.lineElement = createDOMElement(this.line);
    this.menuElement.addEventListener('click', this.openMenu.bind(this));
  }

  openMenu() {
    this.menuElement.classList.toggle('header__menu_open');
    this.menuListElement.classList.toggle('list_open');
  }
}
