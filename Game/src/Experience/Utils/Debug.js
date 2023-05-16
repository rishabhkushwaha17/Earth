import * as lil from "lil-gui";
import Experience from "../Experience";
import GamePlay from "../Games/FightingGame/GamePlay";
export default class Debug {
  constructor() {
    this.experience = new Experience();
    this.active = window.location.hash === "#debug";
    if (this.active) {
      this.gui = new lil.GUI();

      this.gui
        .add(this.experience.camera.instance.position, "x", -100, 1000, 1)
        .onChange((x) => {
          this.experience.camera.instance.position.setX(x);
        });
      this.gui
        .add(this.experience.camera.instance.position, "y", -100, 1000, 1)
        .onChange((x) => {
          this.experience.camera.instance.position.setY(x);
        });
      this.gui
        .add(this.experience.camera.instance.position, "z", -100, 1000, 1)
        .onChange((x) => {
          this.experience.camera.instance.position.setZ(x);
        });

      // this.gui.add()
    }
  }
}
