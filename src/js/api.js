//  marvel api
const url = "https://gateway.marvel.com/v1/public/characters?ts=1&apikey=1b4878691fe6328b46c8b8eb4bde2f9f&hash=93ebee6185894b7ebc29d9ed94f988a9";

const characterUrl = "https://gateway.marvel.com/v1/public/characters";



// get the data

 class Api {
  static async getCharacters() {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }

  static async getCharacter(id) {
    const response = await fetch(`${characterUrl}/${id}?ts=1&apikey=1b4878691fe6328b46c8b8eb4bde2f9f&hash=93ebee6185894b7ebc29d9ed94f988a9`);
    const data = await response.json();
    return data;
  }
}

export {Api}