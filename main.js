import { Vec3, Vec4, Mat4 , WEAVE} from './lib/weave-3d.esm.js'; 


/*
 * This is an simple example program to demonstrate weave-3d library. It will create
 * a basic scene with a earth orbiting the sun while a moon orbits the earth. 
 */

WEAVE.init();

let scene = new WEAVE.Scene();
WEAVE.setActiveScene(scene);

let camera = new WEAVE.Camera(WEAVE.Camera.PERSPECTIVE);
WEAVE.setActiveCamera(camera);

let sunLight = new WEAVE.DirectionalLight(new Vec3(-1,-1,-1),new Vec3(1,1,1),1);
WEAVE.lights.push(sunLight);


let sun = new WEAVE.Box();
sun.mesh.material = new WEAVE.Material(new Vec3(0,1,1),new Vec3(1,1,0),1)

camera.update = () => {
    camera.position = new Vec3(Math.sin(Date.now()/5000) * 20,Math.cos(Date.now()/5000)*15,Math.cos(Date.now()/5000)* 20);
    camera.lookAt(new Vec3(0,0,0));
    camera.dirty = true;
}

WEAVE.start();

document.addEventListener("keydown", e => {
    if (e.key === "d") {
      WEAVE.toggleDebugWindow(WEAVE.scene);
    }
  });






