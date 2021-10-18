import "./style.css";
import * as THREE from "three";
import fragment from "./shaders/fragment.glsl";
import vertex from "./shaders/vertex.glsl";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default class Sketch {
  constructor () {
    this.renderer = new THREE.WebGLRenderer( {
      antialias: true,
    } );
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    document.getElementById( "container" ).appendChild( this.renderer.domElement );

    this.camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.1,
      3000
    );
    this.camera.position.z = 2;

    this.scene = new THREE.Scene();
    this.time = 0;
    this.controls = new OrbitControls( this.camera, this.renderer.domElement );
    this.addMesh();

    this.render();
  }

  addMesh() {
    this.material = new THREE.ShaderMaterial( {
      fragmentShader: fragment,
      vertexShader: vertex,
      uniforms: {
        time: { value: 0 },
        resolution: { value: new THREE.Vector4() }
      },
      side: THREE.DoubleSide,
    } );

    this.geometry = new THREE.PlaneGeometry( 1, 1, 1, 1 )



    this.mesh = new THREE.Points( this.geometry, this.material );
    this.scene.add( this.mesh );
  }

  render() {
    this.time++;
    //this.mesh.rotation.x += 0.01;
    //this.mesh.rotation.y += 0.01;

    this.renderer.render( this.scene, this.camera );
    window.requestAnimationFrame( this.render.bind( this ) );
  }
}

new Sketch();
