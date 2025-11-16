"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { Pane } from "tweakpane";

gsap.registerPlugin(Draggable);

export default function LiquidToggle() {
  const toggleRef = useRef<HTMLButtonElement>(null);
  const arrowMainRef = useRef<HTMLDivElement>(null);
  const tweakpaneRef = useRef<HTMLDivElement>(null);

  // Config state for tweakpane control
  const [config, setConfig] = useState({
    theme: "light",
    complete: 0,
    active: false,
    deviation: 2,
    alpha: 16,
    bounce: true,
    hue: 144,
    delta: true,
    bubble: true,
    mapped: false,
    debug: false,
  });

  // Apply config to CSS variables and dataset attributes
  const updateToggleStyle = (cfg = config) => {
    if (!toggleRef.current) return;

    const toggle = toggleRef.current;

    toggle.style.setProperty("--complete", `${cfg.complete}`);
    toggle.style.setProperty("--hue", `${cfg.hue}`);

    if (cfg.deviation != null) {
      const blur = document.querySelector("#goo feGaussianBlur");
      if (blur) blur.setAttribute("stdDeviation", String(cfg.deviation));
    }

    if (cfg.alpha != null) {
      const cm = document.querySelector("#goo feColorMatrix");
      if (cm)
        cm.setAttribute(
          "values",
          `
          1 0 0 0 0
          0 1 0 0 0
          0 0 1 0 0
          0 0 0 ${cfg.alpha} -10
        `
        );
    }

    const root = document.documentElement;
    root.dataset.theme = cfg.theme;
    root.dataset.mapped = String(cfg.mapped);
    root.dataset.delta = String(cfg.delta);
    root.dataset.debug = String(cfg.debug);
    root.dataset.active = String(cfg.active);
    root.dataset.bounce = String(cfg.bounce);
  };

  useEffect(() => {
    updateToggleStyle();
  }, [config]);

  // Initialize tweakpane for controls
  //   useEffect(() => {
  //     if (!tweakpaneRef.current) return;

  //     const pane = new Pane({ container: tweakpaneRef.current, title: "Config" });

  //     pane
  //       .addInput(config, "theme", {
  //         options: { system: "system", light: "light", dark: "dark" },
  //       })
  //       .on("change", (ev) => setConfig((c) => ({ ...c, theme: ev.value })));

  //     const folderDebug = pane.addFolder({ title: "debug", expanded: false });
  //     folderDebug
  //       .addInput(config, "debug")
  //       .on("change", (ev) => setConfig((c) => ({ ...c, debug: ev.value })));
  //     folderDebug
  //       .addInput(config, "active")
  //       .on("change", (ev) => setConfig((c) => ({ ...c, active: ev.value })));
  //     folderDebug
  //       .addInput(config, "complete", { min: 0, max: 100, step: 1 })
  //       .on("change", (ev) => setConfig((c) => ({ ...c, complete: ev.value })));

  //     const folderBehavior = pane.addFolder({
  //       title: "behavior",
  //       expanded: false,
  //     });
  //     folderBehavior
  //       .addInput(config, "bounce")
  //       .on("change", (ev) => setConfig((c) => ({ ...c, bounce: ev.value })));
  //     folderBehavior
  //       .addInput(config, "mapped")
  //       .on("change", (ev) => setConfig((c) => ({ ...c, mapped: ev.value })));
  //     folderBehavior
  //       .addInput(config, "bubble")
  //       .on("change", (ev) => setConfig((c) => ({ ...c, bubble: ev.value })));
  //     folderBehavior
  //       .addInput(config, "delta")
  //       .on("change", (ev) => setConfig((c) => ({ ...c, delta: ev.value })));
  //     folderBehavior
  //       .addInput(config, "hue", { min: 0, max: 359, step: 1 })
  //       .on("change", (ev) => setConfig((c) => ({ ...c, hue: ev.value })));

  //     const folderFilter = pane.addFolder({ title: "filter", expanded: false });
  //     folderFilter
  //       .addInput(config, "deviation", { min: 0, max: 50, step: 1 })
  //       .on("change", (ev) => setConfig((c) => ({ ...c, deviation: ev.value })));
  //     folderFilter
  //       .addInput(config, "alpha", { min: 0, max: 50, step: 1 })
  //       .on("change", (ev) => setConfig((c) => ({ ...c, alpha: ev.value })));

  //     return () => pane.dispose();
  //   }, []);

  // Toggle animation sequence
  const toggleState = async () => {
    if (!toggleRef.current) return;
    const toggle = toggleRef.current;

    toggle.dataset.pressed = "true";
    if (config.bubble) toggle.dataset.active = "true";

    await Promise.allSettled(
      !config.bounce
        ? toggle.getAnimations({ subtree: true }).map((a) => a.finished)
        : []
    );

    const pressed = toggle.getAttribute("aria-pressed") === "true";

    gsap
      .timeline({
        onComplete: () => {
          gsap.delayedCall(0.05, () => {
            toggle.dataset.active = "false";
            toggle.dataset.pressed = "false";
            toggle.setAttribute("aria-pressed", String(!pressed));
          });
        },
      })
      .to(toggle, {
        "--complete": pressed ? 0 : 100,
        duration: 0.12,
        delay: config.bounce && config.bubble ? 0.18 : 0,
      });
  };

  // Setup Draggable
  useEffect(() => {
    if (!toggleRef.current) return;

    const toggle = toggleRef.current;
    const proxy = document.createElement("div");

    const draggable = Draggable.create(proxy, {
      allowContextMenu: true,
      handle: ".liquid-toggle",
      onDragStart() {
        const toggleBounds = toggle.getBoundingClientRect();
        const pressed = toggle.getAttribute("aria-pressed") === "true";
        const bounds = pressed
          ? toggleBounds.left - this.pointerX
          : toggleBounds.left + toggleBounds.width - this.pointerX;
        this.dragBounds = bounds;
        toggle.dataset.active = "true";
      },
      onDrag() {
        const pressed = toggle.getAttribute("aria-pressed") === "true";
        const dragged = this.x - this.startX;
        const complete = gsap.utils.clamp(
          0,
          100,
          pressed
            ? gsap.utils.mapRange(this.dragBounds, 0, 0, 100, dragged)
            : gsap.utils.mapRange(0, this.dragBounds, 0, 100, dragged)
        );
        this.complete = complete;
        gsap.set(toggle, {
          "--complete": complete,
          "--delta": Math.min(Math.abs(this.deltaX), 12),
        });
      },
      onDragEnd() {
        gsap.fromTo(
          toggle,
          {
            "--complete": this.complete,
          },
          {
            "--complete": this.complete >= 50 ? 100 : 0,
            duration: 0.15,
            onComplete: () => {
              gsap.delayedCall(0.05, () => {
                toggle.dataset.active = "false";
                toggle.setAttribute(
                  "aria-pressed",
                  String(this.complete >= 50)
                );
              });
            },
          }
        );
      },
      onPress() {
        this.__pressTime = Date.now();
        if (arrowMainRef.current) {
          arrowMainRef.current.style.opacity = "0";
        }
        if ("ontouchstart" in window && navigator.maxTouchPoints > 0)
          toggle.dataset.active = "true";
      },
      onRelease() {
        this.__releaseTime = Date.now();
        gsap.set(toggle, { "--delta": 0 });
        if (
          "ontouchstart" in window &&
          navigator.maxTouchPoints > 0 &&
          ((this.startX !== undefined &&
            this.endX !== undefined &&
            Math.abs(this.endX - this.startX) < 4) ||
            this.endX === undefined)
        )
          toggle.dataset.active = "false";

        if (this.__releaseTime - this.__pressTime <= 150) {
          toggleState();
        }
      },
    })[0];

    return () => {
      draggable.kill();
    };
  }, [config.bounce, config.bubble]);

  // Keyboard handlers
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (arrowMainRef.current) arrowMainRef.current.style.opacity = "0";
    if (e.key === "Enter") {
      toggleState();
    }
    if (e.key === " ") {
      e.preventDefault(); // prevent scroll on space
    }
  };

  const onKeyUp = (e: React.KeyboardEvent) => {
    if (e.key === " ") {
      toggleState();
    }
  };

  return (
    <>
      <main>
        <div
          ref={arrowMainRef}
          className="arrow arrow--main relative right-[120%] rotate-[-30deg] opacity-60 transition-opacity duration-260 ease-out"
          style={{ transformOrigin: "top left" }}
        >
          <span className="whitespace-nowrap inline-block">tap and drag.</span>
          <svg
            viewBox="0 0 77 139"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="rotate-[10deg] w-6 absolute top-[150%] left-1/2 scale-x-[-1]"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M63.9153 0.37541C62.6706 1.85361 63.1403 31.3942 64.7373 54.4353C65.5593 65.9325 67.0389 77.8285 68.8708 87.6362C71.0784 99.4618 71.3837 102.113 70.7496 103.99C70.1155 105.914 68.6594 106.384 61.9191 106.876C51.2566 107.674 49.3543 108.003 32.6561 112.038C25.9157 113.681 18.8936 115.112 18.7057 114.924C18.6352 114.877 19.1754 113.939 19.8799 112.859C21.3126 110.63 21.5944 109.692 21.1951 108.401C20.6784 106.642 18.5882 105.656 16.8973 106.36C16.451 106.548 14.807 107.604 13.257 108.683C10.5797 110.56 9.0531 111.405 4.54388 113.47C-0.435059 115.745 -1.37449 119.734 1.98395 124.404C3.48702 126.515 4.9901 127.829 8.65384 130.246C12.8578 132.991 16.2397 134.61 20.561 135.971C22.4868 136.581 24.9293 137.426 25.9627 137.872C27.137 138.364 27.9355 138.575 28.0764 138.435C28.9219 137.59 24.718 133.249 18.3534 128.51C15.8404 126.633 13.4684 124.826 13.0691 124.521L12.3646 123.934L13.304 123.77C19.8565 122.667 28.1468 120.861 35.8736 118.819C45.1269 116.379 51.2566 115.018 55.8128 114.385C64.2441 113.211 68.0018 112.578 69.4579 112.132C72.558 111.17 74.977 108.824 75.8929 105.867C76.8559 102.77 76.5505 99.1568 74.2959 87.2842C71.5951 73.0888 70.1155 61.1928 68.5185 41.1785C67.5086 28.5551 66.3813 11.6614 66.1465 5.04465C65.9821 0.750832 65.7707 0 64.7608 0C64.4555 0 64.0797 0.164239 63.9153 0.37541Z"
              fill="currentColor"
            />
          </svg>
        </div>

        <button
          ref={toggleRef}
          aria-label="toggle"
          aria-pressed="false"
          className="liquid-toggle relative block rounded-full border-0 bg-transparent cursor-pointer overflow-visible w-[140px] h-[60px]"
          onKeyDown={onKeyDown}
          onKeyUp={onKeyUp}
          type="button"
        >
          {/* debug knockout */}
          <div className="debug debug--knockout pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 ease-in-out">
            <div className="arrow">
              <span>knockout backdrop.</span>
            </div>
            <div className="knockout knockout--debug pointer-events-none absolute inset-0 filter-[url(#knockout)] rounded-full">
              <div className="indicator indicator--masked absolute inset-0 rounded-full bg-current">
                <div className="mask absolute top-1/2 left-[var(--border)] h-[calc(100%-var(--border)*2)] w-[calc(60%-var(--border)*2)] bg-black rounded-full -translate-y-1/2"></div>
              </div>
            </div>
          </div>

          {/* knockout */}
          <div className="knockout absolute inset-0 filter-[url(#remove-black)] rounded-full">
            <div className="indicator indicator--masked absolute inset-0 rounded-full bg-current">
              <div className="mask absolute top-1/2 left-[var(--border)] h-[calc(100%-var(--border)*2)] w-[calc(60%-var(--border)*2)] bg-black rounded-full -translate-y-1/2"></div>
            </div>
          </div>

          {/* debug goo window */}
          <div className="debug debug--indicator pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 ease-in-out">
            <div className="arrow absolute left-[calc(100%+2rem)] top-1/2 transform -translate-y-1/2 rotate-y-[-24deg] rotate-x-[24deg] translate-z-[100px] z-20 opacity-0">
              <span>goo window.</span>
            </div>
            <div className="indicator__liquid indicator__liquid--debug relative h-full w-[60%] rounded-full overflow-hidden filter-[url(#goo)]">
              <div className="shadow absolute inset-0 rounded-full shadow-[inset_0_0_3px_4px_var(--tw-ring-color),_inset_calc((var(--complete)/100*8px)_-4px)_0_3px_4px_var(--tw-ring-color)]"></div>
              <div className="wrapper absolute inset-0 rounded-full">
                <div className="liquids absolute inset-0 rounded-full overflow-visible">
                  <div className="liquid__shadow absolute inset-0 rounded-full"></div>
                  <div className="liquid__track absolute inset-0 rounded-full bg-current"></div>
                </div>
              </div>
              <div className="cover absolute inset-0 rounded-full bg-white"></div>
            </div>
          </div>

          {/* main liquid indicator */}
          <div className="indicator__liquid relative h-[calc(100%-var(--border)*2)] w-[calc(60%-var(--border)*2)] rounded-full bg-transparent absolute top-1/2 left-[var(--border)] -translate-y-1/2">
            <div className="shadow absolute inset-0 rounded-full opacity-0 shadow-[1px_-1px_2px_rgba(255,255,255,0.5)_inset,_0px_-1px_2px_rgba(255,255,255,0.5)_inset,_-1px_-1px_2px_rgba(255,255,255,0.5)_inset,1px_1px_2px_rgba(0,0,0,0.5)_inset,-8px_4px_10px_-6px_rgba(0,0,0,0.25)_inset,-1px_1px_6px_rgba(0,0,0,0.25)_inset,-1px_-1px_8px_rgba(0,0,0,0.15),1px_1px_2px_rgba(0,0,0,0.15),2px_2px_6px_rgba(0,0,0,0.15),-2px_-1px_2px_rgba(255,255,255,0.25)_inset,3px_6px_16px_-6px_rgba(0,0,0,0.5)]"></div>
            <div className="cover absolute inset-0 rounded-full bg-white"></div>
          </div>
        </button>
      </main>

      {/* SVG Filters */}
      <svg
        aria-hidden="true"
        className="sr-only"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="goo">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation={config.deviation}
            />
            <feColorMatrix
              in="blur"
              type="matrix"
              values={`
                1 0 0 0 0
                0 1 0 0 0
                0 0 1 0 0
                0 0 0 ${config.alpha} -10
              `}
            />
            <feComposite in2="blur" operator="atop" />
          </filter>

          <filter id="knockout" colorInterpolationFilters="sRGB">
            <feColorMatrix
              result="knocked"
              type="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      -1 -1 -1 1 0"
            />
            <feComponentTransfer>
              <feFuncR type="linear" slope={3} intercept={-1} />
              <feFuncG type="linear" slope={3} intercept={-1} />
              <feFuncB type="linear" slope={3} intercept={-1} />
            </feComponentTransfer>
            <feComponentTransfer>
              <feFuncR type="table" tableValues="0 0 0 0 0 1 1 1 1 1" />
              <feFuncG type="table" tableValues="0 0 0 0 0 1 1 1 1 1" />
              <feFuncB type="table" tableValues="0 0 0 0 0 1 1 1 1 1" />
            </feComponentTransfer>
          </filter>

          <filter id="remove-black" colorInterpolationFilters="sRGB">
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      -255 -255 -255 0 1"
              result="black-pixels"
            />
            <feMorphology
              in="black-pixels"
              operator="dilate"
              radius={0.5}
              result="smoothed"
            />
            <feComposite in="SourceGraphic" in2="smoothed" operator="out" />
          </filter>
        </defs>
      </svg>

      <div ref={tweakpaneRef} className="tp-dfwv w-[280px] mt-4"></div>
    </>
  );
}
