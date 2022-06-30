import './styles.css';
import { DomElement } from "./js/dom";
// import { popupWindow } from "./js/popup";


const modal = document.getElementById("modal")

const openModalButtons = document.querySelectorAll('[data-modal-target]');

// Adding Characters to page 
const test = async ( ) => {
  await DomElement.addCharacterList()
  DomElement.popupWindow()
}

test()


