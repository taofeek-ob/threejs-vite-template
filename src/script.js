import "./style.css";

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";

class App {
  constructor() {
    this.parameters = {};
    this.clock = new THREE.Clock();

    this.init();
    this.debugger();
    this.render();
    this.onResize();
  }

  init() {
    const canvas = document.querySelector("#webgl");
    this.scene = new THREE.Scene();
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    this.camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000);

    this.camera.position.z = 20;
    this.scene.add(this.camera);

    const controls = new OrbitControls(this.camera, canvas);
    controls.enableDamping = true;

    this.renderer = new THREE.WebGLRenderer({
      canvas: canvas,
    });
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.setClearColor("#000");
    this.renderer.setSize(sizes.width, sizes.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    this.textureLoader = new THREE.TextureLoader();
  }

  onResize() {
    window.addEventListener("resize", () => {
      const sizes = {
        width: window.innerWidth,
        height: window.innerHeight,
      };
      this.camera.aspect = sizes.width / sizes.height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(sizes.width, sizes.height);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });
  }

  debugger() {
    const gui = new dat.GUI();
  }
  render() {
    this.renderer.render(this.scene, this.camera);
    window.requestAnimationFrame(this.render.bind(this));
  }
}

window.addEventListener("DOMContentLoaded", () => {
  new App();
});
