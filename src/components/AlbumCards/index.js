import React, { useEffect, useRef } from "react";

// import * as THREE from "three";
import { WebGLRenderer, Scene, PerspectiveCamera, PlaneGeometry, ShaderMaterial, Vector2, Mesh } from "three";
import { rgb, randomInteger, sceneTraverse } from "./util";
import { noise, fragment, vertex } from "./shaders";
import "./styles.css";

import SushiGlobalChart from "../../services/vision/components/GlobalChart/withoutAxis";

const config = {
  individualItem: ".album-item", // class of individual ref.current
  carouselWidth: 1000, // in px
  carouselId: "#album-rotator", // carousel selector
  carouselHolderId: "#album-rotator-holder", // carousel should be <div id="carouselId"><div id="carouselHolderId">{ref.currents}</div></div>
  colors: [
    // Define colors for each ref.current. If more ref.currents than colors, then first color will be used as default
    // Format { low: rgb(), high: rgb() for each color }
    { low: rgb(0, 114, 255), high: rgb(48, 0, 255) },
    { low: rgb(236, 166, 15), high: rgb(233, 104, 0) },
    { low: rgb(43, 75, 235), high: rgb(213, 51, 248) },
    { low: rgb(175, 49, 49), high: rgb(123, 16, 16) },
  ],
};

const cards = [
  {
    icon: "Liquidity",
    color: config.colors[0],
    subtitle: <SushiGlobalChart display="liquidity" />,
  },
  {
    icon: "Volume",
    color: config.colors[1],
    subtitle: <SushiGlobalChart display="volume" />,
  },
  {
    icon: "New",
    color: config.colors[3],
    title: "Onsen",
    subtext: "New Rewards, New Farms",
  },
  {
    icon: "Coming Soon",
    color: config.colors[2],
    title: "BentoBox",
    subtext: "Lending on SushiSwap",
  },
];

const AlbumCards = () => {
  return (
    <>
      <div className="album-cards relative">
        <div id="album-rotator">
          <div id="album-rotator-holder" className="py-4">
            {cards.map((card) => {
              return (
                <AlbumCard
                  color={card.color}
                  icon={card.icon}
                  title={card.title}
                  subtitle={card.subtitle}
                  subtext={card.subtext}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

const AlbumCard = ({ color, icon, title, subtitle, subtext }) => {
  const ref = useRef(null);
  const requestRef = useRef();

  useEffect(() => {
    if (ref.current) {
      //console.log("color:", color);
      // const newCanvas = document.createElement("canvas");
      // newCanvas.id = `canvas-${i}`;
      // ref.current.appendChild(newCanvas);

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

      // On hover effects for each ref.current
      let enterTimer, exitTimer;
      ref.current.addEventListener("mouseenter", function(e) {
        if (typeof exitTimer !== "undefined") {
          clearTimeout(exitTimer);
        }
        enterTimer = setInterval(function() {
          if (mesh.material.uniforms.u_height.value >= 0.5) {
            mesh.material.uniforms.u_height.value -= 0.05;
          } else {
            clearTimeout(enterTimer);
          }
        }, 10);
      });
      ref.current.addEventListener("mouseleave", function(e) {
        if (typeof enterTimer !== "undefined") {
          clearTimeout(enterTimer);
        }
        exitTimer = setInterval(function() {
          if (mesh.material.uniforms.u_height.value < 1) {
            mesh.material.uniforms.u_height.value += 0.05;
          } else {
            clearTimeout(exitTimer);
          }
        }, 10);
      });

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
        // remove listeners
        document.body.removeEventListener("mouseleave", () => {});
        document.body.removeEventListener("mouseenter", () => {});
        window.cancelAnimationFrame(requestRef.current);
        scene = null;
        camera = null;
        renderer.forceContextLoss();
        //renderer.context = null;
        renderer.domElement = null;
        renderer.renderLists.dispose();
        renderer.dispose();
        renderer = null;
      };
    }
  }, []);

  useEffect(() => {
    // Get items
    const el = document.querySelector(config.individualItem);
    const elWidth =
      parseFloat(window.getComputedStyle(el).width) +
      parseFloat(window.getComputedStyle(el).marginLeft) +
      parseFloat(window.getComputedStyle(el).marginRight);

    // Track carousel
    let mousedown = false;
    let movement = false;
    let initialPosition = 0;
    let selectedItem;
    let currentDelta = 0;

    document.querySelectorAll(config.carouselId).forEach(function(item) {
      item.style.width = `${config.carouselWidth}px`;
    });

    document.querySelectorAll(config.carouselId).forEach(function(item) {
      item.addEventListener("pointerdown", function(e) {
        mousedown = true;
        selectedItem = item;
        initialPosition = e.pageX;
        currentDelta =
          parseFloat(item.querySelector(config.carouselHolderId).style.transform.split("translateX(")[1]) || 0;
      });
    });

    const scrollCarousel = function(change, currentDelta, selectedItem) {
      let numberThatFit = Math.floor(config.carouselWidth / elWidth);
      let newDelta = currentDelta + change;
      let elLength = selectedItem.querySelectorAll(config.individualItem).length - numberThatFit;
      if (newDelta <= 0 && newDelta >= -elWidth * elLength) {
        selectedItem.querySelector(config.carouselHolderId).style.transform = `translateX(${newDelta}px)`;
      } else {
        if (newDelta <= -elWidth * elLength) {
          selectedItem.querySelector(config.carouselHolderId).style.transform = `translateX(${-elWidth * elLength}px)`;
        } else if (newDelta >= 0) {
          selectedItem.querySelector(config.carouselHolderId).style.transform = `translateX(0px)`;
        }
      }
    };

    document.body.addEventListener("pointermove", function(e) {
      if (mousedown == true && typeof selectedItem !== "undefined") {
        let change = -(initialPosition - e.pageX);
        scrollCarousel(change, currentDelta, document.body);
        document.querySelectorAll(`${config.carouselId} a`).forEach(function(item) {
          item.style.pointerEvents = "none";
        });
        movement = true;
      }
    });

    ["pointerup", "mouseleave"].forEach(function(item) {
      document.body.addEventListener(item, function(e) {
        selectedItem = undefined;
        movement = false;
        document.querySelectorAll(`${config.carouselId} a`).forEach(function(item) {
          item.style.pointerEvents = "all";
        });
      });
    });

    document.querySelectorAll(config.carouselId).forEach(function(item) {
      let trigger = 0;
      item.addEventListener("wheel", function(e) {
        if (trigger !== 1) {
          ++trigger;
        } else {
          let change = e.deltaX * -3;
          let currentDelta =
            parseFloat(item.querySelector(config.carouselHolderId).style.transform.split("translateX(")[1]) || 0;
          scrollCarousel(change, currentDelta, item);
          trigger = 0;
        }
        e.preventDefault();
        e.stopImmediatePropagation();
        return false;
      });
    });

    return () => {
      document.body.removeEventListener("pointerdown", () => {});
      document.body.removeEventListener("pointerup", () => {});
      document.body.removeEventListener("pointermove", () => {});
      document.body.removeEventListener("wheel", () => {});
    };
  });

  return (
    <>
      <a className="album-item" href="#" ref={ref}>
        <span className="album-details">
          {icon && (
            <span className="icon mt-4 mx-4">
              <i className="far fa-at"></i>
              {icon}
            </span>
          )}
          {title && <span className="title mx-4">{title}</span>}
          {subtitle && <span className="subtitle">{subtitle} </span>}
          {subtext && <span className="subtext">{subtext}</span>}
        </span>
      </a>
    </>
  );
};

export default AlbumCards;
