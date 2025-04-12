class Vec3 {

  constructor(x = 0, y = 0, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  // Clone the vector
  clone() {
    return new Vec3(this.x, this.y, this.z);
  }

  // Add another Vec3
  add(v) {
    this.x += v.x;
    this.y += v.y;
    this.z += v.z;
    return this;
  }

  // Subtract another Vec3
  subtract(v) {
    this.x -= v.x;
    this.y -= v.y;
    this.z -= v.z;
    return this;
  }

  // Scale by scalar or multiply by another vec3
  multiply(v) {

    if (v instanceof Vec3) {

      this.x *= v.x;
      this.y *= v.y;
      this.z *= v.z;
      return this;
    }

    this.x *= v;
    this.y *= v;
    this.z *= v;
    return this;
  }

  // Get magnitude
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }

  // Normalize the vector
  normalize() {
    const len = this.length();
    if (len > 0) {
      this.multiply(1 / len);
    }
    return this;
  }

  // Dot product
  dot(v) {
    return this.x * v.x + this.y * v.y + this.z * v.z;
  }

  // Cross product
  cross(v) {
    const x = this.y * v.z - this.z * v.y;
    const y = this.z * v.x - this.x * v.z;
    const z = this.x * v.y - this.y * v.x;
    return new Vec3(x, y, z);
  }

  // Convert to array (for WebGL)
  toArray() {
    return [this.x, this.y, this.z];
  }

  toString() {
    return `[${this.x.toFixed(2)}, ${this.y.toFixed(2)}, ${this.z.toFixed(2)}]`;
  }

}

class Vec4 {

    constructor(x = 0, y = 0, z = 0, w = 1) {
      this.x = x;
      this.y = y;
      this.z = z;
      this.w = w;
    }
  
    // Clone the vector
    clone() {
      return new Vec4(this.x, this.y, this.z, this.w);
    }
  
    // Add another Vec4
    add(v) {
      this.x += v.x;
      this.y += v.y;
      this.z += v.z;
      this.w += v.w;
      return this;
    }
  
    // Subtract another Vec4
    subtract(v) {
      this.x -= v.x;
      this.y -= v.y;
      this.z -= v.z;
      this.w -= v.w;
      return this;
    }
  
    // Multiply by scalar or Vec4 (component-wise)
    multiply(v) {
      if (v instanceof Vec4) {
        this.x *= v.x;
        this.y *= v.y;
        this.z *= v.z;
        this.w *= v.w;
      } else {
        this.x *= v;
        this.y *= v;
        this.z *= v;
        this.w *= v;
      }
      return this;
    }
  
    // Get magnitude (length)
    length() {
      return Math.sqrt(this.x ** 2 + this.y ** 2 + this.z ** 2 + this.w ** 2);
    }
  
    // Normalize vector
    normalize() {
      const len = this.length();
      if (len > 0) {
        this.multiply(1 / len);
      }
      return this;
    }
  
    // Dot product
    dot(v) {
      return this.x * v.x + this.y * v.y + this.z * v.z + this.w * v.w;
    }
  
    // Convert to array (for WebGL)
    toArray() {
      return [this.x, this.y, this.z, this.w];
    }
  
    toString() {
      return `[${this.x.toFixed(2)}, ${this.y.toFixed(2)}, ${this.z.toFixed(2)}, ${this.w.toFixed(2)}]`;
    }
  }

class Mat4 {
    constructor(
        m00 = 1, m01 = 0, m02 = 0, m03 = 0,
        m10 = 0, m11 = 1, m12 = 0, m13 = 0,
        m20 = 0, m21 = 0, m22 = 1, m23 = 0,
        m30 = 0, m31 = 0, m32 = 0, m33 = 1
      ) {
        this.elements = new Float32Array([
          m00, m10, m20, m30,
          m01, m11, m21, m31,
          m02, m12, m22, m32,
          m03, m13, m23, m33
        ]);
    }
  
    static identity() {
        const m = new Mat4();
        const e = m.elements;
        e[0] = 1; e[4] = 0; e[8]  = 0; e[12] = 0;
        e[1] = 0; e[5] = 1; e[9]  = 0; e[13] = 0;
        e[2] = 0; e[6] = 0; e[10] = 1; e[14] = 0;
        e[3] = 0; e[7] = 0; e[11] = 0; e[15] = 1;
        return m;
    }

