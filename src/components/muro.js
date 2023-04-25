import { getAuth, signOut } from 'firebase/auth';

function muro(navigateTo) {
  const section = document.createElement('section');
  const title = document.createElement('h1');
  title.textContent = 'Muro';
  title.setAttribute = ('class', 'muro');

  /* ---------------------------- Cerrar Sesión ---------------------------------------------*/
  const buttonReturn = document.createElement('button');
  buttonReturn.textContent = 'Cerrar Sesión';
  buttonReturn.setAttribute = ('class', 'sesionfin');
  buttonReturn.addEventListener('click', () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        localStorage.clear(); // borra los datos del usuario
        history.replaceState(null, '', '/'); // limpia el historial del navegador
        navigateTo('/');
      })
      .catch((error) => {
        console.log(error);
      });
  });

  const article = document.createElement('article');
  article.classList.add('postcard', 'blue');

  const img = document.createElement('img');
  img.classList.add('postcard__img');
  img.src = 'https://picsum.photos/id/237/200/300';

  const postcardText = document.createElement('div');
  postcardText.classList.add('postcard__text');

  const postTitle = document.createElement('h2');
  postTitle.classList.add('postcard__title');

  const postTitleLink = document.createElement('a');
  postTitleLink.textContent = 'COLMILLO';

  postTitle.appendChild(postTitleLink);

  const postSubtitle = document.createElement('div');
  postSubtitle.classList.add('postcard__subtitle');

  const postAge = document.createElement('span');
  postAge.textContent = '1 año';

  postSubtitle.appendChild(postAge);

  const postBar = document.createElement('div');
  postBar.classList.add('postcard__bar');

  const postPreview = document.createElement('div');
  postPreview.classList.add('postcard__preview-txt');
  postPreview.textContent = 'Es un perrito muy sano, activo, sociable, leal, juguetón y sobre todo dispuesto a encontrar una familia amorosa y responsable que lo cuide por el resto de sus días y no le vuelvan a partir su corazón.';

  postcardText.append(postTitle, postSubtitle, postBar, postPreview);

  article.append(img, postcardText);

  const container = document.createElement('div');
  container.classList.add('container');
  container.append(title, article, buttonReturn);

  section.appendChild(container);

  return section;
}

export default muro;
