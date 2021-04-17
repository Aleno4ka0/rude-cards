import 'normalize.css';
import './css/style.scss';
import RegistrationPage from './scripts/RegistrationPage';
// import Page from './scripts/Page';
import Facade from './scripts/Facade';

// const page = new Page();
// page.renderPage();

const facade = new Facade();
const registrationPage = new RegistrationPage(facade);
registrationPage.renderPage();