    static zeros() {
        const m = new Mat4();
        const e = m.elements;
        e[0] = 0; e[4] = 0; e[8]  = 0; e[12] = 0;
        e[1] = 0; e[5] = 0; e[9]  = 0; e[13] = 0;
        e[2] = 0; e[6] = 0; e[10] = 0; e[14] = 0;
        e[3] = 0; e[7] = 0; e[11] = 0; e[15] = 0;
        return m;
    }

    clone() {
        const m = new Mat4();
        m.elements.set(this.elements);
        return m;
    }
  
    // Multiply this matrix by another Mat4 Vec3 or 
    multiply(m) {
        if (m instanceof Vec4) {
            const e = this.elements;
            const x = m.x, y = m.y, z = m.z, w = m.w;
        
            return new Vec4(
              e[0] * x + e[4] * y + e[8]  * z + e[12] * w,
              e[1] * x + e[5] * y + e[9]  * z + e[13] * w,
              e[2] * x + e[6] * y + e[10] * z + e[14] * w,
              e[3] * x + e[7] * y + e[11] * z + e[15] * w
            );
        }else if (m instanceof Vec3) {
            const e = this.elements;
            const x = m.x, y = m.y, z = m.z;

            // Treat Vec3 as a column vector (x, y, z, 1)
            return new Vec3(
                e[0] * x + e[4] * y + e[8]  * z + e[12],
                e[1] * x + e[5] * y + e[9]  * z + e[13],
                e[2] * x + e[6] * y + e[10] * z + e[14]
            );
        } else if (m instanceof Mat4) {
            const a = this.elements;
            const b = m.elements;
            const result = new Float32Array(16);
  
            for (let row = 0; row < 4; ++row) {
                for (let col = 0; col < 4; ++col) {
                    result[col * 4 + row] =
                        a[0 * 4 + row] * b[col * 4 + 0] +
                        a[1 * 4 + row] * b[col * 4 + 1] +
                        a[2 * 4 + row] * b[col * 4 + 2] +
                        a[3 * 4 + row] * b[col * 4 + 3];
                }
            }
  
            this.elements = result;
            return this;
        } else {
            for (let row = 0; row < 4; ++row) {
                for (let col = 0; col < 4; ++col) {
                    this.elements[col * 4 + row] *= m;
                }
            }
  
            return this;
        }
    }
    // Set matrix elements directly
    set(
      m00, m01, m02, m03,
      m10, m11, m12, m13,
      m20, m21, m22, m23,
      m30, m31, m32, m33
    ) {
      const e = this.elements;
      e[0] = m00; e[4] = m01; e[8] = m02;  e[12] = m03;
      e[1] = m10; e[5] = m11; e[9] = m12;  e[13] = m13;
      e[2] = m20; e[6] = m21; e[10] = m22; e[14] = m23;
      e[3] = m30; e[7] = m31; e[11] = m32; e[15] = m33;
      return this;
    }
  
    // Export for WebGL
    toArray() {
      return this.elements;
    }

    toString() {
        const e = this.elements;
        return (
          `[ ${e[0].toFixed(2)}  ${e[4].toFixed(2)}  ${e[8].toFixed(2)}  ${e[12].toFixed(2)} ]\n` +
          `[ ${e[1].toFixed(2)}  ${e[5].toFixed(2)}  ${e[9].toFixed(2)}  ${e[13].toFixed(2)} ]\n` +
          `[ ${e[2].toFixed(2)}  ${e[6].toFixed(2)}  ${e[10].toFixed(2)} ${e[14].toFixed(2)} ]\n` +
          `[ ${e[3].toFixed(2)}  ${e[7].toFixed(2)}  ${e[11].toFixed(2)} ${e[15].toFixed(2)} ]`
        );
      }

    translate(v) {
        const t = Mat4.identity();
        t.elements[12] = v.x;
        t.elements[13] = v.y;
        t.elements[14] = v.z;
        return this.multiply(t);
    }
      
    scale(v) {
        const s = Mat4.identity();
        s.elements[0] = v.x;
        s.elements[5] = v.y;
        s.elements[10] = v.z;
        return this.multiply(s);
    }
      
