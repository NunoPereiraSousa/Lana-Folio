import About from "./pages/about.js";
import Home from "./pages/home.js";
import Project from "./pages/project.js";
import Scroll from "./classes/Scroll.js";
import barba from "@barba/core";
import gsap from "gsap";
import Canvas from "./classes/Canvas.js";
import Preloader from "./components/Preloader.js";
import Theme from "./classes/Theme.js";

class App {
  constructor() {
    this.pages = {};
    this.createContent();

    this.createPreloader();
    this.createPages();

    this.customScroll();
    // this.update();
    this.pageTransition();
  }

  customScroll() {
    this.smoothScroll = new Scroll({
      template: document.querySelector(".scrollable"),
      wrapper: document.getElementById("main-wrapper")
    });
  }

  createPreloader() {
    this.preloader = new Preloader();

    this.preloader.once("completed", this.onPreloaded.bind(this));
  }

  onPreloaded() {
    this.preloader.destroy();

    this.page.animateIn();
  }

  /**
   * Set up the page content and template
   */
  createContent() {
    this.content = document.querySelector(".content");

    this.template = this.content.getAttribute("data-template");
  }

  /**
   * Creates the pages. Instantiates its Classes
   */
  createPages() {
    this.pages = {
      about: new About(),
      home: new Home(),
      project: new Project()
    };

    this.page = this.pages[this.template];

    this.page.create();

    this.page.positionAnimations();
    // this.page.animateIn();

    this.onResize();
    this.theme = new Theme();

    if (document.querySelector(".webgl")) {
      this.canvas = new Canvas();
    }
  }

  /**
   * Application loop.
   */
  update() {
    // if (this.page && this.page.update) {
    //   this.page.update();
    // }

    this.frame = window.requestAnimationFrame(this.update.bind(this));
  }

  onResize() {
    if (this.page && this.page.onResize) {
      this.page.onResize();
    }
  }

