import React from 'react';
import Lottie from 'lottie-react';
import AnimationData from '../assets/character-animation.json'; // JSON dosyasının yolu

const AnimatedCharacter = () => {
  return (
    <div style={{ width: 140, height: 140, position: 'absolute', bottom: 454, right: 345 }}>
      <Lottie animationData={AnimationData} loop={true} />
    </div>
  );
};

export default AnimatedCharacter;
