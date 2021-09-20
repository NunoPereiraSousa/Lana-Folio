import Component from "../classes/Component.js";

export default class ScrollUpButton {
  constructor() {
    this.button = document.querySelector(".footer__links__button");

    console.log(this.button);

    this.addEventListener();
  }

  scrollUp() {
    window.scroll(0, 0);

    console.log("scroll up");
  }

  addEventListener() {
    this.button.addEventListener("click", this.scrollUp.bind(this));

    console.log("Added");
  }
}
