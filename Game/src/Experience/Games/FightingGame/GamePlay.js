import Sceneloader from "../../Utils/Sceneloader";
import * as THREE from "three";
import Scenes from "../../Scenes";
import Experience from "../../Experience";
import Camera from "../../Camera";
import { gsap } from "gsap";
import { touchableobjectsarray } from "../../Utils/Touchableconstants";
import Time from "../../Utils/Time";
import Character from "./Character";
import { FightingGameSources } from "../../sources";
import { ANIMATIONS } from "./gamesConstants";
import GameManager from "./GameManager";
import GameControls from "./PlayerControls";
import JoyStick from "./Utils/JoyStickControlls";
import KeyControls from "./Utils/KeyControlls";
export default class GamePlay {
  constructor() {
    this.experience = new Experience();
    this.debug = this.experience.debug;
    this.scenes = new Scenes("GamePlay");
    this.time = new Time();
    this.sceneloader = new Sceneloader();
    this.character = new Character();
    this.gameManager = new GameManager();
  }

  addElements = () => {
    this.experience.scene.background =
      this.experience.resources.items["gameBackground"];
    this.character.addCharacter("character", new THREE.Vector3(0, -100, 0));
    let camera = new Camera(42, 4);
    camera.instance.position.set(0, -90, 300);
    this.experience.camera = camera;

    this.addFloor();
    this.fetchAnimations();
    console.log(" this.model.animations", this.model.animations);

    this.update();

    let isMobile = navigator.userAgent.match(
      /(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i
    );
    if (isMobile) {
      new JoyStick();
    } else {
      new KeyControls();
    }
    console.log("yes yse yes it is a mobile", isMobile);
  };
  fetchAnimations = () => {
    let animation = null;
    this.model = this.experience.resources.items["character"];
    this.gameManager.animation.mixer = new THREE.AnimationMixer(this.model);
    FightingGameSources.forEach((e) => {
      if (e.type == "fbx") {
        animation = this.experience.resources.items[e.name].animations;
        if (animation.length > 0) {
          this.gameManager.animation.actions[e.name] =
            this.gameManager.animation.mixer.clipAction(animation[0]);
          animation[0].name = e.name;
          this.model.animations.push(...animation);
        }
      }
    });

    // this.playAnimation();
    this.experience.scene.add(this.model);
    new GameControls();
  };

  addFloor = () => {
    this.floor = this.experience.resources.items["fightingGameFloor"].scene;
    this.floor.traverse((node) => {
      (node.position.x = 0), (node.position.y = 0), (node.position.z = -1);
      //   node.rotation.z = Math.PI * 0.5;
    });
    this.experience.scene.add(this.floor);
  };

  update = () => {
    // this.animation.mixer.update(this.time.delta / 1000);
    window.requestAnimationFrame(this.update);
  };
}
