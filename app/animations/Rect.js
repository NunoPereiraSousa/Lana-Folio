import gsap from "gsap";
import Animation from "../classes/Animation.js";

export default class Rect extends Animation {
  constructor({ element, elements }) {
    super({
      element,
      elements
    });
  }

  animateIn() {
    this.timelineIn = gsap.timeline({
      delay: 0.1
    });

    gsap.set(this.element, {
      autoAlpha: 1
    });

    this.timelineIn.fromTo(
      this.element,
      {
        scaleX: 0
      },
      {
        scaleX: 1,
        duration: 1,
        transformOrigin: "0 0",
        ease: "expo.out"
      }
    );
  }

  animateOut() {
    gsap.set(this.element, {
      autoAlpha: 0
    });
  }
}
