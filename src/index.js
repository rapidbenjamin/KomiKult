import './styles.css';

import { addLike } from "./js/likesApi";
import {Api} from './js/api';
import { renderCharacters, renderComments, countComments } from './js/render';
import { closeModal } from './js/popup';
import CommentApi from './js/commentAPI';

// Adding Characters to page 
// const mainItemfunction = async () => {
//   try {
//     await DomElement.addCharacterList()
    
//   } catch (error) {
//     console.log("error");
//   } finally {

//   }
// }


// const fetchData = Api.getCharacters();
// fetchData.then(async data => {
//   try {
//    await renderCharacters(data.data.results);
//   } 
//   finally{
//     likeAdd()
//   }
// }
// )
const fetchData = Api.getCharacters();
fetchData.then(data => {
  renderCharacters(data.data.results);
}
)

const likeAdd = () => {
  // const charactersLists = document.querySelectorAll('.char-item')
  const likeBtn = document.querySelectorAll('.like');
  console.log(likeBtn)
  const likeNum = document.querySelectorAll('.likesCounter')
  console.log(likeNum)
  // DomElement.listCounter(charactersLists)
  likeBtn.forEach((element, index) => {
    console.log(index)
    element.addEventListener("click", async () => {
      console.log('clicked')
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

