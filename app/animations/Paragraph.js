import gsap from "gsap";
import Animation from "../classes/Animation.js";
import SplitText from "../utils/SplitText.min";

export default class Paragraph extends Animation {
  constructor({ element, elements }) {
    super({
      element,
      elements
    });
  }

  animateIn() {
    this.timelineIn = gsap.timeline({
      delay: 0.25
    });

    this.timelineIn.set(this.element, {
      autoAlpha: 1
    });

    this.splittedParagraph = new SplitText(this.element, {
      type: "lines",
      linesClass: "b"
    });
    new SplitText(this.element, { type: "lines", linesClass: "a" });

    this.timelineIn.fromTo(
      this.splittedParagraph.lines,
      {
        yPercent: 100
      },
      {
        yPercent: 0,
        ease: "expo.out",
        duration: 1.25,
        stagger: 0.1
      }
    );
  }

  animateOut() {
    gsap.set(this.element, {
      autoAlpha: 0
    });
  }
}
