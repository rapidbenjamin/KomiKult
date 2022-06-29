import './styles.css';



const charactersList = document.getElementById('charc-list');

//  marvel api
const url = "https://gateway.marvel.com/v1/public/characters?ts=1&apikey=1b4878691fe6328b46c8b8eb4bde2f9f&hash=93ebee6185894b7ebc29d9ed94f988a9"

// get the data
const getData = () => {
  fetch(url).then(async (res) => {
    let resultArray,images;
    const data = await res.json();
    for (let i = 0; i < 20; i += 1) {
      // targeting the name and img url
      resultArray = data.data.results[i].name;
      images = data.data.results[i].thumbnail
      // creating the img url
      let imageUrl = `${images.path}/portrait_incredible.${images.extension}`;
      // creating list, header and img elements
      const newList = document.createElement('li');
      const newCharacter = document.createElement('h2');
      const newImage = document.createElement('img')
      // set data 
      newImage.setAttribute("src",`${imageUrl}`)
      newCharacter.textContent = `${resultArray}`;
      // append the element in the page 
      newList.appendChild(newImage)
      newList.appendChild(newCharacter)
      charactersList.appendChild(newList);
      // charactersList.appendChild(newCharacter);
    }
  })
};

// calling the function to create the page 
getData()