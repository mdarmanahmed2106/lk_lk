import { useEffect, useRef, useState } from "react";
import { cn } from "../../lib/utils";

export const BackgroundGradientAnimation = ({
  gradientBackgroundStart = "rgb(29, 124, 141)",
  gradientBackgroundEnd = "rgb(212, 160, 90)",
  firstColor = "29, 124, 141",
  secondColor = "212, 160, 90",
  thirdColor = "45, 155, 175",
  fourthColor = "189, 143, 73",
  fifthColor = "20, 184, 166",
  pointerColor = "29, 124, 141",
  size = "80%",
  blendingValue = "hard-light",
  children,
  className,
  interactive = true,
  containerClassName,
}) => {
  const interactiveRef = useRef(null);
  const curXRef = useRef(0);
  const curYRef = useRef(0);
  const [tgX, setTgX] = useState(0);
  const [tgY, setTgY] = useState(0);

  useEffect(() => {
    document.body.style.setProperty("--gradient-background-start", gradientBackgroundStart);
    document.body.style.setProperty("--gradient-background-end", gradientBackgroundEnd);
    document.body.style.setProperty("--first-color", firstColor);
    document.body.style.setProperty("--second-color", secondColor);
    document.body.style.setProperty("--third-color", thirdColor);
    document.body.style.setProperty("--fourth-color", fourthColor);
    document.body.style.setProperty("--fifth-color", fifthColor);
    document.body.style.setProperty("--pointer-color", pointerColor);
    document.body.style.setProperty("--size", size);
    document.body.style.setProperty("--blending-value", blendingValue);
  }, [gradientBackgroundStart, gradientBackgroundEnd, firstColor, secondColor, thirdColor, fourthColor, fifthColor, pointerColor, size, blendingValue]);

  useEffect(() => {
    let animationFrameId;
    function move() {
      if (!interactiveRef.current) return;
      curXRef.current = curXRef.current + (tgX - curXRef.current) / 20;
      curYRef.current = curYRef.current + (tgY - curYRef.current) / 20;
      interactiveRef.current.style.transform = `translate(${Math.round(curXRef.current)}px, ${Math.round(curYRef.current)}px)`;
      animationFrameId = requestAnimationFrame(move);
    }
    animationFrameId = requestAnimationFrame(move);
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [tgX, tgY]);

  const handleMouseMove = (event) => {
    if (interactiveRef.current) {
      const rect = interactiveRef.current.getBoundingClientRect();
      setTgX(event.clientX - rect.left);
      setTgY(event.clientY - rect.top);
    }
  };

  const [isSafari, setIsSafari] = useState(false);
  useEffect(() => {
    setIsSafari(/^((?!chrome|android).)*safari/i.test(navigator.userAgent));
  }, []);

  return (
    <div className={cn("h-full w-full relative overflow-hidden bg-[linear-gradient(40deg,var(--gradient-background-start),var(--gradient-background-end))]", containerClassName)}>
      <svg className="hidden">
        <defs>
          <filter id="blurMe">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" result="goo" />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
      <div className={cn("", className)}>{children}</div>
      <div className={cn("gradients-container h-full w-full blur-lg", isSafari ? "blur-2xl" : "[filter:url(#blurMe)_blur(40px)]")}>
        <div 
          className={cn(`absolute [mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]`, `[transform-origin:center_center]`, `animate-first`, `opacity-100`)}
          style={{
            background: `radial-gradient(circle at center, rgba(var(--first-color), 1) 0%, rgba(var(--first-color), 0) 50%)`,
            backgroundRepeat: 'no-repeat'
          }}
        ></div>
        <div 
          className={cn(`absolute [mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]`, `[transform-origin:calc(50%-400px)]`, `animate-second`, `opacity-100`)}
          style={{
            background: `radial-gradient(circle at center, rgba(var(--second-color), 0.8) 0%, rgba(var(--second-color), 0) 50%)`,
            backgroundRepeat: 'no-repeat'
          }}
        ></div>
        <div 
          className={cn(`absolute [mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]`, `[transform-origin:calc(50%+400px)]`, `animate-third`, `opacity-100`)}
          style={{
            background: `radial-gradient(circle at center, rgba(var(--third-color), 0.8) 0%, rgba(var(--third-color), 0) 50%)`,
            backgroundRepeat: 'no-repeat'
          }}
        ></div>
        <div 
          className={cn(`absolute [mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]`, `[transform-origin:calc(50%-200px)]`, `animate-fourth`, `opacity-70`)}
          style={{
            background: `radial-gradient(circle at center, rgba(var(--fourth-color), 0.8) 0%, rgba(var(--fourth-color), 0) 50%)`,
            backgroundRepeat: 'no-repeat'
          }}
        ></div>
        <div 
          className={cn(`absolute [mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]`, `[transform-origin:calc(50%-800px)_calc(50%+800px)]`, `animate-fifth`, `opacity-100`)}
          style={{
            background: `radial-gradient(circle at center, rgba(var(--fifth-color), 0.8) 0%, rgba(var(--fifth-color), 0) 50%)`,
            backgroundRepeat: 'no-repeat'
          }}
        ></div>
        {interactive && (
          <div 
            ref={interactiveRef} 
            onMouseMove={handleMouseMove} 
            className={cn(`absolute [mix-blend-mode:var(--blending-value)] w-full h-full -top-1/2 -left-1/2`, `opacity-70`)}
            style={{
              background: `radial-gradient(circle at center, rgba(var(--pointer-color), 0.8) 0%, rgba(var(--pointer-color), 0) 50%)`,
              backgroundRepeat: 'no-repeat'
            }}
          ></div>
        )}
      </div>
    </div>
  );
};

