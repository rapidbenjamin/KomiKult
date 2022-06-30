const charactersList = document.getElementById('charc-list');
const popup = document.getElementById('modal');

//  marvel api
const url = "https://gateway.marvel.com/v1/public/characters?ts=1&apikey=1b4878691fe6328b46c8b8eb4bde2f9f&hash=93ebee6185894b7ebc29d9ed94f988a9"

// get the data
const getData = () => {
  fetch(url).then(async (res) => {
    let names, images, description;
    const data = await res.json();
    for (let i = 0; i < 20; i += 1) {
      // targeting the name and img url
      names = data.data.results[i].name;
      images = data.data.results[i].thumbnail;
      description = data.data.results[i].description;
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
  })
};

export { getData };