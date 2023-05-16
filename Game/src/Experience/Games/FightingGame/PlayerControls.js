import Experience from "../../Experience";
import GameManager from "./GameManager";
import { ANIMATIONS } from "./gamesConstants";

export default class GameControls {
  constructor() {
    this.experience = new Experience();
    this.gameManager = new GameManager();
    this.gameManager.animation.actions.current =
      this.gameManager.animation.actions[ANIMATIONS.IDLE];
    this.gameManager.animation.actions.current.play();
    this.update();
  }

  playAnimation = (name) => {
    const newAction = this.gameManager.animation.actions[name];
    const oldAction = this.gameManager.animation.actions.current;
    newAction.reset();
    newAction.play();
    newAction.crossFadeFrom(oldAction, 1);
    this.gameManager.animation.actions.current = newAction;
  };

  update = () => {
    this.gameManager.animation.mixer.update(this.experience.time.delta / 1000);
    window.requestAnimationFrame(this.update);
  };
}
