import './styles.css';
import Api from './js/api';
import { renderCharacters, renderComments } from './js/render';
import { closeModal } from './js/popup';
import CommentApi from './js/commentAPI';

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

addButton.addEventListener('click', (e) => {
  e.preventDefault();
  // get value from input
  const name = document.getElementById('addName').value;
  const description = document.getElementById('insights').value;
  const charid = document.getElementById('charid').value;

  //post to the api
  CommentApi.postComment(charid, name, description);

  // clear input
  const form = document.getElementById('commentForm');
  form.reset();

  const getComments = CommentApi.getComments(charid);
  getComments.then(data => {
    document.getElementById('comment-count').innerHTML = data.length;
  });
  renderComments(getComments);
});