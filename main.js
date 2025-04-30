import { Vec3, Vec4, Mat4 , WEAVE} from './lib/weave-3d.esm.js'; 
import { Pedestrian } from './pedestrian.js';


/*
 * This is an simple example program to demonstrate weave-3d library. It will create
 * a basic scene with a earth orbiting the sun while a moon orbits the earth. 
 */

WEAVE.init();

let scene = new WEAVE.Scene();
WEAVE.setActiveScene(scene);

let camera = new WEAVE.Camera(WEAVE.Camera.PERSPECTIVE);
WEAVE.setActiveCamera(camera);

camera.controls = new WEAVE.CameraController(camera, canvas );

camera.position = new Vec3(Math.sin(Date.now()/1000) * 20,Math.cos(Date.now()/1000)*15,Math.cos(Date.now()/1000)* 20);
camera.lookAt(new Vec3(0,0,0));
camera.dirty = true;



let sunLight = new WEAVE.DirectionalLight(new Vec3(-1,-1.3,-0.8),new Vec3(1,1,1),0.8);
let ambientLight = new WEAVE.AmbientLight(new Vec3(1,1,1),0.3);
WEAVE.lights.push(sunLight);
WEAVE.lights.push(ambientLight);

let pedestrianMeshes = [(new WEAVE.Box()).mesh]//await WEAVE.Loader.loadMeshes('pedestrian.obj','pedestrian.mtl');
for (let i =0; i < 300;i++) {
  let pos = new Vec3(Math.random()*20-10,0,Math.random()*20-10);
  while (pos.x*pos.x + pos.z*pos.z > 100) {
    pos = new Vec3(Math.random()*20-10,0,Math.random()*20-10);
  }
  let pedestrian = new Pedestrian(pedestrianMeshes, pos);
  pedestrian.velocity = new Vec3(1,0,0);
  pedestrian.desiredDir = new Vec3(1,0,0);
  pedestrian.scale = new Vec3(0.3,0.3,0.3);
  pedestrian.children[0].mesh.material = new WEAVE.Material(new Vec3(0,0,1), new Vec3(1,1,1),10);
  Pedestrian.pedestrians.push(pedestrian);
}


for (let i =0; i < 300;i++) {
  let pos = new Vec3(Math.random()*20-10,0,Math.random()*20-10);
  while (pos.x*pos.x + pos.z*pos.z > 20) {
    pos = new Vec3(Math.random()*20-10,0,Math.random()*20-10);
  }
  let pedestrian = new Pedestrian(pedestrianMeshes, pos.add(new Vec3(30,0,0)));
  pedestrian.velocity = new Vec3(-1,0,0);
  pedestrian.desiredDir = new Vec3(-1,0,0);
  pedestrian.rotation = new Vec3(0,Math.PI,0)
  pedestrian.scale = new Vec3(0.3,0.3,0.3);
  Pedestrian.pedestrians.push(pedestrian);
}

//sun.mesh.material = new WEAVE.Material(new Vec3(0,1,1),new Vec3(0.7,1,1),10)



WEAVE.start();

document.addEventListener("keydown", e => {
    if (e.key === "d") {
      WEAVE.toggleDebugWindow(WEAVE.scene);
    }
  });






