import Page from "../classes/Page";

export default class Home extends Page {
  constructor() {
    super({
      id: "home",
      element: ".home",
      elements: {
        wrapper: ".home__wrapper",
        title: ".home__intro__title",
        subheader: ".home__intro__subheader",
        label: ".home__intro__label",
        navigation: document.querySelectorAll(".navigation__link")
      }
    });
  }
}
