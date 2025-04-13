class Vec3 {
  constructor(x = 0, y = 0, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  static zeros() {
    return new Vec3();
  }
  // Returns a new Vec3 with the same components.
  clone() {
    return new Vec3(this.x, this.y, this.z);
  }

  // Returns a new Vec3 that is the sum of this and v.
  add(v) {
    return new Vec3(this.x + v.x, this.y + v.y, this.z + v.z);
  }

  // Returns a new Vec3 that is the difference of this and v.
  subtract(v) {
    return new Vec3(this.x - v.x, this.y - v.y, this.z - v.z);
  }

  // If v is a Vec3, returns a new Vec3 that is the component-wise multiplication.
  // Otherwise, multiplies each component by the scalar v.
  multiply(v) {
    if (v instanceof Vec3) {
      return new Vec3(this.x * v.x, this.y * v.y, this.z * v.z);
    }
    return new Vec3(this.x * v, this.y * v, this.z * v);
  }

  // Returns the length (magnitude) of the vector.
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }

  // Returns a new Vec3 that is the normalized (unit length) version of this vector.
  normalize() {
    const len = this.length();
    // Avoid division by zero.
    return len > 0 ? this.multiply(1 / len) : this.clone();
  }

  // Returns the dot product of this vector and vector v.
  dot(v) {
    return this.x * v.x + this.y * v.y + this.z * v.z;
  }

  // Returns a new Vec3 that is the cross product of this vector and v.
  cross(v) {
    const x = this.y * v.z - this.z * v.y;
    const y = this.z * v.x - this.x * v.z;
    const z = this.x * v.y - this.y * v.x;
    return new Vec3(x, y, z);
  }

  // Converts this vector into a standard JavaScript array.
  toArray() {
    return [this.x, this.y, this.z];
  }

  // Returns a formatted string for debugging.
  toString() {
    return `[${this.x.toFixed(2)}, ${this.y.toFixed(2)}, ${this.z.toFixed(2)}]`;
  }

  negate() {
    return this.multiply(-1);

  }
}

class Vec4 {
  constructor(x = 0, y = 0, z = 0, w = 1) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
  }

  // Returns a new Vec4 with the same components.
  clone() {
    return new Vec4(this.x, this.y, this.z, this.w);
  }

  // Returns a new Vec4 that is the sum of this and v.
  add(v) {
    return new Vec4(this.x + v.x, this.y + v.y, this.z + v.z, this.w + v.w);
  }

  // Returns a new Vec4 that is the difference of this and v.
  subtract(v) {
    return new Vec4(this.x - v.x, this.y - v.y, this.z - v.z, this.w - v.w);
  }

  // If v is a Vec4, returns a new Vec4 with component-wise multiplication.
  // Otherwise, multiplies each component by the scalar v.
  multiply(v) {
    if (v instanceof Vec4) {
      return new Vec4(this.x * v.x, this.y * v.y, this.z * v.z, this.w * v.w);
    }
    return new Vec4(this.x * v, this.y * v, this.z * v, this.w * v);
  }

  // Returns the length (magnitude) of the vector.
  length() {
    return Math.sqrt(this.x ** 2 + this.y ** 2 + this.z ** 2 + this.w ** 2);
  }

  // Returns a new Vec4 that is a normalized version of this vector.
  normalize() {
    const len = this.length();
    return len > 0 ? this.multiply(1 / len) : this.clone();
  }

  // Returns the dot product of this vector and another Vec4 v.
  dot(v) {
    return this.x * v.x + this.y * v.y + this.z * v.z + this.w * v.w;
  }

  // Converts the vector to a standard JavaScript array.
  toArray() {
    return [this.x, this.y, this.z, this.w];
  }

  // Returns a formatted string representation of this vector.
  toString() {
    return `[${this.x.toFixed(2)}, ${this.y.toFixed(2)}, ${this.z.toFixed(2)}, ${this.w.toFixed(2)}]`;
  }
  negate() {
    return this.multiply(-1);
  }
}