    rotate(v) {
        const rx = Mat4.identity();
        const ry = Mat4.identity();
        const rz = Mat4.identity();
      
        const cx = Math.cos(v.x), sx = Math.sin(v.x);
        const cy = Math.cos(v.y), sy = Math.sin(v.y);
        const cz = Math.cos(v.z), sz = Math.sin(v.z);
      
        // Rotation about X-axis in column-major order:
        rx.elements[5] = cx;       // row 1, col 1
        rx.elements[6] = sx;       // row 2, col 1 (should be positive)
        rx.elements[9] = -sx;      // row 1, col 2 (should be negative)
        rx.elements[10] = cx;      // row 2, col 2
      
        // Rotation about Y-axis:
        ry.elements[0] = cy;       // row 0, col 0
        ry.elements[2] = -sy;      // row 2, col 0 (should be negative)
        ry.elements[8] = sy;       // row 0, col 2 (should be positive)
        ry.elements[10] = cy;      // row 2, col 2
      
        // Rotation about Z-axis:
        rz.elements[0] = cz;       // row 0, col 0
        rz.elements[1] = sz;       // row 1, col 0 (should be positive)
        rz.elements[4] = -sz;      // row 0, col 1 (should be negative)
        rz.elements[5] = cz;       // row 1, col 1
      
        // Combine them in your desired order (check which order produces the desired Euler angles)
        return this.multiply(rz).multiply(ry).multiply(rx);
      }

  }

class Transform {
    constructor(position, rotation, scale) {
      this.position = position ? position : new Vec3();
      this.rotation = rotation ? rotation : new Vec3();
      this.scale = scale ? scale : new Vec3(1, 1, 1);

      // this is used to calculate objectToWorldMatrix
      this.objectToParentMatrix = new Mat4();

      // this is used by the rendering pipeline
      this.objectToWorldMatrix = new Mat4();

    }
  
    updateObjectToParentMatrix() {
      const t = Mat4.identity()
        .translate(this.position)
        .rotate(this.rotation)
        .scale(this.scale);
  
      this.objectToParentMatrix = t;
    }

  }

class GameObject {
    constructor(position, rotation, scale) {
      this.transform = new Transform(position, rotation, scale);

      this.children = [];
      this.parent = null;
      this.mesh = null;
      this.visible = true;

      this.updateWorldMatrix();
    }
  
    add(child) {
      child.parent = this;
      this.children.push(child);
      this.updateWorldMatrix();
    }

    setMesh(mesh) {
      this.mesh = mesh;
    }
  
    traverse(callback) {
      callback(this);
      for (const child of this.children) {
        child.traverse(callback);
      }
    }

    // when this object is moved update its underlying Object Space To World Space matrix
    // this should be called whenever transform is updated
    updateWorldMatrix(updateObjectToParentMatrix = true) {
      let parentMatrix = null;
      if (this.parent != null) {
          parentMatrix = this.parent.transform.objectToWorldMatrix;
      }
      if (updateObjectToParentMatrix) {
        this.transform.updateObjectToParentMatrix();
      }
    
      if (parentMatrix) {
        this.transform.objectToWorldMatrix = parentMatrix.clone()
          .multiply(this.transform.objectToParentMatrix);
      } else {
        this.transform.objectToWorldMatrix = this.transform.objectToParentMatrix.clone();
      }

      for (const child of this.children) {
        child.updateWorldMatrix(false);
      }


    }

    getWorldMatrix() {
      return this.transform.objectToWorldMatrix;
    }
  }

class Mesh {
    constructor(gl, positions, indices = null) {
        
        console.log(gl);
        
        this.gl = gl;
        this.vertexCount = indices ? indices.length : positions.length / 3;
        this.useIndices = !!indices;
    
        // Create and bind VAO
        this.vao = gl.createVertexArray();
        gl.bindVertexArray(this.vao);
    
        // Position buffer
        this.positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
    
        const program = gl.getParameter(gl.CURRENT_PROGRAM);
        const aPosition = gl.getAttribLocation(program, 'aPosition');
        gl.enableVertexAttribArray(aPosition);
        gl.vertexAttribPointer(aPosition, 3, gl.FLOAT, false, 0, 0);
    
        // Index buffer (optional)
        if (this.useIndices) {
          this.indexBuffer = gl.createBuffer();
          gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
          gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
        }
    
        // Clean up
        gl.bindVertexArray(null);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        if (this.useIndices) gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
    }
  
