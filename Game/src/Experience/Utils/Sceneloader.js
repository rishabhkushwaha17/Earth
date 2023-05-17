import * as THREE from "three";
import Experience from "../Experience";
import Island1 from "../MiniGames/Island1/Island";
import Island2 from "../MiniGames/Island2/Island";
import Environment from "../World/Environment";
import { touchableobjects, touchableobjectsarray } from "./Touchableconstants";
import GamePlay from "../Games/FightingGame/GamePlay";
import GameManager from "../Games/FightingGame/GameManager";
import Island3 from "../MiniGames/Island3/Island3";
import SaveThePlane from "../Games/EndLessRunner/SaveThePlane";
import EndlessRunnerGameplay from "../Games/EndLessRunner/EndlessRunnerGameplay";
export default class Sceneloader {
  constructor() {
    this.experience = new Experience();
  }

  loadScene(name) {
    // console.log("scene loader", scene);
    // this.experience.scene.clear();

    switch (name) {
      case touchableobjects.CUBE1:
        // let scene = new Island1();
        // this.addWorld(scene);
        new GameManager();
        break;
      case touchableobjects.CUBE2:
        let scene2 = new Island2();
        this.addWorld(scene2);
        break;
      case touchableobjects.CUBE3:
        let scene3 = new Island3();
        this.addWorld(scene3);
        break;
      case touchableobjects.ISLAND3_HOUSECUBE02:
      case touchableobjects.FLOOR_CONE:
      case touchableobjects.CUBE001:
        console.log("Earth Scene");
        let scene4 = this.experience.scenes["Earth"];
        console.log(this.experience.scenes["Earth"]);
        this.addWorld(null, scene4);
        break;
      case touchableobjects.ISLAND3_HOUSECUBE01:
        new SaveThePlane();
        break;
      // case touchableobjects.BALCONY_CONE:
      //   console.log("Balcony_Co");
      //   break;
      case touchableobjects.BOAT_CONE:
        console.log("Floor_Cone");
        let scene5 = this.experience.scenes["island1"];
        console.log(this.experience.scenes["island1"]);
        this.addWorld(null, scene5);
        break;
      default:
        break;
    }
  }

  addWorld(scene = null, oldscene = null) {
    if (scene != null && oldscene == null) {
      this.showScene(scene.scenes.scene);
      new Environment();
      scene.addElements();
    } else {
      this.showScene(oldscene);

      this.experience.camera.instance = oldscene.children[0];
      oldscene.traverse((e) => {
        if (touchableobjectsarray.includes(e.name)) {
          this.experience.cubes.push(e);
        }
      });
    }
  }

  showScene(scene) {
    this.experience.cubes = [];
    // this.experience.scene.clear();
    console.log(this.experience.scene);
    this.experience.scenes[this.experience.scene.name] = this.experience.scene;
    this.experience.scene = scene;
    console.log(scene, this.experience.scene);
  }
}
