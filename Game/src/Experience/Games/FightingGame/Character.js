import Experience from "../../Experience";

export default class Character {
  constructor() {
    this.experience = new Experience();
  }

  addCharacter(name, position) {
    this.model = this.experience.resources.items[name];
    this.model.position.y = position.y;
    this.model.rotation.y = Math.PI * 0.5;
    this.experience.scene.add(this.model);
  }
}
