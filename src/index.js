import './styles.css';

import { addLike } from "./js/likesApi";
import { Api } from './js/api';
import { renderCharacters, renderComments, countComments, listCounter, footerCopyright } from './js/render';
import { closeModal } from './js/popup';
import CommentApi from './js/commentAPI';

// Adding Characters to page 
const fetchData = Api.getCharacters();
fetchData.then(async data => {
  try {
    await renderCharacters(data.data.results);
    await footerCopyright(data.attributionText)
  }
  finally {
    likeAdd()
    const items = document.querySelectorAll('.char-item')
    const itemNumber = document.querySelector('.items-number')
    itemNumber.textContent = `${listCounter(items)}`;
  }
}
)

const likeAdd = () => {
  // const charactersLists = document.querySelectorAll('.char-item')
  const likeBtn = document.querySelectorAll('.like');
  const likeNum = document.querySelectorAll('.likesCounter')
  // DomElement.listCounter(charactersLists)
  likeBtn.forEach((element, index) => {
    element.addEventListener("click", async () => {
      await addLike(+likeBtn[index].parentElement.id)
      likeNum[index].textContent = `${+likeNum[index].textContent + 1}`
    })
  })
}

// get close button
document.getElementById('close-button').addEventListener('click', () => {
  const modal = document.querySelector('#modal');
  closeModal(modal);
}
);

const addButton = document.getElementById('add-button');



addButton.addEventListener('click', async (e) => {
  e.preventDefault();
  // get value from input
  const name = document.getElementById('addName').value;
  const description = document.getElementById('insights').value;
  const charid = document.getElementById('charid').value;

  // post to the api
  await CommentApi.postComment(charid, name, description);

  // clear input
  const form = document.getElementById('commentForm');
  form.reset();

  const getComments = CommentApi.getComments(charid);
  getComments.then((data) => {
    document.getElementById('comment-count').innerHTML = countComments(data);
  });
  renderComments(getComments);
});

overlay.addEventListener('click', () => {
  const modals = document.querySelectorAll('.modal.active');
  modals.forEach(modal => {
    closeModal(modal);
  })
});

// Page load animation effect
const hero = document.querySelector('.hero');
const slider = document.querySelector('.slider');
const logo = document.querySelector('#logo');
const nav = document.querySelector('#navItems');
const headline = document.querySelector('.headline');
const spidey = document.querySelector('.spidey-container');
const list = document.querySelector('.charc-list');

const tl = new TimelineMax();

tl.fromTo(hero, 1, { height: '0%' }, { height: '80%', ease: Power2.easeInOut })
  .fromTo(hero, 1.2, { width: '100%' }, { width: '80%', ease: Power2.easeInOut })
  .fromTo(slider, 1.2, { x: '-100%' }, { x: '0%', ease: Power2.easeInOut }, "-=1.2")
  .fromTo(logo, 0.5, { opacity: 0, x: -30 }, { opacity: 1, x: 0 }, "-=0.5")
  .fromTo(nav, 0.5, { opacity: 0, x: 30 }, { opacity: 1, x: 0 }, "-=0.5")
  .fromTo(headline, 0.5, { opacity: 0, x: 100 }, { opacity: 1, x: 0 }, "-=0.5")
  .set(spidey, 0.5, { zIndex: -1 }, { opacity: 0, x: -200 }, { opacity: 1, x: 0 }, "-=0.5");
