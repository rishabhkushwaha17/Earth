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
export default class GamePlay {
  constructor() {
    this.animation = {};
    this.animation.actions = {};
    this.animation.mixer = {};
    this.experience = new Experience();
    this.debug = this.experience.debug;
    this.scenes = new Scenes("GamePlay");
    this.time = new Time();
    this.sceneloader = new Sceneloader();
    this.character = new Character();
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
  };
  fetchAnimations = () => {
    let animation = null;
    this.model = this.experience.resources.items["character"];
    this.animation.mixer = new THREE.AnimationMixer(this.model);
    FightingGameSources.forEach((e) => {
      if (e.type == "fbx") {
        animation = this.experience.resources.items[e.name].animations;
        if (animation.length > 0) {
          this.animation.actions[e.name] = this.animation.mixer.clipAction(
            animation[0]
          );
          animation[0].name = e.name;
          this.model.animations.push(...animation);
        }
      }
    });

    this.playAnimation();
  };

  playAnimation = () => {
    // testing;

    this.touchableObject = touchableobjectsarray;
    // model.animations = animation;

    this.animation.actions.current = this.animation.actions[ANIMATIONS.IDLE];
    console.log(this.animation, "this.animationthis.animation");
    this.animation.actions.current.play();
    
    this.animation.play = (name) => {
      const newAction = this.animation.actions[name];
      const oldAction = this.animation.actions.current;

      newAction.reset();
      newAction.play();
      newAction.crossFadeFrom(oldAction, 1);
      this.animation.actions.current = newAction;
    };

    this.experience.scene.add(this.model);

    setTimeout(() => {
      this.animation.play(ANIMATIONS.JUMPKICK);
    }, 5000);
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
    this.animation.mixer.update(this.time.delta / 1000);
    window.requestAnimationFrame(this.update);
  };
}
