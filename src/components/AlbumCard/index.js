import React, { useEffect, useRef, useState } from "react";

// import * as THREE from "three";
import { WebGLRenderer, Scene, PerspectiveCamera, PlaneGeometry, ShaderMaterial, Vector2, Mesh } from "three";
import { rgb, randomInteger, sceneTraverse } from "./util";
import { noise, fragment, vertex } from "./shaders";
import "./styles.css";

const AlbumCard = ({ color }) => {
  color = { low: rgb(38, 176, 230), high: rgb(0, 128, 230) };

  const ref = useRef(null);
  const requestRef = useRef();
  const [mount, setMount] = useState(true);

  useEffect(() => {
    if (ref.current) {
      let renderer = new WebGLRenderer({
        powerPreference: "high-performance",
        antialias: true,
        alpha: true,
        //canvas: document.getElementById(`canvas-${i}`),
      });

      // Get el width and height
      //const elWidth = parseFloat(window.getComputedStyle(ref.current).width);
      //const elHeight = parseFloat(window.getComputedStyle(ref.current).height);
      const elWidth = parseFloat(250);
      const elHeight = parseFloat(300);

      // Set sizes and set scene/camera
      renderer.setSize(elWidth, elHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
      ref.current.appendChild(renderer.domElement);

      let scene = new Scene();
      let camera = new PerspectiveCamera(75, elWidth / elHeight, 0.1, 1000);

      // Check on colors to use
      let high = color.high;
      let low = color.low;
      // if (typeof colors[i] !== "undefined") {
      //   high = colors[i].high;
      //   low = colors[i].low;
      //   ++i;
      // }

      // And use the high color for the subtext.
      if (ref.current.querySelector(".subtext") !== null) {
        ref.current.querySelector(".subtext").style.background = `rgba(${high.x},${high.y},${high.z},0.75)`;
      }
      if (ref.current.querySelector(".icon-chart") !== null) {
        ref.current.querySelector(".icon-chart").style.background = `rgba(${high.x},${high.y},${high.z},0.50)`;
      }

      // Create a plane, and pass that through to our shaders
      let geometry = new PlaneGeometry(600, 600, 100, 100);
      let material = new ShaderMaterial({
        uniforms: {
          u_lowColor: { type: "v3", value: low },
          u_highColor: { type: "v3", value: high },
          u_time: { type: "f", value: 0 },
          u_height: { type: "f", value: 1 },
          u_rand: { type: "f", value: new Vector2(randomInteger(6, 10), randomInteger(8, 10)) },
        },
        fragmentShader: noise + fragment,
        vertexShader: noise + vertex,
      });

      // Create the mesh and position appropriately
      let mesh = new Mesh(geometry, material);
      mesh.position.set(0, 0, -300);
      scene.add(mesh);
      geometry.dispose();
      material.dispose();

      // Render
      renderer.render(scene, camera);
      let t = 0;

      // Animate
      const animate = function() {
        requestRef.current = requestAnimationFrame(animate);
        renderer.render(scene, camera);
        mesh.material.uniforms.u_time.value = t;
        t = t + 0.02;
      };
      animate();

      return () => {
        // unmount:
        // dispose geometries and materials in scene
        sceneTraverse(scene, (o) => {
          if (o.geometry) {
            o.geometry.dispose();
            //console.log("dispose geometry ", o.geometry);
          }
          if (o.material) {
            if (o.material.length) {
              for (let i = 0; i < o.material.length; ++i) {
                o.material[i].dispose();
                //console.log("dispose material ", o.material[i]);
              }
            } else {
              o.material.dispose();
              //console.log("dispose material ", o.material);
            }
          }
        });

        window.cancelAnimationFrame(requestRef.current);
        ref.current.removeChild(renderer.domElement);
        //renderer.context.getExtension("WEBGL_lose_context").loseContext();
        renderer.forceContextLoss();
        //renderer.context = null;
        renderer.renderLists.dispose();
        renderer.dispose();

        scene = null;
        camera = null;
        renderer.domElement = null;
        renderer = null;
      };
    }
  }, [ref]);

  return (
    <>
      <div className="album-item" ref={ref}></div>
    </>
  );
};

export default AlbumCard;
