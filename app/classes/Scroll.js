import gsap from "gsap";

export default class Scroll {
  constructor({ template, wrapper }) {
    this.body = document.querySelector("body");
    this.scrollable = template;
    this.mainWrapper = wrapper;

    this.scroll = {
      current: 0,
      target: 0,
      last: 0,
      limit: 0,
      ease: window.innerWidth < 1200 ? 0.08 : 0.05
    };

    this.initSmoothScroll();
    this.startScroll();
  }

  siLerp(start, end, time) {
    return start * (1 - time) + end * time;
  }

  handleScrollContainersStyles() {
    this.mainWrapper.style.width = "100%";
    this.mainWrapper.style.height = "100vh";
    this.mainWrapper.style.top = "0";
    this.mainWrapper.style.left = "0";
    this.mainWrapper.style.position = "fixed";

    this.scrollable.style.width = "100%";
    this.scrollable.style.top = "0";
    this.scrollable.style.left = "0";
    this.scrollable.style.position = "absolute";
    this.scrollable.style.willChange = "transform";
  }

  handleDocumentBodySettings() {
    if (this.scrollable) {
      const scrollableBounds = this.scrollable.getBoundingClientRect();
      const documentHeight = `${
        window.innerWidth < 1500
          ? scrollableBounds.height
          : scrollableBounds.height
      }px`;

      this.body.style.width = "100%";
      this.body.style.height = "100vh";
      this.body.style.overscrollBehavior = "none";

      this.body.style.height = documentHeight;
    }
  }

  handleWindowResize() {
    window.addEventListener(
      "resize",
      this.handleDocumentBodySettings.bind(this)
    );
  }

  siSmoothScroller() {
    this.scroll.target = window.scrollY;

    if (this.scrollable) {
      this.scroll.limit = this.scrollable.clientHeight - window.innerHeight;
    }

    this.scroll.target = gsap.utils.clamp(
      0,
      this.scroll.limit,
      this.scroll.target
    );
    this.scroll.current = this.siLerp(
      this.scroll.current,
      this.scroll.target,
      this.scroll.ease
    );

    if (this.scroll.current < 0.01) {
      this.scroll.current = 0;
    }

    if (this.scrollable) {
      this.scrollable.style.transform = `translateY(${-this.scroll.current}px)`;
    }
  }

  initSmoothScroll() {
    // console.log(1);
    this.handleScrollContainersStyles();
    this.handleDocumentBodySettings();
    this.handleWindowResize();
    this.siSmoothScroller();
  }

  startScroll() {
    this.siSmoothScroller();

    window.requestAnimationFrame(this.startScroll.bind(this));
  }
}
