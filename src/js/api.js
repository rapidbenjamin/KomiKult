const charactersList = document.getElementById('charc-list');

//  marvel api
const url = "https://gateway.marvel.com/v1/public/characters?ts=1&apikey=1b4878691fe6328b46c8b8eb4bde2f9f&hash=93ebee6185894b7ebc29d9ed94f988a9"

// get the data
const getData = () => {
  fetch(url).then(async (res) => {
    let names,images;
    const data = await res.json();
    for (let i = 0; i < 20; i += 1) {
      // targeting the name and img url
      names = data.data.results[i].name;
      images = data.data.results[i].thumbnail
      // creating the img url
      let imageUrl = `${images.path}/portrait_incredible.${images.extension}`;
      // creating list, header and img elements
      const newList = document.createElement('li');
      const newCharacter = document.createElement('h2');
      const newImage = document.createElement('img')
      const likeBtn = document.createElement('button')
      const commentBtn = document.createElement('button')
      // set data 
      likeBtn.className = "like"
      likeBtn.textContent = "Like";
      commentBtn.className = "comment"
      commentBtn.textContent = "Comment";
      newImage.setAttribute("src",`${imageUrl}`)
      newCharacter.textContent = `${names}`;
      // append the element in the page 
      newList.appendChild(newImage);
      newList.appendChild(newCharacter);
      newList.appendChild(likeBtn);
      newList.appendChild(commentBtn);
      charactersList.appendChild(newList);
    }
  })
};

export {getData} ;