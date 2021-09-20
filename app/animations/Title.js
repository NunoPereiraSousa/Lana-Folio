import { gsap } from "gsap";
import Animation from "../classes/Animation.js";
import SplitText from "../utils/SplitText.min";

export default class Title extends Animation {
  constructor({ element, elements }) {
    super({
      element,
      elements
    });
  }

  animateIn() {
    this.timelineIn = gsap.timeline({
      delay: 0.15
    });
    gsap.set(this.element, {
      autoAlpha: 1
    });

    this.splittedTitle = new SplitText(this.element, { type: "words, chars" });

    gsap.fromTo(
      this.splittedTitle.chars,
      {
        y: "100%",
        ease: "expo.out",
        duration: 1.185
      },
      {
        rotation: 0,
        y: 0,
        ease: "expo.out",
        duration: 1.185,
        stagger: 0.05
      }
    );
  }

  animateOut() {
    gsap.set(this.element, {
      autoAlpha: 0
    });
  }
}
