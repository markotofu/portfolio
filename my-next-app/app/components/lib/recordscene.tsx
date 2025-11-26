"use client";
import * as THREE from "three";
import {useEffect, useRef} from "react";

export default function RecordScene(){
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
     
const renderer = new THREE.WebGLRenderer({antialias: true});
const w = window.innerWidth;
const h = window.innerHeight;
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


renderer.render(scene,camera);

return () => {
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };

},[]);
    return <div ref={mountRef}></div>

}