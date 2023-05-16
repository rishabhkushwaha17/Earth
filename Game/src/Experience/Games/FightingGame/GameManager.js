let instance = null;
export default class GameManager {
  constructor() {
    if (instance) {
      return instance;
    }
    instance = this;
    this.setScene();
  }

  setScene(){}
}
