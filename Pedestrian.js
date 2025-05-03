import { Vec3, Vec4, Mat4 , WEAVE} from './lib/weave-3d.esm.js'; 

const t = 0.5;
const A = 20;
const B = 0.5;
const a = 0.0;
const infectivity_range = 1;
const y = -0.5;
const u = 0.1;

export class Pedestrian extends WEAVE.GameObject{

    static pedestrians = [];


    constructor(mesh, position, rotation = new Vec3(0,0,0), scale = new Vec3(1,1,1)) {
        super (position, rotation, scale);
        this.desiredSpeed = 1;
        this.infectivity = 0;
        this.immunity = 1;
        this.name = mesh.name;
        this.setMesh(mesh);
        
    }
    update(dt) {
        const v0 = this.desiredDir.multiply(this.desiredSpeed);
        const f_driving = v0
          .subtract(this.velocity)
          .multiply(1/t);

        if (Number.isNaN(this.position.x)) this.stopped = true;

        let f_inter = new Vec3(0, 0, 0);

        let beta = 0;
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

                if (r_ij_length < infectivity_range) {
                    beta += Math.exp(-r_ij_length/infectivity_range) * Math.max(j.infectivity-this.infectivity,0)/ (r_ij_length*r_ij_length);
                }

            }
        });
        const B_i = this.infectivity;
        const a_i = this.immunity;
        console.log(beta + " + "+(B_i*(1-B_i))+" - "+a*B_i*B_i*a_i/(1+B_i*B_i) + "      =     "+ (beta+(B_i*(2-B_i))-a*B_i*B_i*a_i/(1+B_i*B_i))*dt);
        this.infectivity += (beta+(B_i*(1-B_i))-a*B_i*B_i*a_i/(1+B_i*B_i))*dt;
        this.immunity += (y*B_i*B_i/(1+B_i*B_i)*this.immunity+u*this.immunity)*dt;
        if (this.immunity>1) this.immunity = 1;
        console.log(this.immunity);
        if (this.infectivity > 1) this.infectivity = 1;
        const f_total = f_driving.add(f_inter);
        this.velocity = this.velocity.add(f_total.multiply(dt));
        this.position = this.position.add(this.velocity.multiply(dt));
        this.dirty    = true;
    }

    draw() {
        this.mesh.infected = (this.infectivity > 0.2); 
        super.draw();
    }
    
}
