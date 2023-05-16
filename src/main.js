/* eslint-disable import/no-duplicates */
/* eslint-disable import/order */
import home from './components/home.js';
import error from './components/error.js';
import muro from './components/muro.js';
import registro from './components/registro.js';
import './lib/firebaseConfig.js';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './lib/firebaseConfig.js';
// Root
const root = document.getElementById('root');
// Rutas
const routes = [
  { path: '/', component: home },
  { path: '/registro', component: registro },
  { path: '/error', component: error },
  { path: '/muro', component: muro },
];

/* const defaultRoute = '/'; */

function navigateTo(hash) {
  const route = routes.find((routeFind) => routeFind.path === hash);
  if (route && route.component) {
    window.history.pushState(
      {},
      route.path,
      window.location.origin + route.path,
    );
    if (root.firstChild) {
      root.removeChild(root.firstChild);
    }
    root.appendChild(route.component(navigateTo));
  } else {
    navigateTo('/error');
  }  
}

window.onpopstate = () => {
  navigateTo(window.location.pathname);
};

onAuthStateChanged(auth, (user) => {
  if (user) {
    navigateTo('/muro');
    /* const uid = user.uid; */
  } else {
    navigateTo('/');
  }
});

