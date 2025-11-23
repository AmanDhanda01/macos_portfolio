import { Tooltip } from "react-tooltip";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

import { dockApps } from "@/constants";

const Dock = () => {
  const dockRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const dock = dockRef.current;
    if (!dock) return;

    const icons = dock.querySelectorAll(".dock-icon");

    const animateIcon = (mouseX:number) => {
        const {left} = dock.getBoundingClientRect();
        icons.forEach((icon) => {
          const { left: iconLeft, width: iconWidth } = icon.getBoundingClientRect();
          const center = iconLeft - left + iconWidth / 2;
          const distance = Math.abs(mouseX - center);
          const intensity = Math.exp(-(distance ** 2.5) / 2000);

          gsap.to(icon, {
            scale:1+0.25 * intensity,
            y: -15 * intensity,
            duration: 0.2,
            ease: "power2.out",
          });
        });
          
    }
    const handleMouseMove = (event: MouseEvent) => {
        const left = dock.getBoundingClientRect().left;
        const mouseX = event.clientX - left;
        animateIcon(mouseX);
    }

    const handleMouseLeave = () => {
        icons.forEach((icon) => {
            gsap.to(icon, {
                scale:1,
                y:0,
                duration:0.3,
                ease:"power1.out",
            });
        })
    }
    dock.addEventListener("mousemove", handleMouseMove);
    dock.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      dock.removeEventListener("mousemove", handleMouseMove);
      dock.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const toggleApp = (app) => {};
  return (
    <section id="dock">
      <div ref={dockRef} className="dock-container">
        {dockApps.map((app) => (
          <div key={app.id} className="relative flex justify-center">
            <button
              type="button"
              className="dock-icon"
              aria-label={app.name}
              data-tooltip-id="dock-tooltip"
              data-tooltip-content={app.name}
              data-tooltip-delay-show={150}
              disabled={!app.canOpen}
              onClick={() => toggleApp({ id: app.id, canOpen: app.canOpen })}
            >
              <img
                src={app.icon}
                alt={app.name}
                className={app.canOpen ? "" : "opacity-60"}
                loading="lazy"
              />
            </button>
          </div>
        ))}
        <Tooltip
          id="dock-tooltip"
          place="top"
          className="tooltip"
        />
      </div>
    </section>
  );
};

export default Dock;