class Mat4 {
  constructor(...args) {
    // If a single array-like argument is given, use it as the element array (assumed row-major).
    if (args.length === 1 && (Array.isArray(args[0]) || args[0] instanceof Float32Array)) {
      this.elements = new Float32Array(args[0]);
    } else {
      // Otherwise, use the individual arguments (defaulting to the identity matrix).
      // Now arranged in row-major order:
      this.elements = new Float32Array([
        args[0] !== undefined ? args[0] : 1, args[1] !== undefined ? args[1] : 0, args[2] !== undefined ? args[2] : 0, args[3] !== undefined ? args[3] : 0,
        args[4] !== undefined ? args[4] : 0, args[5] !== undefined ? args[5] : 1, args[6] !== undefined ? args[6] : 0, args[7] !== undefined ? args[7] : 0,
        args[8] !== undefined ? args[8] : 0, args[9] !== undefined ? args[9] : 0, args[10] !== undefined ? args[10] : 1, args[11] !== undefined ? args[11] : 0,
        args[12] !== undefined ? args[12] : 0, args[13] !== undefined ? args[13] : 0, args[14] !== undefined ? args[14] : 0, args[15] !== undefined ? args[15] : 1
      ]);
    }
  }

  static fromArray(arr) {
    return new Mat4(arr);
  }

  static identity() {
    return new Mat4([
      1, 0, 0, 0,  // row 0
      0, 1, 0, 0,  // row 1
      0, 0, 1, 0,  // row 2
      0, 0, 0, 1   // row 3
    ]);
  }

  static zeros() {
    return new Mat4(new Array(16).fill(0));
  }

  clone() {
    return Mat4.fromArray(this.elements);
  }

  // Multiply this matrix by another (immutable, returns a new Mat4)
  multiply(m) {
    if (m instanceof Vec4) {
      // For row-major ordering, treating Vec4 as a column vector:
      // result_i = sum_{j} this[i*4+j] * m_component_j.
      const e = this.elements;
      return new Vec4(
        e[0] * m.x + e[1] * m.y + e[2] * m.z + e[3] * m.w,
        e[4] * m.x + e[5] * m.y + e[6] * m.z + e[7] * m.w,
        e[8] * m.x + e[9] * m.y + e[10] * m.z + e[11] * m.w,
        e[12] * m.x + e[13] * m.y + e[14] * m.z + e[15] * m.w
      );
    } else if (m instanceof Vec3) {
        const e = this.elements;
        // Compute the four components, with an implicit w = 1 for the input.
        const x = e[0] * m.x + e[1] * m.y + e[2] * m.z + e[3];
        const y = e[4] * m.x + e[5] * m.y + e[6] * m.z + e[7];
        const z = e[8] * m.x + e[9] * m.y + e[10] * m.z + e[11];
        e[12] * m.x + e[13] * m.y + e[14] * m.z + e[15];
        
        return new Vec3(x, y, z);
      } else if (m instanceof Mat4) {
      const a = this.elements;
      const b = m.elements;
      const result = new Float32Array(16);
      // Row-major multiplication:
      // result[i*4+j] = sum_{k=0}^{3} a[i*4+k] * b[k*4+j]
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
          let sum = 0;
          for (let k = 0; k < 4; k++) {
            sum += a[i*4 + k] * b[k*4 + j];
          }
          result[i*4 + j] = sum;
        }
      }
      return new Mat4(result);
    } else {
      // Assume m is a scalar
      const result = new Float32Array(16);
      for (let i = 0; i < 16; i++) {
        result[i] = this.elements[i] * m;
      }
      return new Mat4(result);
    }
  }

  // Instead of modifying this, returns a new matrix with given elements (row-major)
  set(m00, m01, m02, m03,
      m10, m11, m12, m13,
      m20, m21, m22, m23,
      m30, m31, m32, m33) {
    return new Mat4([
      m00, m01, m02, m03,
      m10, m11, m12, m13,
      m20, m21, m22, m23,
      m30, m31, m32, m33
    ]);
  }

  // Return the underlying array.
  toArray() {
    return this.elements;
  }

  // Return a string representation in row-major order.
  toString() {
    const e = this.elements;
    return (
      `[ ${e[0].toFixed(2)}  ${e[1].toFixed(2)}  ${e[2].toFixed(2)}  ${e[3].toFixed(2)} ]\n` +
      `[ ${e[4].toFixed(2)}  ${e[5].toFixed(2)}  ${e[6].toFixed(2)}  ${e[7].toFixed(2)} ]\n` +
      `[ ${e[8].toFixed(2)}  ${e[9].toFixed(2)}  ${e[10].toFixed(2)}  ${e[11].toFixed(2)} ]\n` +
      `[ ${e[12].toFixed(2)}  ${e[13].toFixed(2)}  ${e[14].toFixed(2)}  ${e[15].toFixed(2)} ]`
    );
  }

  // Create a row-major translation matrix and multiply it with this matrix.
  translate(v) {
    // Row-major translation matrix:
    // Row0: [1, 0, 0, tx]
    // Row1: [0, 1, 0, ty]
    // Row2: [0, 0, 1, tz]
    // Row3: [0, 0, 0, 1 ]
    const t = Mat4.identity();
    t.elements[3] = v.x;
    t.elements[7] = v.y;
    t.elements[11] = v.z;
    return this.multiply(t);
  }

  // Create a row-major scale matrix and multiply.
  scale(v) {
    // Row-major scale matrix:
    // Row0: [sx, 0,  0,  0]
    // Row1: [0,  sy, 0,  0]
    // Row2: [0,  0,  sz, 0]
    // Row3: [0,  0,  0,  1]
    const s = Mat4.identity();
    s.elements[0] = v.x;
    s.elements[5] = v.y;
    s.elements[10] = v.z;
    return this.multiply(s);
  }

