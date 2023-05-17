import Experience from "../../Experience";
import Scenes from "../../Scenes";
import Sceneloader from "../../Utils/Sceneloader";
import { EndlessRunner } from "../../sources";
import Resources from "../../Utils/Resources";
import EndlessRunnerGameplay from "./EndlessRunnerGameplay";

let _instance = null;
export default class SaveThePlane {
  constructor() {
    if (_instance) {
      return _instance;
    }
    _instance = this;
    this.experience = new Experience();
    this.resources = new Resources(EndlessRunner);
    this.scenes = new Scenes("SaveThePlane");
    this.sceneloader = new Sceneloader();
    this.experience.resources = this.resources;
    this.resources.on("resourcesLoaded", () => {
      console.log("Loaded Resources");
      this.gamePlayClass = new EndlessRunnerGameplay();
      this.sceneloader.addWorld(this.gamePlayClass);
    });
  }
}
