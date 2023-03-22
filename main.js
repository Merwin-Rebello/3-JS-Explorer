// import './style.css'
// import javascriptLogo from './javascript.svg'
// import viteLogo from '/vite.svg'
// import { setupCounter } from './counter.js'

// document.querySelector('#app').innerHTML = `
//   <div>
//     <a href="https://vitejs.dev" target="_blank">
//       <img src="${viteLogo}" class="logo" alt="Vite logo" />
//     </a>
//     <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
//       <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
//     </a>
//     <h1>Hello Vite!</h1>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite logo to learn more
//     </p>
//   </div>
// `

// setupCounter(document.querySelector('#counter'))
import * as THREE from 'three';
import './style.css'
import gsap from 'gsap'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
//scene declaration here
const scene = new THREE.Scene()
//objects inside the scene defined here
const geometry =new THREE.SphereGeometry(3,64,64)// radius=3 ,widthsegment=64,heightseg=64
const material= new THREE.MeshStandardMaterial({//material is how the object wil look
  color:"#00ff83",
  roughness:0.5,
})
const mesh=new THREE.Mesh(geometry,material);//mesh is a combination od gemotry and material
scene.add(mesh)

//size of the screen
const size={
  width:window.innerWidth,
  height:window.innerHeight
}

//light definition
const light= new THREE.PointLight(0xffffff,1,100)
light.position.set(0,10,10)
light.intensity=1.25
scene.add(light)
                                                     //0.1and 100 are the clipping points 
const camera= new THREE.PerspectiveCamera(45,size.width/size.height,0.1,100)//45 is the angle of view for camera and 800-600 is the ascpect ratio
camera.position.z=20//this number defines the zoom if u reduce it will go near to the object
scene.add(camera)

//render
const canvas= document.querySelector(".display");
const renderer= new THREE.WebGLRenderer({ canvas})
renderer.setSize(size.width,size.height)//define the size of canvas
renderer.setPixelRatio(2);
renderer.render(scene,camera)


window.addEventListener("resize",()=>{
  //size changing on changing size of screen
  size.width= window.innerWidth
  size.height= window.innerHeight
  //camera view changing according to  size of screen
  camera.aspect=size.width/size.height
  camera.updateProjectionMatrix()
  renderer.setSize(size.width,size.height)
})
//as we had only rendered once so the there was an issue that the shape was changing so we make a loop and render continuously as for every size


//controls
const controls= new OrbitControls(camera,canvas)
controls.enableDamping= true
controls.enablePan=false
controls.enableZoom=false
controls.autoRotate=true
controls.autoRotateSpeed=5



const loop4rendering =()=>{
  controls.update()
  renderer.render(scene,camera)
  window.requestAnimationFrame(loop4rendering)
}
loop4rendering()
//timeline magic using gsap
const t1=gsap.timeline({defaults:{duration:1}})
t1.fromTo(mesh.scale,{z:0,x:0,y:0},{z:1,x:1,y:1})
t1.fromTo("nav",{y:"-100%"},{y:"0%"})
t1.fromTo('.title',{opacity:0},{opacity:1})

//mouse animation controls
let mousedown=false;
let rgb=[]
window.addEventListener("mousedown",()=>(mousedown=true))
window.addEventListener("mouseup",()=>(mousedown=true))

window.addEventListener("mousemove",(e)=>{
  if(mousedown){
    rgb=[
      Math.round((e.pageX/ size.width)*255),
      Math.round((e.pageY/ size.height)*255),
      150,
    ]
    let newColor= new THREE.Color(`rgb(${rgb.join(",")})`)
    gsap.to(mesh.material.color,{r:newColor.r,g:newColor.g,b:newColor.b})
  }
})