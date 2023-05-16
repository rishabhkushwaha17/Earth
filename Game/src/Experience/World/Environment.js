import Experience from "../Experience";
import * as THREE from "three";
export default class Environment {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.setAmbientLight();
    this.setSunLight();
    // this.setEnvironmentMap();
  }

  setAmbientLight() {
    this.ambientLight = new THREE.AmbientLight("#ffffff", 4);
    this.experience.scene.add(this.ambientLight);
  }
  setSunLight() {
    this.sunLight = new THREE.DirectionalLight("#ffffff", 1);
    // this.sunLightHelper  = new THREE.DirectionalLightHelper(this.sunLight);
    // this.experience.scene.add(this.sunLightHelper);

    this.sunLight.castShadow = true;
    this.sunLight.shadow.camera.far = 15;
    this.sunLight.shadow.mapSize.set(1024, 1024);
    this.sunLight.shadow.normalBias = 0.05;
    this.sunLight.position.set(10, 10, 100);
    this.experience.scene.add(this.sunLight);
  }

  setEnvironmentMap() {
    this.environmentMap = {};
    this.environmentMap.intensity = 0.4;
    this.environmentMap.texture = this.resources.items.environmentMapTexture;
    // this.environmentMap.texture.encoding = THREE.sRGBEncoding;
    this.scene.environment = this.environmentMap.texture;

    this.environmentMap.updateMaterials = () => {
      this.scene.traverse((child) => {
        if (
          child instanceof THREE.Mesh &&
          child.material instanceof THREE.MeshStandardMaterial
        ) {
          child.material.envMap = this.environmentMap.texture;
          child.material.envMapIntensity = this.environmentMap.intensity;
          child.material.needsUpdate = true;
        }
      });
    };
    this.environmentMap.updateMaterials();
  }
}
