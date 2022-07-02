import Api from './api';
import { getLikesNumber } from './likesApi';
import CommentApi from './commentAPI';

import { openModal } from './popup';

const charactersList = document.getElementById('charc-list');

export const renderComments = (comments) => {
  comments.then((data) => {
    const comments = data;
    let html = '';
    comments.forEach((comment) => {
      html += `
      <li>
        <p>${comment.creation_date}: ${comment.username}: ${comment.comment}</p>
      </li>
    `;
    });
    document.getElementById('comment-list').innerHTML = html;
  });
};

export const renderCharacters = async (characters) => {
  let html = '';
  const likesNumber = await getLikesNumber() || [];

  characters.forEach((character) => {
    let likeNum;
    likeNum = likesNumber.find((like) => +like.item_id === +character.id);
    likeNum = likeNum ? likeNum.likes : 0;
    if ((!character.thumbnail.path.includes('image_not_available')) && (character.description !== '')) {
      html += `
      <li class="char-item" id="${character.id}">
        <img class="char-image" src="${character.thumbnail.path}/portrait_uncanny.${character.thumbnail.extension}" alt="${character.name}">
        <p class="char-name">${character.name}</p>
        <button data-charid=${character.id} class="like">Like</button><span class="likesCounter">${likeNum}</span>
        <button data-charid=${character.id} class="comment comment-btn">Comment</button>
      </li>
    `;
    }
  });
  charactersList.innerHTML = html;

  document.querySelectorAll('.comment-btn').forEach((button) => {
    button.addEventListener('click', (e) => {
      const modal = document.querySelector('#modal');
      openModal(modal);
      const charId = e.currentTarget.dataset.charid;
      document.getElementById('charid').value = charId;
      // fetch from api char details using its id
      const getCharacter = Api.getCharacter(charId);
      getCharacter.then((data) => {
        const character = data.data.results[0];
        document.getElementById('modal-img').src = `${character.thumbnail.path}/portrait_incredible.${character.thumbnail.extension}`;
        // update the modal description
        const characterDescription = document.getElementById('modal-desc');
        characterDescription.innerHTML = character.description;

        // display the character name
        document.getElementById('modal-name').innerHTML = character.name;

        // display comments
        document.getElementById('comment-list').innerHTML = '';
        const getComments = CommentApi.getComments(charId);
        getComments.then((data) => {
          document.getElementById('comment-count').innerHTML = (data.length === undefined) ? 0 : data.length;
        });
        renderComments(getComments);
      });
    });
  }); // end of comment-btn event listener
};

export const countComments = (comments) => comments.length;

export const listCounter = (characterItems) => characterItems.length;

export const footerCopyright = (copyright) => {
  const copyrightElement = document.getElementById('copyright');
  copyrightElement.textContent = copyright;
};