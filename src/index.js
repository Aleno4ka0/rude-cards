import 'normalize.css';
import './css/style.scss';
import RegistrationPage from './scripts/RegistrationPage';
import Page from './scripts/Page';
import Facade from './scripts/Facade';

const gamePage = new Page();
const facade = new Facade(gamePage);
gamePage.facade = facade;
const registrationPage = new RegistrationPage(facade);
registrationPage.renderPage();
