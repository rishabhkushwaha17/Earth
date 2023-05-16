import * as THREE from "three";
import Experience from "../Experience";
import { gsap } from "gsap";
import Sceneloader from "../Utils/Sceneloader";
import Scenes from "../Scenes";
import Island1 from "../MiniGames/Island1/Island";
import Island2 from "../MiniGames/Island2/Island";
export default class CameraMovement {
  constructor() {
    this.raycaster = new THREE.Raycaster();
    this.experience = new Experience();
    this.camera = this.experience.camera;
    this.sceneLoader = new Sceneloader();
    this.targetcubes = this.experience.cubes;
    this.isIntersected = [];
    this.mouse = new THREE.Vector2(0, 0);
    this.setMouseEvents();
  }

  setMouseEvents() {
    window.addEventListener(
      "click",
      (e) => {
        this.onMouseClick(e);
      },
      false
    );
    window.addEventListener(
      "mousemove",
      (e) => {
        this.onMouseMove(e);
      },
      false
    );
  }

  islandSelection(name) {
    console.log(name, "from islandselection");
    this.sceneLoader.loadScene(name);
  }

  open = (name) => {
    if (name.slice(0, name.length - 1) == "cube") {
      gsap
        .to(this.camera.instance.position, {
          duration: 1,
          x: this.isIntersected[0].object.position.x / 0.9,
          y: this.isIntersected[0].object.position.y / 0.9,
          z: this.isIntersected[0].object.position.z / 0.9,
        })
        .then(() => {
          this.islandSelection(name);
        });
    } else {
      this.islandSelection(name);
    }

    // this.camera.instance.position.setZ();
    // this.camera.instance.position.setX();
    // this.camera.instance.position.setY();

    // console.log("opened");
  };
  onMouseClick = (event) => {
    this.touchabeobjects = this.experience.cubes;
    // console.log(this.touchabeobjects);
    if (this.isIntersected.length) {
      for (let i = 0; i < this.touchabeobjects.length; i++) {
        if (this.isIntersected[0].object.name == this.touchabeobjects[i].name) {
          this.open(this.isIntersected[0].object.name);
        }
      }
      // console.log("Mesh clicked!", this.isIntersected);
    }
  };
  onMouseMove = (event) => {
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -1 * (event.clientY / window.innerHeight) * 2 + 1;
  };
  update() {
    this.raycaster.setFromCamera(this.mouse, this.experience.camera.instance);
    this.isIntersected = this.raycaster.intersectObjects(this.experience.cubes);
  }
}