rotate(r) {
    const { x, y, z } = r; // x = pitch, y = yaw, z = roll
  
    const cx = Math.cos(x), sx = Math.sin(x);
    const cy = Math.cos(y), sy = Math.sin(y);
    const cz = Math.cos(z), sz = Math.sin(z);
  
    // Combined Y * X * Z rotation matrix (row-major)
    const m00 = cy * cz + sy * sx * sz;
    const m01 = -cy * sz + sy * sx * cz;
    const m02 = sy * cx;
  
    const m10 = cx * sz;
    const m11 = cx * cz;
    const m12 = -sx;
  
    const m20 = -sy * cz + cy * sx * sz;
    const m21 = sy * sz + cy * sx * cz;
    const m22 = cy * cx;
  
    return this.multiply(new Mat4(
        m00, m01, m02, 0,
        m10, m11, m12, 0,
        m20, m21, m22, 0,
        0,    0,   0,  1
      ));  }

  transpose() {
    const e = this.elements;
    const t = new Float32Array(16);
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        t[i * 4 + j] = e[j * 4 + i];
      }
    }
    return new Mat4(t);
  }

  negate() {
    return this.multiply(-1);
  }

  inverse() {
    const m = this.elements;
    const inv = new Float32Array(16);
  
    inv[0]  = m[5]  * m[10] * m[15] -
              m[5]  * m[11] * m[14] -
              m[9]  * m[6]  * m[15] +
              m[9]  * m[7]  * m[14] +
              m[13] * m[6]  * m[11] -
              m[13] * m[7]  * m[10];
  
    inv[1]  = -m[1]  * m[10] * m[15] +
              m[1]  * m[11] * m[14] +
              m[9]  * m[2]  * m[15] -
              m[9]  * m[3]  * m[14] -
              m[13] * m[2]  * m[11] +
              m[13] * m[3]  * m[10];
  
    inv[2]  = m[1]  * m[6] * m[15] -
              m[1]  * m[7] * m[14] -
              m[5]  * m[2] * m[15] +
              m[5]  * m[3] * m[14] +
              m[13] * m[2] * m[7] -
              m[13] * m[3] * m[6];
  
    inv[3]  = -m[1]  * m[6] * m[11] +
              m[1]  * m[7] * m[10] +
              m[5]  * m[2] * m[11] -
              m[5]  * m[3] * m[10] -
              m[9]  * m[2] * m[7] +
              m[9]  * m[3] * m[6];
  
    inv[4]  = -m[4]  * m[10] * m[15] +
              m[4]  * m[11] * m[14] +
              m[8]  * m[6]  * m[15] -
              m[8]  * m[7]  * m[14] -
              m[12] * m[6]  * m[11] +
              m[12] * m[7]  * m[10];
  
    inv[5]  = m[0]  * m[10] * m[15] -
              m[0]  * m[11] * m[14] -
              m[8]  * m[2]  * m[15] +
              m[8]  * m[3]  * m[14] +
              m[12] * m[2]  * m[11] -
              m[12] * m[3]  * m[10];
  
    inv[6]  = -m[0]  * m[6] * m[15] +
              m[0]  * m[7] * m[14] +
              m[4]  * m[2] * m[15] -
              m[4]  * m[3] * m[14] -
              m[12] * m[2] * m[7] +
              m[12] * m[3] * m[6];
  
    inv[7]  = m[0]  * m[6] * m[11] -
              m[0]  * m[7] * m[10] -
              m[4]  * m[2] * m[11] +
              m[4]  * m[3] * m[10] +
              m[8]  * m[2] * m[7] -
              m[8]  * m[3] * m[6];
  
    inv[8]  = m[4]  * m[9] * m[15] -
              m[4]  * m[11] * m[13] -
              m[8]  * m[5] * m[15] +
              m[8]  * m[7] * m[13] +
              m[12] * m[5] * m[11] -
              m[12] * m[7] * m[9];
  
    inv[9]  = -m[0]  * m[9] * m[15] +
              m[0]  * m[11] * m[13] +
              m[8]  * m[1] * m[15] -
              m[8]  * m[3] * m[13] -
              m[12] * m[1] * m[11] +
              m[12] * m[3] * m[9];
  
    inv[10] = m[0]  * m[5] * m[15] -
              m[0]  * m[7] * m[13] -
              m[4]  * m[1] * m[15] +
              m[4]  * m[3] * m[13] +
              m[12] * m[1] * m[7] -
              m[12] * m[3] * m[5];
  
    inv[11] = -m[0]  * m[5] * m[11] +
              m[0]  * m[7] * m[9] +
              m[4]  * m[1] * m[11] -
              m[4]  * m[3] * m[9] -
              m[8]  * m[1] * m[7] +
              m[8]  * m[3] * m[5];
  
    inv[12] = -m[4]  * m[9] * m[14] +
              m[4]  * m[10] * m[13] +
              m[8]  * m[5] * m[14] -
              m[8]  * m[6] * m[13] -
              m[12] * m[5] * m[10] +
              m[12] * m[6] * m[9];
  
    inv[13] = m[0]  * m[9] * m[14] -
              m[0]  * m[10] * m[13] -
              m[8]  * m[1] * m[14] +
              m[8]  * m[2] * m[13] +
              m[12] * m[1] * m[10] -
              m[12] * m[2] * m[9];
  
    inv[14] = -m[0]  * m[5] * m[14] +
              m[0]  * m[6] * m[13] +
              m[4]  * m[1] * m[14] -
              m[4]  * m[2] * m[13] -
              m[12] * m[1] * m[6] +
              m[12] * m[2] * m[5];
  
    inv[15] = m[0]  * m[5] * m[10] -
              m[0]  * m[6] * m[9] -
              m[4]  * m[1] * m[10] +
              m[4]  * m[2] * m[9] +
              m[8]  * m[1] * m[6] -
              m[8]  * m[2] * m[5];
  
    let det = m[0] * inv[0] + m[1] * inv[4] + m[2] * inv[8] + m[3] * inv[12];
  
    if (det === 0) {
      console.error("Matrix inversion error: determinant is 0");
      return Mat4.identity();
    }
  
    det = 1.0 / det;
    for (let i = 0; i < 16; i++) {
      inv[i] = inv[i] * det;
    }
  
    return new Mat4(inv);
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

      this.name = "Game Object";
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

    getGlobalPosition() {
      return this.transform.objectToWorldMatrix.multiply(new Vec3(0, 0, 0));
    }

    getGlobalRotation() {
      return this.parent != null ? this.parent.getGlobalRotation().add(this.transform.rotation) : this.transform.rotation;
    }

    getGlobalScale() {
      return this.parent  != null ? this.parent.getGlobalScale().add(this.transform.scale) : this.transform.scale;
    }

    toString() {
      return this.name;
    }
  }

