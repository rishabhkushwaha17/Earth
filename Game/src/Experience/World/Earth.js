import Experience from "../Experience.js";
import * as THREE from "three";
export default class Earth {
  constructor() {
    this.experience = new Experience();
    this.axesHelper = new THREE.AxesHelper();

    this.scene = this.experience.scene;
    this.scene.add(this.axesHelper);
    this.resources = this.experience.resources;
    this.earth = null;
    this.earth = this.resources.items["Earth"];
    // console.log(this.resources.items, "from earth.js");
    // Setup
    this.addModel(this.earth);
  }

  addModel(object) {
    // console.log("Earth width", object);
    this.scene.add(object.scene);
  }
}
