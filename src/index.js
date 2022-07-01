import './styles.css';
import { DomElement } from "./js/dom";
import { addLike, getLikesNumber } from "./js/likesApi";
import {Api} from './js/api';
import { renderCharacters } from './js/render';
import { closeModal } from './js/popup';

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


mainItemfunction()

