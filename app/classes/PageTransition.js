// import gsap from "gsap";
// import barba from "@barba/core";
// import Canvas from "./Canvas.js";

// export default class PageTransition {
//   constructor() {}

//   init(page) {
//     let that = page;
//     console.log(page);

//     barba.init({
//       transitions: [
//         {
//           name: "home-about",
//           from: {
//             namespace: ["home"]
//           },
//           to: {
//             namespace: ["about"]
//           },
//           leave(data) {
//             that.page.animationsTitles = [];
//             that.page.animationsParagraphs = [];
//             that.page.animationsLines = [];
//             that.page.animations = [];

//             return gsap.to(data.current.container, {
//               duration: 0.75,
//               opacity: 0,
//               onComplete: () => {
//                 window.scroll(0, 0);
//               }
//             });
//           },
//           once(data) {},
//           enter(data) {
//             that.smoothScroll = new Scroll({
//               template: [...data.next.container.children][0],
//               wrapper: data.next.container
//             });

//             let x = [...data.next.container.children][0].children;

//             that.content = [...x][0];

//             that.template = that.content.getAttribute("data-template");

//             that.page = that.pages[that.template];

//             that.page.animations = [];

//             that.page.create();
//             that.onResize();

//             return gsap.from(data.next.container, {
//               duration: 0.75,
//               opacity: 0
//             });
//           }
//         },
//         {
//           name: "about-home",
//           from: {
//             namespace: ["about"]
//           },
//           to: {
//             namespace: ["home"]
//           },
//           leave(data) {
//             return gsap.to(data.current.container, {
//               duration: 0.75,
//               opacity: 0,
//               onComplete: () => {
//                 window.scroll(0, 0);
//               }
//             });
//           },
//           enter(data) {
//             that.smoothScroll = new Scroll({
//               template: [...data.next.container.children][1],
//               wrapper: data.next.container
//             });

//             let x = [...data.next.container.children][1].children;

//             that.content = [...x][0];

//             that.template = that.content.getAttribute("data-template");

//             that.page = that.pages[that.template];

//             that.page.create();
//             that.onResize();

//             window.scroll(0, 0);

//             that.canvas = new Canvas();

//             return gsap.from(data.next.container, {
//               duration: 0.75,
//               opacity: 0
//             });
//           }
//         },
//         {
//           name: "home-project",
//           from: {
//             namespace: ["home"]
//           },
//           to: {
//             namespace: ["project"]
//           },
//           leave(data) {
//             return gsap.to(data.current.container, {
//               duration: 0.75,
//               opacity: 0,
//               onComplete: () => {
//                 window.scroll(0, 0);
//               }
//             });
//           },
//           once(data) {},
//           enter(data) {
//             that.smoothScroll = new Scroll({
//               template: [...data.next.container.children][0],
//               wrapper: data.next.container
//             });

//             let x = [...data.next.container.children][0].children;

//             that.content = [...x][0];

//             that.template = that.content.getAttribute("data-template");

//             that.page = that.pages[that.template];

//             that.page.create();
//             that.onResize();

//             window.scroll(0, 0);

//             return gsap.from(data.next.container, {
//               duration: 0.75,
//               opacity: 0
//             });
//           }
//         },
//         {
//           name: "project-home",
//           from: {
//             namespace: ["project"]
//           },
//           to: {
//             namespace: ["home"]
//           },
//           leave(data) {
//             return gsap.timeline().to(data.current.container, {
//               duration: 0.75,
//               opacity: 0,
//               onComplete: () => {
//                 window.scroll(0, 0);
//               }
//             });
//           },
//           enter(data) {
//             that.smoothScroll = new Scroll({
//               template: [...data.next.container.children][1],
//               wrapper: data.next.container
//             });

//             let x = [...data.next.container.children][1].children;

//             that.content = [...x][0];

//             that.template = that.content.getAttribute("data-template");

//             that.page = that.pages[that.template];

//             that.page.create();
//             that.onResize();

//             window.scroll(0, 0);

//             that.canvas = new Canvas();

//             return gsap.from(data.next.container, {
//               duration: 0.75,
//               opacity: 0
//             });
//           }
//         },
//         {
//           name: "project-about",
//           from: {
//             namespace: ["project"]
//           },
//           to: {
//             namespace: ["about"]
//           },
//           leave(data) {
//             that.page.animationsTitles = [];
//             that.page.animationsParagraphs = [];
//             that.page.animationsLines = [];
//             that.page.animations = [];

//             return gsap.to(data.current.container, {
//               duration: 0.75,
//               opacity: 0,
//               onComplete: () => {
//                 window.scroll(0, 0);
//               }
//             });
//           },
//           once(data) {},
//           enter(data) {
//             that.smoothScroll = new Scroll({
//               template: [...data.next.container.children][0],
//               wrapper: data.next.container
//             });

//             let x = [...data.next.container.children][0].children;

//             that.content = [...x][0];

//             that.template = that.content.getAttribute("data-template");

//             that.page = that.pages[that.template];

//             that.page.animations = [];

//             that.page.create();
//             that.onResize();

//             return gsap.from(data.next.container, {
//               duration: 0.75,
//               opacity: 0
//             });
//           }
//         },
//         {
//           name: "about-project",
//           from: {
//             namespace: ["about"]
//           },
//           to: {
//             namespace: ["project"]
//           },
//           leave(data) {
//             that.page.animationsTitles = [];
//             that.page.animationsParagraphs = [];
//             that.page.animationsLines = [];
//             that.page.animations = [];

//             return gsap.to(data.current.container, {
//               duration: 0.75,
//               opacity: 0,
//               onComplete: () => {
//                 window.scroll(0, 0);
//               }
//             });
//           },
//           once(data) {},
//           enter(data) {
//             that.smoothScroll = new Scroll({
//               template: [...data.next.container.children][0],
//               wrapper: data.next.container
//             });

//             let x = [...data.next.container.children][0].children;

//             that.content = [...x][0];

//             that.template = that.content.getAttribute("data-template");

//             that.page = that.pages[that.template];

//             that.page.animations = [];

//             that.page.create();
//             that.onResize();

//             return gsap.from(data.next.container, {
//               duration: 0.75,
//               opacity: 0
//             });
//           }
//         }
//       ]
//     });
//   }
// }