  pageTransition() {
    let that = this;
    this.webgl = document.querySelector(".webgl");

    barba.init({
      transitions: [
        {
          name: "home-about",
          from: {
            namespace: ["home"]
          },
          to: {
            namespace: ["about"]
          },
          leave(data) {
            console.log("leave");
            return gsap.to(data.current.container, {
              duration: 0.75,
              opacity: 0,
              onComplete: () => {
                window.scroll(0, 0);
              }
            });
          },
          once(data) {},
          enter(data) {
            that.smoothScroll = new Scroll({
              template: [...data.next.container.children][0],
              wrapper: data.next.container
            });

            let x = [...data.next.container.children][0].children;

            that.content = [...x][0];

            that.template = that.content.getAttribute("data-template");

            that.page = that.pages[that.template];

            that.page.create();
            that.onResize();

            window.scroll(0, 0);

            return gsap.from(data.next.container, {
              duration: 0.75,
              opacity: 0
            });
          }
        },
        {
          name: "about-home",
          from: {
            namespace: ["about"]
          },
          to: {
            namespace: ["home"]
          },
          leave(data) {
            return gsap.to(data.current.container, {
              duration: 0.75,
              opacity: 0,
              onComplete: () => {
                window.scroll(0, 0);
              }
            });
          },
          enter(data) {
            that.smoothScroll = new Scroll({
              template: [...data.next.container.children][1],
              wrapper: data.next.container
            });

            let x = [...data.next.container.children][1].children;

            that.content = [...x][0];

            that.template = that.content.getAttribute("data-template");

            that.page = that.pages[that.template];

            that.page.create();
            that.onResize();

            window.scroll(0, 0);

            that.canvas = new Canvas();

            return gsap.from(data.next.container, {
              duration: 0.75,
              opacity: 0
            });
          }
        },
        {
          name: "home-project",
          from: {
            namespace: ["home"]
          },
          to: {
            namespace: ["project"]
          },
          leave(data) {
            return gsap.to(data.current.container, {
              duration: 0.75,
              opacity: 0,
              onComplete: () => {
                window.scroll(0, 0);
              }
            });
          },
          once(data) {},
          enter(data) {
            that.smoothScroll = new Scroll({
              template: [...data.next.container.children][0],
              wrapper: data.next.container
            });

            let x = [...data.next.container.children][0].children;

            that.content = [...x][0];

            that.template = that.content.getAttribute("data-template");

            that.page = that.pages[that.template];

            that.page.create();
            that.onResize();

            window.scroll(0, 0);

            return gsap.from(data.next.container, {
              duration: 0.75,
              opacity: 0
            });
          }
        },
        {
          name: "project-home",
          from: {
            namespace: ["project"]
          },
          to: {
            namespace: ["home"]
          },
          leave(data) {
            return gsap.timeline().to(data.current.container, {
              duration: 0.75,
              opacity: 0,
              onComplete: () => {
                window.scroll(0, 0);
              }
            });
          },
          enter(data) {
            that.smoothScroll = new Scroll({
              template: [...data.next.container.children][1],
              wrapper: data.next.container
            });

            let x = [...data.next.container.children][1].children;

            that.content = [...x][0];

            that.template = that.content.getAttribute("data-template");

            that.page = that.pages[that.template];

            that.page.create();
            that.onResize();

            window.scroll(0, 0);

            that.canvas = new Canvas();

            return gsap.from(data.next.container, {
              duration: 0.75,
              opacity: 0
            });
          }
        },
        {
          name: "project-about",
          from: {
            namespace: ["project"]
          },
          to: {
            namespace: ["about"]
          },
          leave(data) {
            that.page.animationsTitles = [];
            that.page.animationsParagraphs = [];
            that.page.animationsLines = [];
            that.page.animations = [];

            return gsap.to(data.current.container, {
              duration: 0.75,
              opacity: 0,
              onComplete: () => {
                window.scroll(0, 0);
              }
            });
          },
          once(data) {},
          enter(data) {
            that.smoothScroll = new Scroll({
              template: [...data.next.container.children][0],
              wrapper: data.next.container
            });

            let x = [...data.next.container.children][0].children;

            that.content = [...x][0];

            that.template = that.content.getAttribute("data-template");

            that.page = that.pages[that.template];

            that.page.animations = [];

            that.page.create();
            that.onResize();

            return gsap.from(data.next.container, {
              duration: 0.75,
              opacity: 0
            });
          }
        },
        {
          name: "about-project",
          from: {
            namespace: ["about"]
          },
          to: {
            namespace: ["project"]
          },
          leave(data) {
            that.page.animationsTitles = [];
            that.page.animationsParagraphs = [];
            that.page.animationsLines = [];
            that.page.animations = [];

            return gsap.to(data.current.container, {
              duration: 0.75,
              opacity: 0,
              onComplete: () => {
                window.scroll(0, 0);
              }
            });
          },
          once(data) {},
          enter(data) {
            that.smoothScroll = new Scroll({
              template: [...data.next.container.children][0],
              wrapper: data.next.container
            });

            let x = [...data.next.container.children][0].children;

            that.content = [...x][0];

            that.template = that.content.getAttribute("data-template");

            that.page = that.pages[that.template];

            that.page.animations = [];

            that.page.create();
            that.onResize();

            return gsap.from(data.next.container, {
              duration: 0.75,
              opacity: 0
            });
          }
        }
      ]
    });
    //   }
    // }

    // barba.init({
    //   transitions: [
    //     {
    //       name: "home-about",
    //       from: {
    //         namespace: ["home"]
    //       },
    //       to: {
    //         namespace: ["about"]
    //       },
    //       leave(data) {
    //         return gsap.to(data.current.container, {
    //           duration: 0.75,
    //           opacity: 0,
    //           onComplete: () => {
    //             window.scroll(0, 0);
    //           }
    //         });
    //       },
    //       once(data) {},
    //       enter(data) {
    //         that.smoothScroll = new Scroll({
    //           template: [...data.next.container.children][0],
    //           wrapper: data.next.container
    //         });

    //         let x = [...data.next.container.children][0].children;

    //         that.content = [...x][0];

    //         that.template = that.content.getAttribute("data-template");

    //         that.page = that.pages[that.template];

    //         that.page.create();
    //         that.onResize();

    //         return gsap.from(data.next.container, {
    //           duration: 0.75,
    //           opacity: 0
    //         });
    //       }
    //     },
    //     {
    //       name: "about-home",
    //       from: {
    //         namespace: ["about"]
    //       },
    //       to: {
    //         namespace: ["home"]
    //       },
    //       leave(data) {
    //         return gsap.to(data.current.container, {
    //           duration: 0.75,
    //           opacity: 0,
    //           onComplete: () => {
    //             window.scroll(0, 0);
    //           }
    //         });
    //       },
    //       once(data) {},
    //       enter(data) {
    //         that.smoothScroll = new Scroll({
    //           template: [...data.next.container.children][1],
    //           wrapper: data.next.container
    //         });

    //         let x = [...data.next.container.children][1].children;

    //         that.content = [...x][0];

    //         that.template = that.content.getAttribute("data-template");

    //         that.page = that.pages[that.template];

    //         that.page.create();
    //         that.onResize();

    //         window.scroll(0, 0);

    //         that.canvas = new Canvas();

    //         return gsap.from(data.next.container, {
    //           duration: 0.75,
    //           opacity: 0
    //         });
    //       }
    //     },
    //     {
    //       name: "home-project",
    //       from: {
    //         namespace: ["home"]
    //       },
    //       to: {
    //         namespace: ["project"]
    //       },
    //       leave(data) {
    //         return gsap.to(data.current.container, {
    //           duration: 0.75,
    //           opacity: 0,
    //           onComplete: () => {
    //             window.scroll(0, 0);
    //           }
    //         });
    //       },
    //       once(data) {},
    //       enter(data) {
    //         that.smoothScroll = new Scroll({
    //           template: [...data.next.container.children][0],
    //           wrapper: data.next.container
    //         });

    //         let x = [...data.next.container.children][0].children;

    //         that.content = [...x][0];

    //         that.template = that.content.getAttribute("data-template");

    //         that.page = that.pages[that.template];

    //         console.log(that.page);

    //         that.page.create();

    //         that.onResize();

    //         window.scroll(0, 0);

    //         return gsap.from(data.next.container, {
    //           duration: 0.75,
    //           opacity: 0
    //         });
    //       }
    //     },
    //     {
    //       name: "project-home",
    //       from: {
    //         namespace: ["project"]
    //       },
    //       to: {
    //         namespace: ["home"]
    //       },
    //       leave(data) {
    //         return gsap.timeline().to(data.current.container, {
    //           duration: 0.75,
    //           opacity: 0,
    //           onComplete: () => {
    //             window.scroll(0, 0);
    //           }
    //         });
    //       },
    //       once(data) {},
    //       enter(data) {
    //         that.smoothScroll = new Scroll({
    //           template: [...data.next.container.children][1],
    //           wrapper: data.next.container
    //         });

    //         let x = [...data.next.container.children][1].children;

    //         that.content = [...x][0];

    //         that.template = that.content.getAttribute("data-template");

    //         that.page = that.pages[that.template];

    //         console.log(that.page);

    //         that.page.create();
    //         that.onResize();

    //         window.scroll(0, 0);

    //         that.canvas = new Canvas();

    //         return gsap.from(data.next.container, {
    //           duration: 0.75,
    //           opacity: 0
    //         });
    //       }
    //     },
    //     {
    //       name: "project-about",
    //       from: {
    //         namespace: ["project"]
    //       },
    //       to: {
    //         namespace: ["about"]
    //       },
    //       leave(data) {
    //         return gsap.to(data.current.container, {
    //           duration: 0.75,
    //           opacity: 0,
    //           onComplete: () => {
    //             window.scroll(0, 0);
    //           }
    //         });
    //       },
    //       once(data) {},
    //       enter(data) {
    //         that.smoothScroll = new Scroll({
    //           template: [...data.next.container.children][0],
    //           wrapper: data.next.container
    //         });

    //         let x = [...data.next.container.children][0].children;

    //         that.content = [...x][0];

    //         that.template = that.content.getAttribute("data-template");

    //         that.page = that.pages[that.template];

    //         that.page.create();
    //         that.onResize();

    //         window.scroll(0, 0);

    //         return gsap.from(data.next.container, {
    //           duration: 0.75,
    //           opacity: 0
    //         });
    //       }
    //     },
    //     {
    //       name: "about-project",
    //       from: {
    //         namespace: ["about"]
    //       },
    //       to: {
    //         namespace: ["project"]
    //       },
    //       leave(data) {
    //         return gsap.to(data.current.container, {
    //           duration: 0.75,
    //           opacity: 0,
    //           onComplete: () => {
    //             window.scroll(0, 0);
    //           }
    //         });
    //       },
    //       once(data) {},
    //       enter(data) {
    //         that.smoothScroll = new Scroll({
    //           template: [...data.next.container.children][0],
    //           wrapper: data.next.container
    //         });

    //         let x = [...data.next.container.children][0].children;

    //         that.content = [...x][0];

    //         that.template = that.content.getAttribute("data-template");

    //         that.page = that.pages[that.template];

    //         that.page.create();
    //         that.onResize();

    //         return gsap.from(data.next.container, {
    //           duration: 0.75,
    //           opacity: 0
    //         });
    //       }
    //     }
    //   ]
    // });
  }
}

new App();
