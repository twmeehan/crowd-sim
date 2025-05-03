import { Vec3, Vec4, Mat4 , WEAVE} from './lib/weave-3d.esm.js'; 

const infected_mat = new WEAVE.Material(new Vec3(0,1,0), new Vec3(1,1,1),10);
export class InfectionMesh extends WEAVE.Mesh {

    constructor(positions, normals, uvs = []) {
        super(positions, normals, uvs);
        this.infected = false;
    }

    draw() {
        

        if (this.infected) {
            let mat = this.material;
            this.material = infected_mat;
            super.draw();
            this.material = mat;   
        } else {
            super.draw();
        }
    }
    
    
}
