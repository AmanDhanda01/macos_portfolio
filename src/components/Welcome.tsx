import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

const FONT_WEIGHTS = {
  title: { min: 400, max: 900, default: 400 },
  subtitle: { min: 100, max: 400, default: 100 },
} as const;

const renderText = (text: string, className?: string, baseWeight = 400) => {
  return [...text].map((char: string, index: number) => (
    <span
      key={index}
      className={className}
      style={{ fontVariationSettings: `'wght' ${baseWeight}` }}
    >
      {char === " " ? "\u00A0" : char}
    </span>
  ));
};

const setUpTextHover = (
  container: HTMLParagraphElement | HTMLHeadingElement,
  type: "title" | "subtitle"
) => {
  if (!container) return () => {};

  const letters = container.querySelectorAll("span");
  const { min, max, default: base } = FONT_WEIGHTS[type];

  const animateLetter = (
    letter: HTMLSpanElement,
    weight: number,
    duration = 0.25
  ) => {
    return gsap.to(letter, {
      fontVariationSettings: `'wght' ${weight}`,
      duration: duration,
      ease: "power2.out",
    });
  };

  const handleMouseMove = (event: MouseEvent) => {
    const { left } = container.getBoundingClientRect();
    const mouseX = event.clientX - left;

    letters.forEach((letter) => {
      const { left: l, width: w } = letter.getBoundingClientRect();
      const distance = Math.abs(mouseX - (l - left + w / 2));
      const intensity = Math.exp(-(distance ** 2) / 2000);

      animateLetter(letter, min + (max - min) * intensity);
    });
  };

  const handleMouseLeave = () => {
    letters.forEach((letter) => {
      animateLetter(letter, base, 0.3);
    });
  };

  container.addEventListener("mousemove", handleMouseMove);
  container.addEventListener("mouseleave", handleMouseLeave);

  return () => {
    container.removeEventListener("mousemove", handleMouseMove);
    container.removeEventListener("mouseleave", handleMouseLeave);
  };
};

const Welcome = () => {
  const titleRef = useRef<HTMLParagraphElement | null>(null);
  const subtitleRef = useRef<HTMLHeadingElement | null>(null);

  useGSAP(() => {
    const subtitleCleanUp = setUpTextHover(subtitleRef.current!, "subtitle");
    const titleCleanUp = setUpTextHover(titleRef.current!, "title");

    return () => {
      subtitleCleanUp();
      titleCleanUp();
    };
  }, []);

  return (
    <section id="welcome">
      <p ref={subtitleRef}>
        {renderText(
          "Hey, I'm Aman! Welcome to my",
          "text-3xl font-georama",
          100
        )}
      </p>
      <h1 ref={titleRef} className="mt-7">
        {renderText("Portfolio", "text-9xl italic font-georama")}
      </h1>
      <div className="small-screen">
        <p>This portfolio is designed for desktop/tablet screen only.</p>
      </div>
    </section>
  );
};

export default Welcome;
