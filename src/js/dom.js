import { MarvelAPI } from "./api";
import {getLikesNumber,addLike } from "./likesApi";


const charactersList = document.getElementById('charc-list');
const openModalButtons = document.querySelectorAll('[data-modal-target]');
const closeModalButtons = document.querySelectorAll('[data-close-button]');
const overlay = document.getElementById('overlay');
const popup = document.getElementById('modal');


class DomElement {
  static addCharacterList = async () => {
    let names, images, description,id,likeNum;
    const marvelData = await MarvelAPI.getMarvelData()
    const likesNumber = await getLikesNumber() || []
    for (let i = 0; i < 20 ; i += 1) {
      // targeting the name and img url
      names =  marvelData.data.results[i].name;
      id =  marvelData.data.results[i].id;
      images =  marvelData.data.results[i].thumbnail;
      description =  marvelData.data.results[i].description;
      // creating the img url
      let imageUrl = `${images.path}/portrait_incredible.${images.extension}`;
      // creating list, header and img elements
        if (likesNumber[i] === undefined || likesNumber[i] === null ) {
           likeNum = "0"
        } else {
            likeNum = likesNumber[i].likes
        }
      
      charactersList.innerHTML += `
      <li class="char-item" id="${id}">
        <img class="char-img" src="${imageUrl}">
        <h2 class="char-name">${names}</h2>
        <button class="like">Like</button><span class="likesCounter">${likeNum}</span>
        <button data-modal-target="#modal" class="comment">Comment</button>
      </li>
      `;
    }
   }

   static listCounter = (characterItems) => {
     const itemNumber = document.querySelector('.items-number')
      itemNumber.textContent =  `${characterItems.length}` ;
    };
}

 export {DomElement}




   