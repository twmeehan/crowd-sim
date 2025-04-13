import { Vec3, Vec4, Mat4 , WEAVE} from './lib/weave-3d.esm.js'; 

WEAVE.init();

let camera = new WEAVE.Camera(WEAVE.Camera.PERSPECTIVE);
WEAVE.setActiveCamera(camera);

let scene = new WEAVE.Scene();
WEAVE.setActiveScene(scene);



let box = new WEAVE.Box();
scene.add(box);



let cube = new WEAVE.Box();
scene.add(cube);
cube.transform.position.x = 5;
cube.add(camera);
cube.mesh.color = new Vec4(1.0,0.0,0.0,1.0);
cube.updateWorldMatrix();


let sphere = new WEAVE.Sphere();
box.add(sphere);
sphere.transform.position.y = 2;
sphere.updateWorldMatrix();
sphere.mesh.color = new Vec4(0,0,1,0.3);

camera.lookAt(new Vec3(0,0,0))


WEAVE.render();


