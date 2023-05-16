import GameControls from "../PlayerControls";
import { ANIMATIONS } from "../gamesConstants";

export default class KeyControls extends GameControls {
  constructor() {
    super();
    console.log("Keboadrd");
    // this.GameControls = new GameControls();
    this.setEvents();
  }

  setEvents = () => {
    let onKeyDown = (event) => {
      // Check the key code of the pressed key
      switch (event.keyCode) {
        case 37: // Left arrow key
          console.log("left arraow is working");
          this.playAnimation(ANIMATIONS.JUMP);
          break;
        case 38: // Up arrow key
          this.playAnimation(ANIMATIONS.HIT1);
          break;
        case 39: // Right arrow key
          this.playAnimation(ANIMATIONS.DEFEND);
          break;
        case 40: // Down arrow key
          this.playAnimation(ANIMATIONS.GROUNDPUNCH);
          break;
        default:
          // No action for other keys
          break;
      }
    };
    window.addEventListener("keydown", onKeyDown, false);
  };
}
