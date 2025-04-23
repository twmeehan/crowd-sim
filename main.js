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

let earth = new WEAVE.Sphere();
earth.name ="earth";
earth.mesh.color = new Vec4(0,0,1,0.5);
earth.update = () => {
    
    earth.transform.position = new Vec3(Math.sin(Date.now()/1000)*10,0,Math.cos(Date.now()/1000) * 7);
    earth.dirty = true;
};

let moon = new WEAVE.Sphere();
moon.name ="moon";
moon.transform.scale = new Vec3(0.3,0.3,0.3);
moon.mesh.color = new Vec4(1,1,1,0.8);
moon.update = () => {
    moon.transform.position = new Vec3(Math.sin(Date.now()/300) * 2,0,Math.cos(Date.now()/300) *2);
    moon.dirty = true;
};
earth.add(moon);

let sun = new WEAVE.Box();
sun.mesh.color = new Vec4(1,1,0,0.5);

camera.transform.position = new Vec3(Math.sin(Date.now()/5000) * 20,Math.cos(Date.now()/5000)*15,Math.cos(Date.now()/5000)* 20);
camera.lookAt(new Vec3(0,0,0));
camera.dirty = true;

WEAVE.start();

document.addEventListener("keydown", e => {
    if (e.key === "d") {
      WEAVE.toggleDebugWindow(WEAVE.scene);
    }
  });






