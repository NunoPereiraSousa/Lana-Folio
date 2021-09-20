import Page from "../classes/Page";

export default class Project extends Page {
  constructor() {
    super({
      id: "project",
      element: ".project",
      elements: {
        wrapper: ".project__wrapper"
        // title: ".home__intro__title",
        // subheader: ".home__intro__subheader",
        // label: ".home__intro__label",
        // navigation: document.querySelectorAll(".navigation__link")
      }
    });
  }
}
