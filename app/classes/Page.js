import gsap from "gsap";
import each from "lodash/each";
import Paragraph from "../animations/Paragraph.js";
import Title from "../animations/Title.js";
import Line from "../animations/Line.js";
import Rect from "../animations/Rect.js";
import SplitText from "../utils/SplitText.min";
import map from "lodash/map";

export default class Page {
  constructor({ id, element, elements }) {
    this.id = id;
    this.selector = element;
    this.selectorChildren = {
      ...elements,
      animationsTitles: "[data-animation='title']",
      animationsParagraphs: "[data-animation='paragraph']",
      animationsLines: "[data-animation='line']",
      animationsRects: "[data-animation='rect']"
    };

    this.a = new SplitText(this.selectorChildren.title, {
      type: "words, chars"
    });

    this.b = new SplitText(this.selectorChildren.label, {
      type: "lines",
      linesClass: "b"
    });
    new SplitText(this.selectorChildren.label, {
      type: "lines",
      linesClass: "a"
    });

    this.c = new SplitText(this.selectorChildren.subheader, {
      type: "words, chars"
    });

    this.navigation = new SplitText(this.selectorChildren.navigation, {
      type: "lines",
      linesClass: "b"
    });
    new SplitText(this.selectorChildren.navigation, {
      type: "lines",
      linesClass: "a"
    });

    this.splittedElements = [
      this.navigation.lines,
      this.a.chars,
      this.b.lines,
      this.c.chars
    ];
  }

  create() {
    this.elements = {};

    each(this.selectorChildren, (entry, key) => {
      if (
        entry instanceof window.HTMLElement ||
        entry instanceof window.NodeList ||
        Array.isArray(entry)
      ) {
        this.elements[key] = entry;
      } else {
        this.elements[key] = document.querySelectorAll(entry);

        if (this.elements[key].length === 0) {
          this.elements[key] = null;
        } else if (this.elements[key].length === 1) {
          this.elements[key] = document.querySelector(entry);
        }
      }
    });

    this.createAnimations();
  }

  createAnimations() {
    this.animations = [];

    // Titles.
    this.animationsTitles = map(this.elements.animationsTitles, element => {
      return new Title({
        element
      });
    });

    this.animations.push(...this.animationsTitles);

    // Paragraphs.
    this.animationsParagraphs = map(
      this.elements.animationsParagraphs,
      element => {
        return new Paragraph({
          element
        });
      }
    );

    this.animations.push(...this.animationsParagraphs);

    // Lines.
    this.animationsLines = map(this.elements.animationsLines, element => {
      return new Line({
        element
      });
    });

    this.animations.push(...this.animationsLines);

    // Dark Rects
    this.animationsRects = map(this.elements.animationsRects, element => {
      return new Rect({
        element
      });
    });

    this.animations.push(...this.animationsRects);
  }

  onResize() {
    each(this.animations, animation => animation.onResize());
  }

  positionAnimations() {
    gsap.to(this.splittedElements, {
      delay: 0.3,
      y: "100%",
      ease: "expo.out",
      duration: 1.185
    });
  }

  animateIn() {
    this.animate = gsap.timeline();

    this.animate.fromTo(
      this.splittedElements,
      {
        y: "100%",
        ease: "expo.out"
      },
      {
        y: 0,
        ease: "expo.out",
        duration: 1.5,
        stagger: 0.025
      }
    );
  }
}
