import { Vec3, Vec4, Mat4 , WEAVE} from './lib/weave-3d.esm.js'; 

const t = 0.5;
const A = 20;
const B = 0.5;

export class Pedestrian extends WEAVE.GameObject{

    static pedestrians = [];


    constructor(meshes, position, rotation = new Vec3(0,0,0), scale = new Vec3(1,1,1)) {
        super (position, rotation, scale);
        this.desiredSpeed = 1;
        meshes.forEach((mesh,i) => {
    
            const child = new WEAVE.GameObject();
            child.name = mesh.name || `submesh_${i}`;
            child.setMesh(mesh);
            this.add(child);
        });
        
    }
    update(dt) {
        const v0 = this.desiredDir.multiply(this.desiredSpeed);
        const f_driving = v0
          .subtract(this.velocity)
          .multiply(1/t);

        if (Number.isNaN(this.position.x)) this.stopped = true;

        let f_inter = new Vec3(0, 0, 0);
        Pedestrian.pedestrians.forEach((j)=> {

            if (j != this) {
                const r_ij   = this.position.subtract(j.position);  
                const y_ji   = j.velocity.subtract(this.velocity).multiply(dt);
                const r_ij_length = r_ij.length();
                const r_minus_y_length = r_ij.subtract(y_ji).length();
                const b_ij = 0.5 * Math.sqrt((r_ij_length+r_minus_y_length)*(r_ij_length+r_minus_y_length) - y_ji.lengthSq());
                let f_ij = A 
                * Math.exp(-b_ij / B) 
                * ((r_ij_length + r_minus_y_length) / (2 * b_ij));
                let right_hand_term = r_ij.multiply(1/r_ij_length).add(r_ij.subtract(y_ji).multiply(1/r_minus_y_length));
            
        
                f_inter = f_inter.add(right_hand_term.multiply(f_ij));
            }
        });
            
        //   const r_ij   = this.position.subtract(j.position);  
        //   const y_ji   = j.velocity.subtract(this.velocity).multiply(dt);
        //   const r_ij_length = r_ij.length();
        //   const r_minus_y_length = r_ij.subtract(y_ji).length();
        //   const b_ij = 0.5 * Math.sqrt((r_ij_length-r_minus_y_length)*(r_ij_length-r_minus_y_length) - y_ji.lengthSq());
    
        //   let f_ij = A 
        //     * Math.exp(-b_ij / B) 
        //     * ((r_ij_length + r_minus_y_length) / (2 * b_ij));
    
        //   let right_hand_term = r_ij.multiply(1/r_ij_length).add(r_ij.subtract(y_ji).multiply(1/r_minus_y_length));

          
    
        //   f_inter = f_inter.add(right_hand_term.multiply(f_ij));
        
    
        const f_total = f_driving.add(f_inter);
        this.velocity = this.velocity.add(f_total.multiply(dt));
        this.position = this.position.add(this.velocity.multiply(dt));
        this.dirty    = true;
      }
    
}
