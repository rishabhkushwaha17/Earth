import * as THREE from "three"
import Experience from "./Experience";
export default class Scenes{
    constructor(name){
        this.scene = new THREE.Scene();
        this.scene.name = name;
        // this.experience = new Experience();
    }
}