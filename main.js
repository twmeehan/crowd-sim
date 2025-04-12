import { Vec3, Vec4, Mat4 , WEAVE} from './lib/weave-3d.esm.js'; 

let box = new WEAVE.GameObject(new Vec3(1,1,1));
let sphere = new WEAVE.GameObject(new Vec3(0,1,0));
box.add(sphere);
box.transform.rotation.y += Math.PI/3;
box.updateWorldMatrix();


let cube = new WEAVE.GameObject(new Vec3(10,0,0),new Vec3(Math.PI/4,0,0),new Vec3(2,2,2));
cube.add(box);


cube.updateWorldMatrix();

console.log(sphere.getWorldMatrix().toString());
