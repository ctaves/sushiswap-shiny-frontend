import React, { useEffect } from "react";

import * as THREE from "./js/src/Three";
import { rgb, randomInteger } from "./util";
import "./styles.css";

const AlbumCards = () => {
  useEffect(() => {
    const config = {
      individualItem: ".album-item", // class of individual item
      carouselWidth: window.innerWidth, // in px
      carouselId: "#album-rotator", // carousel selector
      carouselHolderId: "#album-rotator-holder", // carousel should be <div id="carouselId"><div id="carouselHolderId">{items}</div></div>
      colors: [
        // Define colors for each item. If more items than colors, then first color will be used as default
        // Format { low: rgb(), high: rgb() for each color }
        { low: rgb(0, 114, 255), high: rgb(48, 0, 255) },
        { low: rgb(236, 166, 15), high: rgb(233, 104, 0) },
        { low: rgb(43, 75, 235), high: rgb(213, 51, 248) },
        { low: rgb(175, 49, 49), high: rgb(123, 16, 16) },
      ],
    };

    // Async function for generating webGL waves
    const createWave = async function(selector, colors) {
      if (document.querySelectorAll(selector) !== null && document.querySelectorAll(selector).length > 0) {
        // Import all the fragment and vertex shaders
        const noise = `#define NUM_OCTAVES 5

        vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
        
        float rand(float n){return fract(sin(n) * 43758.5453123);}
        float rand(vec2 n) { 
            return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
        }
        float noise(float p){
            float fl = floor(p);
          float fc = fract(p);
            return mix(rand(fl), rand(fl + 1.0), fc);
        }
        float noise(vec2 n) {
            const vec2 d = vec2(0.0, 1.0);
          vec2 b = floor(n), f = smoothstep(vec2(0.0), vec2(1.0), fract(n));
            return mix(mix(rand(b), rand(b + d.yx), f.x), mix(rand(b + d.xy), rand(b + d.yy), f.x), f.y);
        }
        
        float snoise(vec2 v) {
            const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0
                                0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)
                                -0.577350269189626,  // -1.0 + 2.0 * C.x
                                0.024390243902439); // 1.0 / 41.0
            vec2 i  = floor(v + dot(v, C.yy) );
            vec2 x0 = v -   i + dot(i, C.xx);
            vec2 i1;
            i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
            vec4 x12 = x0.xyxy + C.xxzz;
            x12.xy -= i1;
            i = mod289(i); // Avoid truncation effects in permutation
            vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
                + i.x + vec3(0.0, i1.x, 1.0 ));
        
            vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
            m = m*m ;
            m = m*m ;
            vec3 x = 2.0 * fract(p * C.www) - 1.0;
            vec3 h = abs(x) - 0.5;
            vec3 ox = floor(x + 0.5);
            vec3 a0 = x - ox;
            m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
            vec3 g;
            g.x  = a0.x  * x0.x  + h.x  * x0.y;
            g.yz = a0.yz * x12.xz + h.yz * x12.yw;
            return 130.0 * dot(m, g);
        }
        const mat2 m2 = mat2(0.8,-0.6,0.6,0.8);
        
        #define NB_OCTAVES 8
        #define LACUNARITY 10.0
        #define GAIN 0.5
        
        float fbm(in vec2 p) {
            float total = 0.0,
                frequency = 1.0,
                amplitude = 1.0;
            
            for (int i = 0; i < NB_OCTAVES; i++) {
                total += snoise(p * frequency) * amplitude;
                frequency *= LACUNARITY;
                amplitude *= GAIN;
            }    
            return total;
        }`;
        const fragment = ` vec3 rgb(float r, float g, float b) {
          return vec3(r / 255., g / 255., b / 255.);
      }
      vec3 rgb(float c) {
          return vec3(c / 255., c / 255., c / 255.);
      }
      
      uniform vec3 u_lowColor;
      uniform vec3 u_highColor;
      uniform float u_time;
      
      varying vec2 vUv;
      varying float vDistortion;
      varying float xDistortion;
      
      void main() {
          vec3 highColor = rgb(u_highColor.r, u_highColor.g, u_highColor.b);
          
          vec3 colorMap = rgb(u_lowColor.r, u_lowColor.g, u_lowColor.b);
      
          colorMap = mix(colorMap, highColor, vDistortion);
          
          gl_FragColor = vec4(colorMap, 1.);
      }`;
        const vertex = `uniform float u_time;
        uniform float u_height;
        uniform vec2 u_rand;
        
        float xDistortion;
        float yDistortion;
        
        varying float vDistortion;
        varying vec2 vUv;
        
        void main() {
            vUv = uv;
            vDistortion = snoise(vUv.xx * 3. - vec2(u_time / u_rand.x, u_time / u_rand.x) + cos(vUv.yy) * u_rand.y) * u_height;
            xDistortion = snoise(vUv.xx * 1.) * u_height * u_rand.x / 10.;
            vec3 pos = position;
            pos.z += (vDistortion * 55.);
            pos.x += (xDistortion * 55.);
            pos.y += (sin(vUv.y) * 55.);
            
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
        `;
        let i = 0;
        // For each of the selector elements
        document.querySelectorAll(selector).forEach(function(item) {
          // Create a renderer
          //https://stackoverflow.com/questions/58529891/webgl-shader-flickering

          const renderer = new THREE.WebGLRenderer({
            //powerPreference: "high-performance",
            //powerPreference: "default",
            logarithmicDepthBuffer: true,
            //preserveDrawingBuffer: true,
            //antialias: true,
            //alpha: true,
          });

          // Get el width and height
          const elWidth = parseFloat(window.getComputedStyle(item).width);
          const elHeight = parseFloat(window.getComputedStyle(item).height);

          // Set sizes and set scene/camera
          renderer.setSize(elWidth, elHeight);
          document.body.appendChild(renderer.domElement);
          renderer.setPixelRatio(window.devicePixelRatio);

          const scene = new THREE.Scene();
          const camera = new THREE.PerspectiveCamera(75, elWidth / elHeight, 100, 1000);

          // Check on colors to use
          let high = colors[0].high;
          let low = colors[0].low;
          if (typeof colors[i] !== "undefined") {
            high = colors[i].high;
            low = colors[i].low;
            ++i;
          }

          renderer.render(scene, camera);

          // And use the high color for the subtext.
          if (item.querySelector(".subtext") !== null) {
            item.querySelector(".subtext").style.background = `rgba(${high.x},${high.y},${high.z},0.75)`;
          }

          // Create a plane, and pass that through to our shaders
          let geometry = new THREE.PlaneGeometry(600, 600, 100, 100);
          let material = new THREE.ShaderMaterial({
            uniforms: {
              u_lowColor: { type: "v3", value: low },
              u_highColor: { type: "v3", value: high },
              u_time: { type: "f", value: 0 },
              u_height: { type: "f", value: 1 },
              u_rand: { type: "f", value: new THREE.Vector2(randomInteger(6, 10), randomInteger(8, 10)) },
            },
            fragmentShader: noise + fragment,
            vertexShader: noise + vertex,
          });

          // Create the mesh and position appropriately
          let mesh = new THREE.Mesh(geometry, material);
          mesh.position.set(0, 0, -300);
          scene.add(mesh);

          // On hover effects for each item
          // let enterTimer, exitTimer;
          // item.addEventListener("mouseenter", function(e) {
          //   if (typeof exitTimer !== "undefined") {
          //     clearTimeout(exitTimer);
          //   }
          //   enterTimer = setInterval(function() {
          //     if (mesh.material.uniforms.u_height.value >= 0.5) {
          //       mesh.material.uniforms.u_height.value -= 0.05;
          //     } else {
          //       clearTimeout(enterTimer);
          //     }
          //   }, 10);
          // });
          // item.addEventListener("mouseleave", function(e) {
          //   if (typeof enterTimer !== "undefined") {
          //     clearTimeout(enterTimer);
          //   }
          //   exitTimer = setInterval(function() {
          //     if (mesh.material.uniforms.u_height.value < 1) {
          //       mesh.material.uniforms.u_height.value += 0.05;
          //     } else {
          //       clearTimeout(exitTimer);
          //     }
          //   }, 10);
          // });

          // Render
          renderer.render(scene, camera);
          let t = 0;

          // const onResize = function() {
          //   const newWidth = parseFloat(window.getComputedStyle(item).width);
          //   const newHeight = parseFloat(window.getComputedStyle(item).height);
          //   camera.aspect = newWidth / newHeight;
          //   camera.updateProjectionMatrix();
          //   renderer.setSize(newWidth, newHeight);
          // };
          // window.addEventListener("resize", onResize, false);

          // function render() {
          //   resizeCanvasToDisplaySize(gl.canvas);
          //   gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
          //   requestAnimationFrame(render);
          // }

          // Animate
          const animate = function() {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
            item.appendChild(renderer.domElement);
            mesh.material.uniforms.u_time.value = t;
            t = t + 0.02;
          };
          animate();
        });
      }
    };

    createWave(config.individualItem, config.colors);

    // Get items
    const el = document.querySelector(config.individualItem);
    const elWidth =
      parseFloat(window.getComputedStyle(el).width) +
      parseFloat(window.getComputedStyle(el).marginLeft) +
      parseFloat(window.getComputedStyle(el).marginRight);

    // Track carousel
    // let mousedown = false;
    // let movement = false;
    // let initialPosition = 0;
    // let selectedItem;
    // let currentDelta = 0;

    // document.querySelectorAll(config.carouselId).forEach(function(item) {
    //   item.style.width = `${config.carouselWidth}px`;
    // });

    // document.querySelectorAll(config.carouselId).forEach(function(item) {
    //   item.addEventListener("pointerdown", function(e) {
    //     mousedown = true;
    //     selectedItem = item;
    //     initialPosition = e.pageX;
    //     currentDelta =
    //       parseFloat(item.querySelector(config.carouselHolderId).style.transform.split("translateX(")[1]) || 0;
    //   });
    // });

    // const scrollCarousel = function(change, currentDelta, selectedItem) {
    //   let numberThatFit = Math.floor(config.carouselWidth / elWidth);
    //   let newDelta = currentDelta + change;
    //   let elLength = selectedItem.querySelectorAll(config.individualItem).length - numberThatFit;
    //   if (newDelta <= 0 && newDelta >= -elWidth * elLength) {
    //     selectedItem.querySelector(config.carouselHolderId).style.transform = `translateX(${newDelta}px)`;
    //   } else {
    //     if (newDelta <= -elWidth * elLength) {
    //       selectedItem.querySelector(config.carouselHolderId).style.transform = `translateX(${-elWidth * elLength}px)`;
    //     } else if (newDelta >= 0) {
    //       selectedItem.querySelector(config.carouselHolderId).style.transform = `translateX(0px)`;
    //     }
    //   }
    // };

    // document.body.addEventListener("pointermove", function(e) {
    //   if (mousedown == true && typeof selectedItem !== "undefined") {
    //     let change = -(initialPosition - e.pageX);
    //     scrollCarousel(change, currentDelta, document.body);
    //     document.querySelectorAll(`${config.carouselId} a`).forEach(function(item) {
    //       item.style.pointerEvents = "none";
    //     });
    //     movement = true;
    //   }
    // });

    // ["pointerup", "mouseleave"].forEach(function(item) {
    //   document.body.addEventListener(item, function(e) {
    //     selectedItem = undefined;
    //     movement = false;
    //     document.querySelectorAll(`${config.carouselId} a`).forEach(function(item) {
    //       item.style.pointerEvents = "all";
    //     });
    //   });
    // });

    // document.querySelectorAll(config.carouselId).forEach(function(item) {
    //   let trigger = 0;
    //   item.addEventListener("wheel", function(e) {
    //     if (trigger !== 1) {
    //       ++trigger;
    //     } else {
    //       let change = e.deltaX * -3;
    //       let currentDelta =
    //         parseFloat(item.querySelector(config.carouselHolderId).style.transform.split("translateX(")[1]) || 0;
    //       scrollCarousel(change, currentDelta, item);
    //       trigger = 0;
    //     }
    //     e.preventDefault();
    //     e.stopImmediatePropagation();
    //     return false;
    //   });
    // });
  }, []);
  return (
    <>
      <div className="album-cards">
        <div id="album-rotator">
          <div id="album-rotator-holder" className="py-4">
            <a className="album-item" href="#">
              <span className="album-details">
                <span className="icon">
                  <i className="far fa-at"></i> Liquidity
                </span>
                <span className="title">Some</span>
                <span className="subtitle">Title</span>
                <span className="subtext">Some text to describe this item</span>
              </span>
            </a>
            <a className="album-item" href="#">
              <span className="album-details">
                <span className="icon">
                  <i className="far fa-at"></i> Volume
                </span>
                <span className="title">Another</span>
                <span className="subtitle">Title</span>
                <span className="subtext">Some text to describe this item</span>
              </span>
            </a>
            <a className="album-item" href="#">
              <span className="album-details">
                <span className="title">Finally</span>
                <span className="subtitle">We Go</span>
                <span className="subtext">Some text to describe this item</span>
              </span>
            </a>
            <a className="album-item" href="#">
              <span className="album-details">
                <span className="title">And</span>
                <span className="subtitle">One More</span>
                <span className="subtext">Some text to describe this item</span>
              </span>
            </a>
            <a className="album-item mr-4" href="#">
              <span className="album-details">
                <span className="title">And</span>
                <span className="subtitle">Finally..</span>
                <span className="subtext">Some text to describe this item</span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default AlbumCards;