    draw() {
      const gl = this.gl;
      gl.bindVertexArray(this.vao);
      if (this.useIndices) {
        gl.drawElements(gl.TRIANGLES, this.vertexCount, gl.UNSIGNED_SHORT, 0);
      } else {
        gl.drawArrays(gl.TRIANGLES, 0, this.vertexCount);
      }
      gl.bindVertexArray(null);
    }
  }

class GraphicsContext {
    static gl = null;
  
    static setGL(context) {
      this.gl = context;
    }
  
    static getGL() {
      if (!this.gl) throw new Error("GL context not initialized.");
      return this.gl;
    }
  }

class Box extends GameObject {
    
    constructor() {
        const positions = [
            // Front face
            -1, -1,  1,
             1, -1,  1,
             1,  1,  1,
            -1,  1,  1,
            // Back face
            -1, -1, -1,
             1, -1, -1,
             1,  1, -1,
            -1,  1, -1,
          ];
          
          const indices = [
            // Front
            0, 1, 2, 2, 3, 0,
            // Back
            4, 5, 6, 6, 7, 4,
            // Left
            4, 0, 3, 3, 7, 4,
            // Right
            1, 5, 6, 6, 2, 1,
            // Top
            3, 2, 6, 6, 7, 3,
            // Bottom
            4, 5, 1, 1, 0, 4,
          ];
          
        const mesh = new Mesh(GraphicsContext.gl, positions, indices);
        super();
        super.setMesh(mesh);

    }
}

class Camera extends GameObject{
    static ORTHOGRAPHIC = 0;
    static PERSPECTIVE = 1;
    constructor(cameraType = Camera.PERSPECTIVE, position = new Vec3(5, 5, 5), target = new Vec3(0, 0, 0), fov = Math.PI / 4, near = 0.1, far = 100) {

        super(position);
        this.cameraType = cameraType;
        this.lookAt(target);
        this.updateProjectionMatrix(fov, window.innerWidth / window.innerHeight, near, far);
    }

    updateWorldMatrix(updateObjectToParentMatrix = true) {
        super.updateWorldMatrix(updateObjectToParentMatrix);
        this.updateViewMatrix();
    }

    updateProjectionMatrix(fov, aspect, near, far) {
        if (this.cameraType = Camera.ORTHOGRAPHIC) {
            const top = Math.tan(fov / 2) * near;
            const bottom = -top;
            const right = top * aspect;
            const left = -right;

            const lr = 1 / (left - right);
            const bt = 1 / (bottom - top);
            const nf = 1 / (near - far);

            const m = new Mat4();
            m.elements = [
                -2 * lr,     0,         0,              0,
                 0,        -2 * bt,     0,              0,
                 0,         0,        2 * nf,           0,
                (left + right) * lr, (top + bottom) * bt, (far + near) * nf, 1
            ];
            this.projection = m;
        } else {
            const f = 1.0 / Math.tan(fov / 2);
            const rangeInv = 1.0 / (near - far);

            const m = new Mat4();
            m.elements = [
                f / aspect, 0, 0, 0,
                0, f, 0, 0,
                0, 0, (near + far) * rangeInv, -1,
                0, 0, near * far * rangeInv * 2, 0
            ];
            this.projectionMatrix = m;
        }
    }

    updateViewMatrix() {
        const { position, rotation } = this.transform;
      
        // Create forward vector from yaw (y), pitch (x), roll (z)
        const cosPitch = Math.cos(rotation.x);
        const sinPitch = Math.sin(rotation.x);
        const cosYaw = Math.cos(rotation.y);
        const sinYaw = Math.sin(rotation.y);
      
        const forward = new Vec3(
          sinYaw * cosPitch,
          sinPitch,
          -cosYaw * cosPitch
        ).normalize();
      
        // Right vector (camera's local X axis)
        const right = new Vec3(
          Math.cos(rotation.y),
          0,
          Math.sin(rotation.y)
        ).normalize();
      
        // Up vector (default up rotated around forward by roll)
        const defaultUp = new Vec3(0, 1, 0);
        const roll = rotation.z;
        const up = this.rotateVectorAroundAxis(defaultUp, forward, roll);
      
        // Build a view matrix manually from basis vectors and position
        const fx = forward.x, fy = forward.y, fz = forward.z;
        const rx = right.x, ry = right.y, rz = right.z;
        const ux = up.x,    uy = up.y,    uz = up.z;
        position.x; position.y; position.z;
      
        const m = new Mat4();
        m.elements = [
           rx,  ux,  fx, 0,
           ry,  uy,  fy, 0,
           rz,  uz,  fz, 0,
          -right.dot(position), -up.dot(position), -forward.dot(position), 1
        ];
      
        this.viewMatrix = m;
      }
  
