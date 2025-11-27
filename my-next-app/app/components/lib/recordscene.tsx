"use client";
import * as THREE from "three";
import {useEffect, useRef} from "react";

export default function RecordScene(){
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
    if (!mountRef.current) return;
const renderer = new THREE.WebGLRenderer({antialias: true});
const w = mountRef.current.clientWidth;
const h = mountRef.current.clientHeight;
renderer.setSize(w, h);

if(mountRef.current){
mountRef.current.appendChild(renderer.domElement);
}

const fov = 75; // field of view degrees
const aspect = w/h; //aspect ratio for the camera
const near = 0.1; // shows which is the nearest point the camera can see
const far = 10; // shows which is the farthest point the camera can see

const camera = new THREE.PerspectiveCamera(fov , aspect , near , far );


camera.position.z=2;
const scene = new THREE.Scene();


const geo = new THREE.IcosahedronGeometry (0.5, 0);
const mat = new THREE.MeshBasicMaterial ({color: 0x44aa88, wireframe: true});
const mesh = new THREE.Mesh(geo,mat);
scene.add(mesh);

const square = new THREE.BoxGeometry(1,1,1);
const squareMat = new THREE.MeshBasicMaterial({color: 0x8844aa, wireframe: true});
const squareMesh = new THREE.Mesh(square, squareMat);
scene.add(squareMesh);
squareMesh.position.x = 2;

const circle = new THREE.CylinderGeometry(0.5, 0.5, 1, 32);
const circleMat = new THREE.MeshBasicMaterial({color: 0xaa4488, wireframe: true});
const circleMesh = new THREE.Mesh(circle, circleMat);
scene.add(circleMesh);
circleMesh.position.x = -2;

const mouse = new THREE.Vector2();
renderer.render(scene,camera);

function mousePos(){
    mouse.x = ( (event as MouseEvent).clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( (event as MouseEvent).clientY / window.innerHeight ) * 2 + 1;
    camera.rotateX(mouse.y * -0.0005);
    camera.rotateY(mouse.x * -0.0005);
    console.log(mouse.x, mouse.y);
}

var height =0;
var state = true;
function animateBounce(){
    if(state){
        height += 0.001;
        if (height >=0.3) {
            state = false;
        }
    }
    else {
        height -= 0.001;
         if (height <=0) {
            state = true;
         }
    }
}

window.addEventListener('mousemove', mousePos, false);
function animate(){
    requestAnimationFrame(animate);
    mesh.position.y = height;
    circleMesh.position.y = height;
    squareMesh.position.y = height; 
    animateBounce();
    console.log(mesh.position.y);
    renderer.render(scene,camera);
}
function centerCamera(){
    camera.rotation.x = 0;
    camera.rotation.y = 0;
}
window.addEventListener('mouseout', centerCamera, false);
animate();



window.addEventListener('resize', function(){
    if(!mountRef.current) return;
    const w = mountRef.current.clientWidth;
    const h = mountRef.current.clientHeight;
    renderer.setSize(w,h);
    camera.aspect = w/h;
    camera.updateProjectionMatrix();
});
return () => {
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };

},[]);
    return <div ref={mountRef} style={{ width: "100vw", height: "100vh" }}></div>

}