class Mesh {
    constructor(gl, positions, indices = null) {
                
        this.gl = gl;
        this.vertexCount = indices ? indices.length : positions.length / 3;
        this.useIndices = !!indices;
        this.color = null;
    
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
      const program = gl.getParameter(gl.CURRENT_PROGRAM);
      const uColor = gl.getUniformLocation(program, "uColor");
      gl.uniform4fv(uColor, this.color ? this.color.toArray() : [1,1,1,1]);

      // Bind the VAO that already has position/color/index data
      gl.bindVertexArray(this.vao);
    
      // Choose the right draw call based on whether we're using indices
      if (this.useIndices) {
        gl.drawElements(gl.TRIANGLES, this.vertexCount, gl.UNSIGNED_SHORT, 0);
      } else {
        gl.drawArrays(gl.TRIANGLES, 0, this.vertexCount);
      }
    
      // Clean up (optional)
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
        this.name = "Box";
        super.setMesh(mesh);

    }
}

class Camera extends GameObject {
  static ORTHOGRAPHIC = 0;
  static PERSPECTIVE = 1;
  
  constructor(
    cameraType = Camera.PERSPECTIVE, 
    position = new Vec3(5, 5, 5), 
    target = new Vec3(0, 0, 0), 
    fov = Math.PI / 4, 
    near = 0.1, 
    far = 100
  ) {
    super(position);
    this.cameraType = cameraType;
    this.viewMatrix = null;
    this.projectionMatrix = null;
    // Store the look-at target in case you want to update the view later.
    this.lookAtTarget = target.clone();
    this.lookAt(target);
    this.updateProjectionMatrix(fov, window.innerWidth / window.innerHeight, near, far);
  }
  