    rotateVectorAroundAxis(v, axis, angle) {
        const cosA = Math.cos(angle);
        const sinA = Math.sin(angle);
  
        const term1 = v.multiply(cosA);
        const term2 = axis.cross(v).multiply(sinA);
        const term3 = axis.multiply(axis.dot(v) * (1 - cosA));
    
        return term1.add(term2).add(term3);
    }

    lookAt(target) {
        const forward = target.subtract(this.transform.position).normalize();

        // Get yaw and pitch from the direction vector
        const yaw = Math.atan2(forward.x, -forward.z); // Y rotation (around up)
        const pitch = Math.asin(forward.y);            // X rotation (up/down)

        this.transform.rotation.y = yaw;
        this.transform.rotation.x = pitch;

        this.updateViewMatrix();
    }
}

class Scene extends GameObject {
    
    constructor() {
        super();
    }
}

const WEAVE = { 
    GameObject, Box, Mesh, Camera, Scene,
    gl: null,
    canvas: null,
    program: null,
    scene: null,
    renderer: null,
    uniforms: {},


    createShader : function(type, source) {
        const shader = this.gl.createShader(type);
        this.gl.shaderSource(shader, source);
        this.gl.compileShader(shader);
        if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
          console.error("Shader compile error:", this.gl.getShaderInfoLog(shader));
          this.gl.deleteShader(shader);
          return null;
        }
        return shader;
    },
      
    createProgram : function(vertSrc, fragSrc) {
        const vert = this.createShader(this.gl.VERTEX_SHADER, vertSrc);
        const frag = this.createShader(this.gl.FRAGMENT_SHADER, fragSrc);
        const program = this.gl.createProgram();
        this.gl.attachShader(program, vert);
        this.gl.attachShader(program, frag);
        this.gl.linkProgram(program);
        if (!this.gl.getProgramParameter(program, this.gl.LINK_STATUS)) {
          console.error("Program link error:", this.gl.getProgramInfoLog(program));
          return null;
        }
        return program;
    }, 
    init: async function(canvasSelector = "canvas") {

        this.canvas = document.querySelector(canvasSelector);
        this.gl = this.canvas.getContext("webgl2");
        // objects within this library will use this to avoid circular dependancies
        GraphicsContext.gl = this.gl;
        if (!this.gl) {
          console.error("WebGL not supported");
          return;
        }
    
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.clearColor(0.1, 1, 0.1, 1.0);
    
        const vertexShaderSrc = `
            attribute vec3 aPosition;
            uniform mat4 uModelViewProjection;

            void main() {
                gl_Position = uModelViewProjection * vec4(aPosition, 1.0);
            }
        `;

        const fragmentShaderSrc = `
            precision mediump float;

            void main() {
                gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0); // Solid white
            }
`       ;

        this.program = this.createProgram(vertexShaderSrc, fragmentShaderSrc);
        this.gl.useProgram(this.program);
    

        this.uniforms.uModelViewProjection = this.gl.getUniformLocation(this.program, "uModelViewProjection");
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        console.log("init complete.");
    },

    render: function() {

        const gl = this.gl;
    
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    
        const viewProj = this.camera.projectionMatrix.multiply(this.camera.viewMatrix);
    
        this.scene.traverse(obj => {
            if (!obj.visible || !obj.mesh) return;
    
            const mvp = viewProj.multiply(obj.getWorldMatrix());
    
            const uMVP = gl.getUniformLocation(this.program, "uModelViewProjection");
            gl.uniformMatrix4fv(uMVP, false, mvp.elements);
    
            obj.mesh.draw();
        });
    },

    setActiveScene(scene) {
        this.scene = scene;
    },
    setActiveCamera(camera) {
        this.camera = camera;
    }
};

export { Mat4, Vec3, Vec4, WEAVE };
//# sourceMappingURL=weave-3d.esm.js.map
