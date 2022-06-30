import { MarvelAPI } from "./api";


const charactersList = document.getElementById('charc-list');
const openModalButtons = document.querySelectorAll('[data-modal-target]');
const closeModalButtons = document.querySelectorAll('[data-close-button]');
const overlay = document.getElementById('overlay');
const popup = document.getElementById('modal');

class DomElement {
  static addCharacterList = async () => {
    let names, images, description;
    const marvelData = await MarvelAPI.getMarvelData()
    for (let i = 0; i < 20; i += 1) {
      // targeting the name and img url
      names =  marvelData.data.results[i].name;
      images =  marvelData.data.results[i].thumbnail;
      description =  marvelData.data.results[i].description;
      // creating the img url
      let imageUrl = `${images.path}/portrait_incredible.${images.extension}`;
      // creating list, header and img elements
      charactersList.innerHTML += `
      <li class="char-list">
        <img class="char-img" src="${imageUrl}">
        <h2 class="char-name">${names}</h2>
        <button class="like">Like</button>
        <button data-modal-target="#modal" class="comment">Comment</button>
      </li>
      `;
    }
   }
   static popupWindow = async () => {

    popup.innerHTML += `
    <div class="modal-header">
     <button data-close-button class="close-button">&times</button>
   </div>
   <div class="modal-body">
     <img class="modal-img" src="" alt="" />
     <p class="description"></p>
   </div>
   <div class="comment-section">
     <h2>Add a comment</h2>
   <form id="commentForm">
     <input type="text" placeholder="Your name" id="addName" />
   </form>
   <textarea
           form="commentForm"
           class="insights"
           id="insights"
           cols="30"
           rows="10"
           placeholder="Your insights"
     ></textarea>
     <button id="addComment">Add comment</button>
   </div>
   `;
        // functions open & close
        const openModal = modal => {
          if (modal === null) return;
          modal.classList.add('.active');
          overlay.classList.add('.active');
        };
    
        const closeModal = modal => {
          if (modal === null) return;
          modal.classList.remove('.active');
          overlay.classList.remove('.active');
        };
    // DOM events for close and open popup
    openModalButtons.forEach(button => {
      button.addEventListener('click', () => {
        const modal = document.querySelector('button.dataset.modalTarget');
        console.log(modal)
        openModal(modal);
       
      })
    })

   closeModalButtons.forEach(button => {
     button.addEventListener('click', () => {
    const modal = button.closest('.modal');
    closeModal(modal);
    popup.innerHTML = ""
  })
})
}
}

 export {DomElement}