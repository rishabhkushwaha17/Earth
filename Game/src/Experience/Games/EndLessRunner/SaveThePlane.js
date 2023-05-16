import Camera from "../../Camera";
import Experience from "../../Experience";
import Scenes from "../../Scenes";
import Sceneloader from "../../Utils/Sceneloader";
import * as THREE from "three";

export default class SaveThePlane {
  constructor() {
    this.experience = new Experience();
    this.scenes = new Scenes("SaveThePlane");
    this.sceneloader = new Sceneloader();
  }
  addElements = () => {
    let model = this.experience.resources.items["aeroplane"].scene;
    console.log("In add ELement");
    model.position.x = 1;
    model.rotation.z = 0.1;
    model.rotation.y = -Math.PI / 2;
    let mesh = null;
    model.traverse((node) => {
      if (node.isMesh) {
        console.log(node);
        mesh = node;
        node.material.depthWrite = true;
      }
    });
    this.experience.scene.add(model);
    console.log(model);
    //Camera
    this.experience.camera = new Camera(42, 1);
    this.addParticles();
    // this.playAnimation();
    // this.moveCamera();
  };
  //   playAnimation() {
  //     let animation =
  //       this.experience.resources.items["characterAnimation"].animations;
  //     this.model = this.experience.resources.items["character"];
  //     this.touchableObject = touchableobjectsarray;
  //     // model.animations = animation;

  //     this.model.animations = [...animation];

  //     this.animation = {};
  //     this.animation.mixer = new THREE.AnimationMixer(this.model);
  //     this.animation.actions = {};
  //     this.animation.actions.idle = this.animation.mixer.clipAction(
  //       this.model.animations[0]
  //     );

  //     this.animation.actions.current = this.animation.actions.idle;

  //     this.experience.scene.add(this.model);
  //     this.animation.actions.current.play();
  //   }
  addParticles() {
    let particlesGeometry = new THREE.BufferGeometry();
    let particlesCount = 500;
    const positions = new Float32Array(particlesCount * 3);
    // const colors = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 30;
    }
    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );
    // particlesGeometry.setAttribute(
    //   "color",
    //   new THREE.BufferAttribute(colors, 3)
    // );

    const particlesMaterial = new THREE.PointsMaterial({
      //   color: 0xff001f,
      //   size: 0.02,
      //   sizeAttenuation: true,
    });
    // particlesMaterial.vertexColors = colors;
    particlesMaterial.size = 0.2;
    particlesMaterial.sizeAttenuation = true;
    particlesMaterial.transparent = true;
    // particlesMaterial.alphaMap = particleTexture;
    // particlesMaterial.alphaTest = 0.001;
    // particlesMaterial.depthTest = false; //COULD CREATE BUGS AS ITEMS BEHIND AN OBJECT ARE ALSO VISIBLE
    particlesMaterial.depthWrite = true;
    particlesMaterial.blending = THREE.AdditiveBlending;

    //Points
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    this.experience.scene.add(particles);
  }
}
