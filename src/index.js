import './styles.css';
import Api from './js/api';
import { renderCharacters } from './js/render';
import { closeModal } from './js/popup';

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


