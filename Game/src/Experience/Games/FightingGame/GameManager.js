import Experience from "../../Experience";
import Resources from "../../Utils/Resources";
import Sceneloader from "../../Utils/Sceneloader";
import { FightingGameSources } from "../../sources";
import GamePlay from "./GamePlay";

let instance = null;
export default class GameManager {
  constructor() {
    if (instance) {
      return instance;
    }
    instance = this;
    this.experience = new Experience();
    this.resources = new Resources(FightingGameSources);
    this.sceneLoader = new Sceneloader();
    this.experience.resources = this.resources;
    this.setScene();
    this.resources.on("resourcesLoaded", () => {
      this.gamePlayClass = new GamePlay();
      this.sceneLoader.addWorld(this.gamePlayClass);
    });
  }

  loadingResources() {
    this.resources;
  }

  setScene() {}
}
