import React from 'react';
import { BackgroundGradientAnimation } from './ui/BackgroundGradientAnimation';

const GradientWrapper = ({ children, intensity = 0.3, className = "" }) => {
  return (
    <div className={`relative min-h-screen ${className}`}>
      <div className="absolute inset-0 -z-10" style={{ opacity: intensity }}>
        <BackgroundGradientAnimation
          gradientBackgroundStart="rgb(29, 124, 141)"
          gradientBackgroundEnd="rgb(212, 160, 90)"
          firstColor="29, 124, 141"
          secondColor="212, 160, 90"
          thirdColor="45, 155, 175"
          fourthColor="189, 143, 73"
          fifthColor="20, 184, 166"
          pointerColor="29, 124, 141"
          interactive={true}
        />
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default GradientWrapper;

