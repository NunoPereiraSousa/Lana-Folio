import Page from "../classes/Page";

export default class About extends Page {
  constructor() {
    super({
      id: "about",
      element: ".about",
      elements: {
        wrapper: ".about__wrapper"
        // title: ".about__info__contacts__label",
        // subheader: ".about__intro__info__label",
        // label: ".about__info__title",
        // navigation: document.querySelectorAll(".navigation__link")
      }
    });
  }
}
