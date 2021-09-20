import Component from "./Component.js";

export default class Animation extends Component {
  constructor({ element, elements }) {
    super({
      element,
      elements
    });

    this.createObserver();

    this.animateOut();
  }

  createObserver() {
    this.observer = new window.IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateIn();
        } else {
          this.animateOut();
        }
      });
    });

    if (this.element != null || this.element != undefined) {
      this.observer.observe(this.element);
    }
  }

  animateIn() {}

  animateOut() {}

  onResize() {}
}
