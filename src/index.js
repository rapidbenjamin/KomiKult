import './styles.css';

import { DomElement } from "./js/dom";
import { addLike, getLikesNumber } from "./js/likesApi";
import {Api} from './js/api';
import { renderCharacters, renderComments, countComments } from './js/render';
import { closeModal } from './js/popup';
import CommentApi from './js/commentAPI';

// Adding Characters to page 
const mainItemfunction = async () => {
  try {
    await DomElement.addCharacterList()
    
  } catch (error) {
    console.log("error");
  } finally {
    const charactersLists = document.querySelectorAll('.char-item')
    const likeBtn = document.querySelectorAll('.like');
    const likeNum = document.querySelectorAll('.likesCounter')
    DomElement.listCounter(charactersLists)
    likeBtn.forEach((element, index) => {
      element.addEventListener("click", async () => {
        await addLike(+likeBtn[index].parentElement.id)
        likeNum[index].textContent = `${+likeNum[index].textContent + 1}`
      })
    })
  }
}


const fetchData = Api.getCharacters();
fetchData.then(data => {
  renderCharacters(data.data.results);
}
);

// get close button
document.getElementById('close-button').addEventListener('click', () => {
  const modal = document.querySelector('#modal');
  closeModal(modal);
}
);

const addButton = document.getElementById('add-button');


mainItemfunction()


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

