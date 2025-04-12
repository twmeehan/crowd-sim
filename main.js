import { Vec3, Vec4, Mat4 , WEAVE} from './lib/weave-3d.esm.js'; 

WEAVE.init();

let camera = new WEAVE.Camera(WEAVE.Camera.PERSPECTIVE);
WEAVE.setActiveCamera(camera);

let scene = new WEAVE.Scene();
WEAVE.setActiveScene(scene);

let box = new WEAVE.Box();
scene.add(box);

WEAVE.render();

