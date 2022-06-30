import './styles.css';
import { DomElement } from "./js/dom";
import { addLike, getLikesNumber } from "./js/likesApi";

// addLike('0')
// Adding Characters to page 


const test = async () => {
  try {
    await DomElement.addCharacterList()
    
  } catch (error) {
    console.log("error");
  } finally {
    const charactersLists = document.querySelectorAll('.char-item')
    const likeBtn = document.querySelectorAll('.like');
    const likeNum = document.querySelectorAll('.likesCounter')
    DomElement.listCounter(charactersLists)
    likeBtn.forEach((element, index) => {
      element.addEventListener("click", async () => {
        await addLike(+likeBtn[index].parentElement.id)
        likeNum[index].textContent = `${+likeNum[index].textContent + 1}`
      })
    })
  }
}
test()



const ProjectId = () => { fetch("https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/",
 { method: 'POST'}).then((data)=> { console.log( data.text()) })
}
ProjectId()