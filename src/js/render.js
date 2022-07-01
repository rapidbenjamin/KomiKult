const charactersList = document.getElementById('charc-list');
import {Api} from "./api";
import { openModal } from "./popup";

const renderCharacters = (characters) => {
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
      //fetch from api char details using its id
      const getCharacter = Api.getCharacter(charId);
      getCharacter.then(data => {
        const character = data.data.results[0];
        console.log(character);
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
      })

      //result populate the modal using innerHTML


    });
  });
}

export { renderCharacters };