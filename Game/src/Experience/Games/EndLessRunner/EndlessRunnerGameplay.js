import Camera from "../../Camera";
import Experience from "../../Experience";
import Scenes from "../../Scenes";
import Sceneloader from "../../Utils/Sceneloader";
import Time from "../../Utils/Time";
import * as THREE from "three";
import { gsap } from "gsap";
export default class EndlessRunnerGameplay {
  constructor() {
    this.experience = new Experience();
    this.scenes = new Scenes("EndlessRunnerGameplay");
    this.time = new Time();
    this.sceneloader = new Sceneloader();
  }
  /**
   * @description Adds the required elements in the scene
   */
  addElements = () => {
    //Add Model
    console.log(
      this.experience.resources.items,
      "this.experience.resources.items[]"
    );
    this.model = this.experience.resources.items["aeroplane"];
    console.log("In add ELement");
    //Poisitioning Model
    // model.scale.set(100, 100, 100);
    // model.position.x = 2;
    // this.model.scale.set(8, 8, 8);
    // model.rotation.z = 0.125;
    this.model.rotation.y = -Math.PI / 2;
    let mesh = null;
    // this.model.traverse((node) => {
    //   if (node.isMesh) {
    //     console.log(node);
    //     mesh = node;
    //     node.material.depthWrite = true;
    //   }
    // });

    this.experience.scene.background =
      this.experience.resources.items["background"];
    console.log(this.model);
    this.experience.scene.add(this.model);

    //Animations
    this.addAnimations(this.model);

    //Lights
    this.light = new THREE.DirectionalLight(0xffffff, 30);
    this.light.position.set(10, 10, -50);
    this.experience.scene.add(this.light);

    //Camera
    this.camera = new THREE.Camera(42, 4);
    this.camera.lookAt(this.model.position);

    //Add Particles
    this.createParticlesGeometryAndMaterial();

    //Move camera
    // this.moveCameraBack();
  };

  setEvents = (action) => {
    let onKeyDown = (event) => {
      // Check the key code of the pressed key
      switch (event.keyCode) {
        case 32:
          if (action.paused) {
            action.paused = false;
          }
          this.playAnimation(action);
          break;
      }
    };
    let onKeyUp = (event) => {
      this.pauseAnimation(action);
    };
    window.addEventListener("keydown", onKeyDown, false);
    window.addEventListener("keyup", onKeyUp, false);
  };
  /**
   * @description create Particles Geometry And Material and positioning
   */
  createParticlesGeometryAndMaterial() {
    let particlesGeometry = new THREE.BufferGeometry();
    let particlesCount = 500;
    const positions = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 3000;
    }
    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );
    const particlesMaterial = new THREE.PointsMaterial({
      size: 5,
      sizeAttenuation: true,
    });
    let starTexture = this.experience.resources.items["star"];
    particlesMaterial.alphaMap = starTexture;
    particlesMaterial.blending = THREE.AdditiveBlending;
    this.addParticles(particlesGeometry, particlesMaterial);
  }
  /**
   * @description Adds the particles
   * @param {*} particlesGeometry geometry of the particles
   * @param {*} particlesMaterial material of the particles
   */
  addParticles(particlesGeometry, particlesMaterial) {
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    this.experience.scene.add(particles);
  }
  /**
   * @description Adds and plays animation
   * @param {*} model
   */
  addAnimations(model) {
    this.mixer = new THREE.AnimationMixer(model);
    this.action = this.mixer.clipAction(model.animations[0]);
    console.log("action", this.action);
    this.setEvents(this.action);
  }
  playAnimation(action) {
    action.play();
    this.update();
  }
  pauseAnimation(action) {
    action.stop();
  }
  moveCameraBack() {
    gsap.to(this.camera.position, {
      duration: 2,
      z: 100,
    });
  }
  update = () => {
    this.mixer.update(this.time.delta / 1000);
    window.requestAnimationFrame(this.update);
  };
}
