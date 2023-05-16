import * as THREE from "three";
import Scenes from "../../Scenes";
import Sceneloader from "../../Utils/Sceneloader";
import Experience from "../../Experience";
import { gsap } from "gsap";
import Camera from "../../Camera";
import {
  touchableobjectsarray,
  touchableobjects,
} from "../../Utils/Touchableconstants";
export default class Island2 {
  constructor() {
    this.scene = new THREE.Scene();
    this.experience = new Experience();
    this.scenes = new Scenes(touchableobjects.ISLAND2);
    this.sceneloader = new Sceneloader();
  }
  addElements = () => {
    let model = this.experience.resources.items["sea_house"].scene;
    this.touchableObject = touchableobjectsarray;
    model.traverse((node) => {
      if (node.isMesh) {
        node.material.depthWrite = true;
        node.material.transparent = false;
        node.position.setZ(node.position.z);
        if (this.touchableObject.includes(node.name))
          this.experience.cubes.push(node);
      }
    });

    this.addFog("#87CEEB", 0.1, 1100);
    this.experience.scene.add(model);
    this.experience.camera = new Camera(42, 4);
    this.moveCamera();
  };

  addFog(fogColor, fogNear, fogFar) {
    this.experience.scene.background = new THREE.Color("#87CEEB");
    let fog = new THREE.Fog(fogColor, fogNear, fogFar);
    this.experience.scene.fog = fog;
  }

  moveCamera() {
    gsap.to(this.experience.camera.instance.position, {
      duration: 1,
      x: 200,
      y: 200,
      z: 200,
    });
  }
}
