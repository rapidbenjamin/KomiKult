//  marvel api
const url = "https://gateway.marvel.com/v1/public/characters?ts=1&apikey=1b4878691fe6328b46c8b8eb4bde2f9f&hash=93ebee6185894b7ebc29d9ed94f988a9"

export default class MarvelAPI {
  static getMarvelData = async () => {
    const response = await fetch(url)
    const data = response.json();
    return data}
  }
// get the data

export { MarvelAPI };