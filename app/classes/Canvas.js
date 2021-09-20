import { each } from "lodash";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import mockup from "../../assets/closing.png";
import fragment from "../shaders/fragment.glsl";
import vertex from "../shaders/vertex.glsl";
import gsap from "gsap";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";

export default class Canvas {
  constructor() {
    this.canvas = document.querySelector(".webgl");

    this.options = {
      width: window.innerWidth,
      height: window.innerHeight
    };

    this.time = 0;

    this.mockup = mockup;
    this.materials = [];
    this.allMeshes = [];

    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();

    this.addCamera();
    this.addRenderer();
    this.resize();
    this.addControls();
    this.setupResize();

    this.onMouseMovement();
    this.mergeHtmlWebGl();

    this.render();
  }

  addControls() {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
  }

  addRenderer() {
    this.scene = new THREE.Scene();

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas: this.canvas,
      alpha: true
    });
    this.renderer.setSize(this.options.width, this.options.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio), 2);
  }

  addCamera() {
    this.camera = new THREE.PerspectiveCamera(
      45,
      this.options.width / this.options.height,
      1.0,
      2000
    );
    this.camera.position.z = 50;
  }

  /**
   * Calculates the right Three.js FOV
   * @returns FOV calculations
   */
  getFOV() {
    let height = this.options.height;

    let fov = Math.atan(height / (2 * this.camera.position.z)) * 2;

    return (fov / Math.PI) * 180;
  }

  mergeHtmlWebGl() {
    this.material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        uImage: { value: 0 },
        u_resolution: { value: new THREE.Vector2(0.5, 0.5) },
        hover: { value: new THREE.Vector2(0.5, 0.5) },
        hoverState: {
          value: 0
        }
      },
      fragmentShader: fragment,
      vertexShader: vertex
    });

    const htmlImages = [...document.querySelectorAll("img")];

    this.imageStore = each(htmlImages, image => {
      let texture = new THREE.Texture(image);
      texture.needsUpdate = true;

      let geometry = new THREE.PlaneBufferGeometry(1, 1, 10, 10);
      let material = this.material.clone();

      this.materials.push(material);
      material.uniforms.uImage.value = texture;

      // this.hoverImages(image, material);
      image.addEventListener("mouseenter", () => {
        gsap.to(material.uniforms.hoverState, {
          duration: 1,
          value: 1,
          ease: "expo.out"
        });
      });

      image.addEventListener("mouseout", () => {
        gsap.to(material.uniforms.hoverState, {
          duration: 1,
          value: 0,
          ease: "expo.out"
        });
      });

      let mesh = new THREE.Mesh(geometry, material);
      mesh.userData.image = image;

      this.allMeshes.push(mesh);

      this.setScalePosition(mesh);
      this.scene.add(mesh);
    });
  }

  /**
   * Set scale property for each mesh that exists inside three js scene
   * @param {Object} mesh each object mesh
   */
  setScale(mesh) {
    let image = mesh.userData.image;
    let bounds = image.getBoundingClientRect();

    mesh.scale.set(bounds.width, bounds.height, 1);
  }

  /**
   * Set the correct mesh position according to each image position in the website
   * @param {Object} mesh each object mesh
   */
  setPosition(mesh) {
    let image = mesh.userData.image;
    let bounds = image.getBoundingClientRect();

    mesh.position.set(
      bounds.left - this.options.width / 2 + bounds.width / 2,
      -bounds.top - bounds.height / 2 + this.options.height / 2
    );
  }

  /**
   * Scale + position calls
   * @param {Object} mesh each object mesh
   */
  setScalePosition(mesh) {
    this.setScale(mesh);
    this.setPosition(mesh);
  }

  hoverImages(image, material) {
    image.addEventListener("mouseenter", () => {
      gsap.to(material.uniforms.hoverState, {
        duration: 1,
        value: 1,
        ease: "expo.out"
      });
    });

    image.addEventListener("mouseout", () => {
      gsap.to(material.uniforms.hoverState, {
        duration: 1,
        value: 0,
        ease: "expo.out"
      });
    });
  }

  /**
   * Mouse movement intersections
   * Looks for objects that are being hovered inside the scene
   */
  onMouseMovement() {
    window.addEventListener(
      "mousemove",
      event => {
        this.mouse.x = (event.clientX / this.options.width) * 2 - 1;
        this.mouse.y = -(event.clientY / this.options.height) * 2 + 1;

        this.raycaster.setFromCamera(this.mouse, this.camera);

        const intersects = this.raycaster.intersectObjects(this.scene.children);

        if (intersects.length > 0) {
          let object = intersects[0].object;
          object.material.uniforms.hover.value = intersects[0].uv;
        }
      },
      false
    );
  }

  resize() {
    this.options.height = window.innerHeight;
    this.options.width = window.innerWidth;

    this.camera.fov = this.getFOV();
    this.camera.aspect = this.options.width / this.options.height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(this.options.width, this.options.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  setupResize() {
    window.addEventListener("resize", this.resize.bind(this));
  }

  render() {
    this.time += 0.05;

    this.materials.forEach(material => {
      material.uniforms.time.value = this.time;
    });

    this.allMeshes.forEach(mesh => {
      this.setScalePosition(mesh);
    });

    this.renderer.render(this.scene, this.camera);

    requestAnimationFrame(this.render.bind(this));
  }
}
