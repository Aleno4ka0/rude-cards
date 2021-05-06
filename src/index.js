import 'normalize.css';
import './css/style.scss';
import App from './scripts/App'

const app = new App();
window.addEventListener('resize', app.resize.bind(app));