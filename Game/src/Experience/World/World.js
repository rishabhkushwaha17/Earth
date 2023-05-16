import Experience from "../Experience";

import Environment from "./Environment";
import Earth from "./Earth";
import Cube from "./Cube";
import { touchableobjects } from "../Utils/Touchableconstants";
export default class World {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.cubeDirection = ["x", "y", "z", "xy"];
    //Test cube

    this.resources.on("resourcesLoaded", () => {
      // console.log("resource loaded");
      this.earth = new Earth();
      this.cube = new Cube(this.cubeDirection[0],    touchableobjects.CUBE1);
      this.cube = new Cube(this.cubeDirection[1],    touchableobjects.CUBE2);
      this.cube = new Cube(this.cubeDirection[2],    touchableobjects.CUBE3);
      this.cube = new Cube(this.cubeDirection[3],    touchableobjects.CUBE4);
      this.experience.scene.background =
        this.experience.resources.items["background"];
      this.environment = new Environment();
    });
  }

  update() {}
}
