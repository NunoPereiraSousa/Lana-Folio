import { COLOR_WHITE, COLOR_BLACK } from "../utils/colors.js";
import gsap from "gsap";
import { map } from "lodash";

export default class Theme {
  constructor() {
    this.button = document.querySelector(".navigation__button");
    this.timeline = document.querySelectorAll(".date");
    this.projectLines = document.querySelectorAll(".project__list__line");
    this.bodyStyle = window.getComputedStyle(document.body);
    this.body = document.body;

    this.addEventListener();
  }

  changeTheme() {
    if (this.bodyStyle.backgroundColor == COLOR_WHITE) {
      gsap.to(this.body, {
        backgroundColor: COLOR_BLACK,
        color: COLOR_WHITE
      });

      gsap.to(this.button, {
        backgroundColor: COLOR_WHITE
      });

      if (this.timeline) {
        map(this.timeline, label => {
          gsap.to(label, {
            backgroundColor: COLOR_WHITE,
            color: COLOR_BLACK
          });
        });
      }

      if (this.projectLines) {
        map(this.projectLines, line => {
          gsap.to(line, {
            backgroundColor: "rgba(252, 251, 250, 0.4)"
          });
        });
      }
    } else {
      gsap.to(this.body, {
        backgroundColor: COLOR_WHITE,
        color: COLOR_BLACK
      });

      gsap.to(this.button, {
        backgroundColor: COLOR_BLACK
      });

      if (this.timeline) {
        map(this.timeline, label => {
          gsap.to(label, {
            backgroundColor: COLOR_BLACK,
            color: COLOR_WHITE
          });
        });
      }

      if (this.projectLines) {
        map(this.projectLines, line => {
          gsap.to(line, {
            backgroundColor: "rgba(26, 26, 26, 0.4)"
          });
        });
      }
    }
  }

  addEventListener() {
    this.button.addEventListener("click", this.changeTheme.bind(this));
  }
}
