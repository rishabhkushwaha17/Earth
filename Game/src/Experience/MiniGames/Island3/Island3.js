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
export default class Island3 {
  constructor() {
    this.experience = new Experience();
    this.scenes = new Scenes(touchableobjects.ISLAND3);
    this.sceneloader = new Sceneloader();
  }
  /**
   * @description Adds The required elements in the scene like - camera, model scene, fog.
   */
  addElements = () => {
    let model = this.experience.resources.items["wrecked_house"].scene;
    console.log(model.position);
    model.position.x = -400;
    model.position.y = -100;
    this.touchableObject = touchableobjectsarray;

    // Traverse the model for finding mesh
    model.traverse((node) => {
      if (node.isMesh) {
        console.log(node);
        node.material.depthWrite = true;
        // node.material.transparent = false;
        if (this.touchableObject.includes(node.name)) {
          this.experience.cubes.push(node);
        }
      }
    });

    // Fog
    this.addFog(0xfad6a5, 0.1, 10000);
    this.experience.scene.add(model);

    //Camera
    this.experience.camera = new Camera(42, 4);
    this.moveCamera();
  };
  /**
   * @description Adds Fog in the Scene
   * @param {*} fogColor Color of Fog
   * @param {*} fogNear Near point of Fog to be visible
   * @param {*} fogFar Far point of Fog to be visible
   */
  addFog(fogColor, fogNear, fogFar) {
    this.experience.scene.background = new THREE.Color(0xf1f2f3);
    let fog = new THREE.Fog(fogColor, fogNear, fogFar);
    this.experience.scene.fog = fog;
  }
  /**
   * @description Moves Camera back when Scene is loaded
   */
  moveCamera() {
    gsap.to(this.experience.camera.instance.position, {
      duration: 2,
      x: 0,
      y: 600,
      z: 1200,
    });
  }
}
