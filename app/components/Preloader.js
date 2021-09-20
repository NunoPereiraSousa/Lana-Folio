import gsap from "gsap";
import imagesLoaded from "imagesloaded";
import FontFaceObserver from "fontfaceobserver";
import { each } from "lodash";
import Component from "../classes/Component.js";
import SplitText from "../utils/SplitText.min";
import { calculate, split } from "../utils/text.js";

export default class Preloader extends Component {
  constructor() {
    super({
      element: ".preloader",
      elements: {
        bar: ".preloader__loader__line",
        counter: ".preloader__loader__counter__text",
        label: ".preloader__loader__label",
        title: ".preloader__title",
        allSiteImages: document.querySelectorAll("img")
      }
    });

    // split({
    //   element: this.elements.title,
    //   expression: "<br>"
    // });

    // split({
    //   element: this.elements.title,
    //   expression: "<br>"
    // });

    // split({
    //   element: this.elements.label,
    //   expression: "<br>"
    // });

    // split({
    //   element: this.elements.label,
    //   expression: "<br>"
    // });

    this.elements.titleSpans = new SplitText(this.elements.title, {
      type: "lines",
      linesClass: "b"
    });
    new SplitText(this.elements.title, { type: "lines", linesClass: "a" });

    this.elements.labelSpans = new SplitText(this.elements.label, {
      type: "lines",
      linesClass: "b"
    });
    new SplitText(this.elements.label, { type: "lines", linesClass: "a" });

    this.length = 0;

    this.loadFonts();

    this.preloadImages();

    // this.loadCounter();
  }

  /**
   * Load the website fonts
   */
  loadFonts() {
    this.montreal = new FontFaceObserver("Montreal");
    this.neue = new FontFaceObserver("Neue Montreal");

    Promise.all([this.montreal.load(), this.neue.load()]).then(font => {
      console.log("Fonts loaded! Ready to go 🚀");
      // this.afterFontsAreLoaded();
    });
  }

  /**
   * Preload all the website images
   */
  preloadImages() {
    this.imagesLoad = imagesLoaded(this.elements.allSiteImages);
    this.imageCounter = 0;

    this.imagesLoad.on("progress", () => {
      this.imageCounter++;
      this.loadImageBar(this.imageCounter);
      this.loadCounterProgress(this.imageCounter);
    });

    // when all the images are loaded
    this.imagesLoad.on("done", () => {
      console.log("Images loaded! Ready to go 🚀");
    });
  }

  loadImageBar(counter) {
    this.counter = counter;
    this.barCompleted = false;

    const percent = this.counter / this.elements.allSiteImages.length;

    gsap.to(this.elements.bar, {
      delay: 1,
      width: `${Math.round(percent * 100)}%`,
      ease: "expo.out",
      duration: 1,
      onComplete: () => {
        this.barCompleted = true;
      }
    });
  }

  loadCounterProgress(counter) {
    this.counter2 = counter;
    this.counterCompleted = false;

    const percent = this.counter2 / this.elements.allSiteImages.length;

    gsap.to(this.elements.counter, {
      delay: 1,
      innerText: `${Math.round(percent * 100)} / 100`,
      snap: {
        innerText: 1
      },
      ease: "expo.out",
      duration: 1,
      onComplete: () => {
        this.counterCompleted = true;
        this.preloaderOut();
      }
    });
  }

  preloaderOut() {
    this.animateOut = gsap.timeline({
      delay: 0.5
    });

    this.animateOut
      .to(
        [
          this.elements.titleSpans.lines,
          this.elements.counter,
          this.elements.labelSpans.lines
        ],
        {
          y: "100%",
          duration: 2,
          ease: "expo.out"
        }
      )
      .to(
        this.elements.bar,
        {
          scaleX: 0,
          opacity: 0,
          transformOrigin: "100% 0",
          duration: 0.6
        },
        "-=2"
      )
      .to(
        this.element,
        {
          scaleY: 0,
          transformOrigin: "0 0",
          duration: 0.9,
          ease: "expo.in",
          onComplete: () => {
            window.scroll(0, 0);
          }
        },
        "-=1"
      );

    this.animateOut.call(_ => {
      this.emit("completed");
    });
  }

  destroy() {
    this.element.parentNode.removeChild(this.element);
  }
}
