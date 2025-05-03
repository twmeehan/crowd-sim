import { Vec3, Vec4, Mat4 , WEAVE} from './lib/weave-3d.esm.js'; 
import { Pedestrian } from './pedestrian.js';
import { InfectionMesh } from './InfectionMesh.js';

const positions = [
  // Front face (0,0,1)
  -1, -1,  1,
   1, -1,  1,
   1,  1,  1,
   1,  1,  1,
  -1,  1,  1,
  -1, -1,  1,

  // Back face (0,0,-1)
  1, -1, -1,
  -1, -1, -1,
  -1,  1, -1,
  -1,  1, -1,
  1,  1, -1,
  1, -1, -1,

  // Left face (-1,0,0)
  -1, -1, -1,
  -1, -1,  1,
  -1,  1,  1,
  -1,  1,  1,
  -1,  1, -1,
  -1, -1, -1,

  // Right face (1,0,0)
  1, -1,  1,
  1, -1, -1,
  1,  1, -1,
  1,  1, -1,
  1,  1,  1,
  1, -1,  1,

  // Top face (0,1,0)
  -1,  1,  1,
   1,  1,  1,
   1,  1, -1,
   1,  1, -1,
  -1,  1, -1,
  -1,  1,  1,

  // Bottom face (0,-1,0)
  -1, -1, -1,
   1, -1, -1,
   1, -1,  1,
   1, -1,  1,
  -1, -1,  1,
  -1, -1, -1,
];

const normals = [
  // Front
  0, 0, 1,  0, 0, 1,  0, 0, 1,
  0, 0, 1,  0, 0, 1,  0, 0, 1,
  // Back
  0, 0, -1,  0, 0, -1,  0, 0, -1,
  0, 0, -1,  0, 0, -1,  0, 0, -1,
  // Left
  -1, 0, 0,  -1, 0, 0,  -1, 0, 0,
  -1, 0, 0,  -1, 0, 0,  -1, 0, 0,
  // Right
  1, 0, 0,  1, 0, 0,  1, 0, 0,
  1, 0, 0,  1, 0, 0,  1, 0, 0,
  // Top
  0, 1, 0,  0, 1, 0,  0, 1, 0,
  0, 1, 0,  0, 1, 0,  0, 1, 0,
  // Bottom
  0, -1, 0,  0, -1, 0,  0, -1, 0,
  0, -1, 0,  0, -1, 0,  0, -1, 0,
];

const uvs = [
  // Front
  0, 0, 1, 0, 1, 1,
  1, 1, 0, 1, 0, 0,
  // Back (flipped horizontally)
  1, 0, 0, 0, 0, 1,
  0, 1, 1, 1, 1, 0,
  // Left
  1, 0, 0, 0, 0, 1,
  0, 1, 1, 1, 1, 0,
  // Right
  0, 0, 1, 0, 1, 1,
  1, 1, 0, 1, 0, 0,
  // Top
  0, 1, 0, 0, 1, 0,
  1, 0, 1, 1, 0, 1,
  // Bottom (flipped vertically)
  1, 1, 0, 1, 0, 0,
  0, 0, 1, 0, 1, 1,
];

function create_group(num, mesh, direction, location) {
  for (let i =0; i < num;i++) {
    let pos = (new Vec3(Math.random()*20-10,0,Math.random()*20-10));
    while (pos.x*pos.x + pos.z*pos.z > 100) {
      pos = (new Vec3(Math.random()*20-10,0,Math.random()*20-10));
    }
    let pedestrian = new Pedestrian(mesh, pos.add(location));
    console.log(pedestrian.position);
    pedestrian.velocity = direction;
    pedestrian.desiredDir = direction;
    pedestrian.scale = new Vec3(0.3,0.3,0.3);
    Pedestrian.pedestrians.push(pedestrian);

  }

}

WEAVE.init();

// **********************
// Scene
// **********************
let scene = new WEAVE.Scene();
WEAVE.setActiveScene(scene);


// **********************
// Camera
// **********************
let camera = new WEAVE.Camera(WEAVE.Camera.PERSPECTIVE);
camera.position = new Vec3(0,40,0);
WEAVE.setActiveCamera(camera);
camera.controls = new WEAVE.CameraController(camera, canvas );
camera.controls.target = new Vec3(0,0,0);
camera.rotation = new Vec3(0,0,0);
camera.controls.initCamera();
camera.lookAt(new Vec3(0,0,0));
camera.dirty = true;


// **********************
// Lights
// **********************
let sunLight = new WEAVE.DirectionalLight(new Vec3(-1,-1.3,-0.8),new Vec3(1,1,1),0.8);
let ambientLight = new WEAVE.AmbientLight(new Vec3(1,1,1),0.3);
WEAVE.lights.push(sunLight);
WEAVE.lights.push(ambientLight);

// **********************
// Pedestrian Meshes
// **********************

// all pedestrians in one group will share 1 mesh
let mesh_group_1 = new InfectionMesh(positions, normals, uvs);//(await WEAVE.Loader.loadMeshes('pedestrian.obj','pedestrian.mtl'))[0];
mesh_group_1.material = new WEAVE.Material(new Vec3(0,0,1), new Vec3(1,1,1),10);

let mesh_group_2 = new InfectionMesh(positions, normals, uvs);
mesh_group_2.material = new WEAVE.Material(new Vec3(1,0,0), new Vec3(1,1,1),10);

//

create_group(60,mesh_group_1, new Vec3(0,0,1),new Vec3(0,0,-10));

create_group(60,mesh_group_2, new Vec3(0,0,-1),new Vec3(0,0,10));

Pedestrian.pedestrians[0].infectivity = 1;

WEAVE.start();


// **********************
// Debug
// **********************
document.addEventListener("keydown", e => {
    if (e.key === "d") {
      WEAVE.toggleDebugWindow(WEAVE.scene);
    }
  });