  updateWorldMatrix(updateObjectToParentMatrix = true) {
    super.updateWorldMatrix(updateObjectToParentMatrix);
    this.updateViewMatrix();
  }

  updateProjectionMatrix(fov, aspect, near, far) {
    if (this.cameraType === Camera.ORTHOGRAPHIC) {
        // For orthographic projection (row-major):
        const top = Math.tan(fov / 2) * near;
        const bottom = -top;
        const right = top * aspect;
        const left = -right;
        // Standard orthographic matrix in row-major order:
        // Row0: [2/(right-left), 0, 0, -(right+left)/(right-left)]
        // Row1: [0, 2/(top-bottom), 0, -(top+bottom)/(top-bottom)]
        // Row2: [0, 0, -2/(far-near), -(far+near)/(far-near)]
        // Row3: [0, 0, 0, 1]
        const m = new Mat4(
            2 / (right - left), 0, 0, -(right + left) / (right - left),
            0, 2 / (top - bottom), 0, -(top + bottom) / (top - bottom),
            0, 0, -2 / (far - near), -(far + near) / (far - near),
            0, 0, 0, 1
        );
        this.projectionMatrix = m;
    } else {
        // Perspective projection in row-major order.
        // The typical OpenGL perspective projection (column-major) is:
        // [ f/aspect,  0,              0,                         0,
        //   0,         f,              0,                         0,
        //   0,         0,  (far+near)/(near-far), (2*far*near)/(near-far),
        //   0,         0,             -1,                         0 ]
        // Transposing to row-major gives:
        // Row0: [ f/aspect, 0, 0, 0 ]
        // Row1: [ 0, f, 0, 0 ]
        // Row2: [ 0, 0, (far+near)/(near-far), -1 ]
        // Row3: [ 0, 0, (2*far*near)/(near-far),  0 ]
        const f = 1.0 / Math.tan(fov / 2);
        const m = new Mat4(
            f / aspect, 0, 0, 0,
            0, f, 0, 0,
            0, 0, (far + near) / (near - far), (2 * far * near) / (near - far),
            0, 0, -1, 0
        );
        this.projectionMatrix = m;
    }
}

updateViewMatrix() {
    // Step 1: Get rotation matrix from Euler angles (YXZ order assumed)
    const { x, y, z } = this.getGlobalRotation();
  
    const cx = Math.cos(x), sx = Math.sin(x);
    const cy = Math.cos(-y), sy = Math.sin(-y);
    const cz = Math.cos(z), sz = Math.sin(z);
  
    // Build rotation matrix directly (row-major)
    const r00 = cy * cz + sy * sx * sz;
    const r01 = -cy * sz + sy * sx * cz;
    const r02 = sy * cx;
  
    const r10 = cx * sz;
    const r11 = cx * cz;
    const r12 = -sx;
  
    const r20 = -sy * cz + cy * sx * sz;
    const r21 = sy * sz + cy * sx * cz;
    const r22 = cy * cx;
  
    // Step 2: Transpose rotation for inverse (R^T)
    const t00 = r00, t01 = r10, t02 = r20;
    const t10 = r01, t11 = r11, t12 = r21;
    const t20 = r02, t21 = r12, t22 = r22;
  
    // Step 3: Inverse translation = -R^T * position
    const pos = this.getGlobalPosition();
    const px = pos.x, py = pos.y, pz = pos.z;
  
    const tx = -(t00 * px + t01 * py + t02 * pz);
    const ty = -(t10 * px + t11 * py + t12 * pz);
    const tz = -(t20 * px + t21 * py + t22 * pz);
  
    // Step 4: Build final view matrix
    this.viewMatrix = new Mat4(
        t00, t01, t02, tx,
        t10, t11, t12, ty,
        t20, t21, t22, tz,
        0,   0,   0,   1
      );
  }

