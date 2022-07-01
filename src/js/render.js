
const charactersList = document.getElementById('charc-list');
import {Api} from "./api";

import CommentApi from "./commentAPI";

import { openModal } from "./popup";

const charactersList = document.getElementById('charc-list');

export const renderCharacters = (characters) => {
  let html = '';
  characters.forEach(character => {
    if (!character.thumbnail.path.includes('image_not_available')) {
      html += `
      <li>
        <img style="width:100%" src="${character.thumbnail.path}/portrait_uncanny.${character.thumbnail.extension}" alt="${character.name}">
        <p>${character.name}</p>
        <button class="like">Like</button>
        <button data-charid=${character.id} class="comment comment-btn">Comment</button>
      </li>
    `;
    }
  });
  charactersList.innerHTML = html;

  document.querySelectorAll('.comment-btn').forEach(button => {
    button.addEventListener('click', (e) => {
      const modal = document.querySelector('#modal');
      openModal(modal);
      const charId = e.currentTarget.dataset.charid;
      document.getElementById('charid').value = charId;
      //fetch from api char details using its id
      const getCharacter = Api.getCharacter(charId);
      getCharacter.then(data => {
        const character = data.data.results[0];
        document.getElementById('modal-img').src = `${character.thumbnail.path}/portrait_incredible.${character.thumbnail.extension}`;
        // update the modal description
        const characterDescription = document.getElementById('modal-desc');
        if (character.description === '') {
          document.getElementById('modal-desc').innerHTML = 'No description available for this character.';
        }
        else {
          characterDescription.innerHTML = character.description;
        }

        //display the character name
        document.getElementById('modal-name').innerHTML = character.name;

        // display comments
        document.getElementById('comment-list').innerHTML = '';
        const getComments = CommentApi.getComments(charId);
        getComments.then(data => {
          document.getElementById('comment-count').innerHTML = (data.length === undefined) ? 0 : data.length;
        });
        renderComments(getComments);
      });
    });
  }); // end of comment-btn event listener

}

export const renderComments = (comments) => {
  comments.then(data => {
    console.log(data);
    const comments = data;
    let html = '';
    comments.forEach(comment => {
      html += `
      <li>
        <p>${comment.creation_date}: ${comment.username}: ${comment.comment}</p>
      </li>
    `;
    });
    document.getElementById('comment-list').innerHTML = html;
  });
}

export const countComments = comments => {
  return comments.length;
}