import Camera from "./Camera";
import Renderer from "./Renderer";
import Sizes from "./Utils/Sizes";
import Time from "./Utils/Time";
import * as THREE from "three";
import World from "./World/World";
import Resources from "./Utils/Resources";
import { FightingGameSources, sources } from "./sources";
import Debug from "./Utils/Debug";
import CameraMovement from "./World/CameraMovement";
import Scenes from "./Scenes";
import { getData } from "./Utils/directoryFileList";
let instance = null;
export default class Experience {
  constructor(canvas) {
    if (instance) {
      return instance;
    }
    instance = this;
    this.scenes = {};
    this.canvas = canvas;
    this.cubes = [];
    this.debug = new Debug();
    // console.log("Experience", this.canvas);

    //resize events
    this.sizes = new Sizes();
    this.sizes.on("resize", () => {
      this.resize();
    });

    //Scene creatition
    this.sceneClass = new Scenes("Earth");
    this.scene = this.sceneClass.scene;

    //resources
    this.resources = new Resources(sources);

    //camera
    this.camera = new Camera();
    // console.log(this.camera, "afterr main generation ");
    this.time = new Time();
    this.time.on("tick", () => {
      this.update();
    });
    //world
    this.world = new World();

    //renderer
    this.renderer = new Renderer();
    //CameraMovement
    this.CameraMovement = new CameraMovement();

    getData().then((data) => {
      console.log("data", data);
      FightingGameSources.push(...data);
      console.log(FightingGameSources);
    });

    //time tick events
  }

  update() {
    // console.log(this.camera,"in update main generation ");
    this.camera.update();
    this.world.update();
    this.CameraMovement.update();
    this.renderer.update();
  }
  resize() {
    this.camera.resize();
    this.renderer.resize();
  }
  destroy() {
    this.sizes.off("resize");
    this.time.off("tick");
    this.scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.geometry.dispose();
        for (const key in child.material) {
          const value = child.material[key];
          if (value && typeof value.dispose === "function") {
            value.dispose();
          }
        }
      }
    });
    this.camera.orbitControl.dispose();
    this.renderer.instance.dispose();
    if (this.debug.active) {
      this.debug.gui.destroy();
    }
  }
}