  lookAt(target) {
    
    // Get yaw and pitch from target - eye
    const forward = target.subtract(this.getGlobalPosition()).normalize();
    // Here, assume that yaw is rotation about Y and pitch about X.
    const yaw = Math.atan2(forward.x, -forward.z);
    const pitch = Math.asin(forward.y);
    const parentRotation = this.parent ? this.parent.getGlobalRotation() : Vec3.zeros();
    this.transform.rotation.x = pitch - parentRotation.x;
    this.transform.rotation.y = yaw - parentRotation.y;
    this.updateViewMatrix();

  }
}

class Scene extends GameObject {
    
    constructor() {
        super();
    }
}

function generateSphere(radius = 1, latBands = 16, longBands = 16) {
  const positions = [];
  const indices = [];

  for (let lat = 0; lat <= latBands; ++lat) {
    const theta = (lat * Math.PI) / latBands;
    const sinTheta = Math.sin(theta);
    const cosTheta = Math.cos(theta);

    for (let lon = 0; lon <= longBands; ++lon) {
      const phi = (lon * 2 * Math.PI) / longBands;
      const sinPhi = Math.sin(phi);
      const cosPhi = Math.cos(phi);

      const x = cosPhi * sinTheta;
      const y = cosTheta;
      const z = sinPhi * sinTheta;

      positions.push(radius * x, radius * y, radius * z);
    }
  }

  for (let lat = 0; lat < latBands; ++lat) {
    for (let lon = 0; lon < longBands; ++lon) {
      const first = lat * (longBands + 1) + lon;
      const second = first + longBands + 1;

      indices.push(first, second, first + 1);
      indices.push(second, second + 1, first + 1);
    }
  }

  return { positions, indices };
}

class Sphere extends GameObject {
    
  constructor(radius = 1, latBands = 16, longBands = 16) {
    const { positions, indices } = generateSphere(radius, latBands, longBands);
    const mesh = new Mesh(GraphicsContext.gl, positions, indices);
    super();
    this.name = "Sphere";
    super.setMesh(mesh);
  }
}

const WEAVE = { 
    GameObject, Box, Mesh, Camera, Scene, Sphere,
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
    init: function(canvasSelector = "canvas") {

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
        this.gl.clearColor(0.1, 0.1, 0.1, 1.0);
    
        const vertexShaderSrc = `
            attribute vec3 aPosition;
            uniform mat4 uModelViewProjection;

            void main() {
                gl_Position = uModelViewProjection * vec4(aPosition, 1.0);
            }
        `;

        const fragmentShaderSrc = `
            precision mediump float;
            uniform vec4 uColor;

            void main() {
                gl_FragColor = uColor;
            }
`       ;

        this.program = this.createProgram(vertexShaderSrc, fragmentShaderSrc);
        this.gl.useProgram(this.program);
    

        this.uniforms.uModelViewProjection = this.gl.getUniformLocation(this.program, "uModelViewProjection");
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        console.log("init complete.");
    },

    render() {

        const gl = this.gl;
    
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        const viewProj = this.camera.projectionMatrix.multiply(this.camera.viewMatrix);


        this.scene.traverse(obj => {
            if (!obj.visible || !obj.mesh) return;
    
            let mvp = viewProj.multiply(obj.getWorldMatrix());
            const uMVP = gl.getUniformLocation(this.program, "uModelViewProjection");
            gl.uniformMatrix4fv(uMVP, true, mvp.elements);
    
            obj.mesh.draw();
        });

        requestAnimationFrame(() => this.render());
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
