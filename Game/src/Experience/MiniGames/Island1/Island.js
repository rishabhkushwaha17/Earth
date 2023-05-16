import * as THREE from "three";
import Scenes from "../../Scenes";
import Sceneloader from "../../Utils/Sceneloader";
import Experience from "../../Experience";
import Resources from "../../Utils/Resources";
import Environment from "../../World/Environment";
import Camera from "../../Camera";
import {gsap} from   "gsap"
import {  touchableobjectsarray    ,touchableobjects } from "../../Utils/Touchableconstants";
export default class Island1{
    constructor(){
        this.scene = new THREE.Scene();
        this.experience = new Experience();
           this.scenes=new Scenes(touchableobjects.ISLAND1)
        this.sceneloader=new Sceneloader();
      // this.sceneloader.loadScene(scene.scene);
      // this.addElements()
      // new Environment();
    }
    addElements=()=>{
      let model = this.experience.resources.items["portal2"].scene;
      // console.log(model.animation);

    model.traverse((node)    => {
      if (node.isMesh) {
        // console.log(node.name)

        // console.log(node.parent)
        // console.log(node.animation.length)

        // node.material.side = THREE.DoubleSide
        console.log(node.name,node.parent.name);
        if(        touchableobjectsarray.includes    (node.name       )){
          console.log("ajskbfgjkadsb");
// node.scale.set(200,109,1000009)


this.experience.cubes.push(node)
         }
          node.material.depthWrite=true
        // node.material.wireframe = true;
        // node.material.opacity = 1
        // console.log(node)
        // if(node.a)
        //node.material.transparent = false
      }
    });

            // node.material.side = THREE.DoubleSide
           
            // node.material.wireframe = true; 
            // node.material.opacity = 1
            // console.log(node)
            // if(node.a)
            //node.material.transparent = false
  
     
      console.log(this.experience.camera.instance);
      this.experience.camera=new Camera(42,4)
      // this.experience.camera.instance.near =10;
      this.experience.scene.add(model)
      console.log(
      );
      this.moveCamera()
    }
    moveCamera() {

      gsap.to(this.experience.camera.instance.position, {
        duration: 4,
        x:              10000,
        y:              10000,
        z:              10000,
      });
    }
}
