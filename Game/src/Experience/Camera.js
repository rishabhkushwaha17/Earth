import Experience from "./Experience";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GamePlay from "./Games/FightingGame/GamePlay";
export default class Camera {
  constructor(fov = 42, near = 0.2, far = 1000000000) {
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;

    this.setInstance(fov, near, far);
    this.setOrbitControl();
  }

  setInstance(fov, near, far) {
    this.instance = new THREE.PerspectiveCamera(
      fov,
      this.sizes.width / this.sizes.height,
      near,
      far
    );
    this.instance.position.set(6, 4, 1);
    this.experience.scene.add(this.instance);
  }

  setOrbitControl() {
    this.orbitControl = new OrbitControls(this.instance, this.canvas);
    this.orbitControl.enableDamping = true;
    this.orbitControl.update();
  }

  resize() {
    this.instance.aspect = this.sizes.width / this.sizes.height;
    this.instance.updateProjectionMatrix();
  }

  update() {
  
    this.orbitControl.update();
  }
}
