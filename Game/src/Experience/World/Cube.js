import Experience from "../Experience.js";
import * as THREE from "three";
export default class Cube {
  constructor(direction, name) {
    this.experience = new Experience();
    this.camera = this.experience.camera;
    this.scene = this.experience.scene;
    this.earth = this.experience.world.earth.earth;
    this.atmosphereRadius =
      this.earth.scene.children[0].children[0].children[2].geometry.boundingSphere.radius;
    // console.log("this.atmosphere", this.atmosphereRadius);
    this.setGeometry();
    this.setMaterial();
    this.setMesh(direction, name);
  }

  setGeometry(object) {
    this.cubeGeometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
  }

  setMaterial() {
    this.cubeMaterial = new THREE.MeshBasicMaterial({ color: "red" });
  }

  setMesh(direction, name) {
    this.cube = new THREE.Mesh(this.cubeGeometry, this.cubeMaterial);
    this.cube.name = name;
    this.experience.cubes.push(this.cube);
    switch (direction) {
      case "x":
        this.cube.position.setX(this.atmosphereRadius * 0.6);
        break;
      case "y":
        this.cube.position.setY(this.atmosphereRadius * 0.6);
        break;

      case "z":
        this.cube.position.setZ(this.atmosphereRadius * 0.6);
        break;

      case "xy":
        this.cube.position.setX(-this.atmosphereRadius * 0.4);
        this.cube.position.setY(-this.atmosphereRadius * 0.4);
        break;
    }

    this.scene.add(this.cube);
  }
}
