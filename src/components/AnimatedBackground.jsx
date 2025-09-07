import React from 'react';

const AnimatedBackground = () => (
  <div className="animated-bg">
    {[...Array(12)].map((_, i) => (
      <span key={i} className={`shape shape${i+1}`}></span>
    ))}
    <style>{`
      .animated-bg {
        position: fixed;
        top: 0; right: 0; bottom: 0; left: 0; width: 100%; height: 100%;
        z-index: 0;
        overflow: hidden;
        pointer-events: none;
      }
      .animated-bg .shape {
        position: absolute;
        border-radius: 50%;
        opacity: 0.18;
        filter: blur(2px);
        animation: float 16s linear infinite alternate;
      }
      .animated-bg .shape1 { width: 120px; height: 120px; background: #80deea; left: 10vw; top: 10vh; animation-delay: 0s; }
      .animated-bg .shape2 { width: 80px; height: 80px; background: #b388ff; left: 70vw; top: 20vh; animation-delay: 2s; }
      .animated-bg .shape3 { width: 100px; height: 100px; background: #fff176; left: 50vw; top: 60vh; animation-delay: 4s; }
      .animated-bg .shape4 { width: 60px; height: 60px; background: #ff8a65; left: 80vw; top: 80vh; animation-delay: 6s; }
      .animated-bg .shape5 { width: 90px; height: 90px; background: #4dd0e1; left: 20vw; top: 80vh; animation-delay: 8s; }
      .animated-bg .shape6 { width: 70px; height: 70px; background: #ffd54f; left: 60vw; top: 10vh; animation-delay: 10s; }
      .animated-bg .shape7 { width: 110px; height: 110px; background: #ba68c8; left: 30vw; top: 30vh; animation-delay: 12s; }
      .animated-bg .shape8 { width: 50px; height: 50px; background: #ffb74d; left: 90vw; top: 50vh; animation-delay: 14s; }
      .animated-bg .shape9 { width: 100px; height: 100px; background: #aed581; left: 40vw; top: 80vh; animation-delay: 3s; }
      .animated-bg .shape10 { width: 60px; height: 60px; background: #f06292; left: 80vw; top: 40vh; animation-delay: 7s; }
      .animated-bg .shape11 { width: 80px; height: 80px; background: #64b5f6; left: 10vw; top: 60vh; animation-delay: 11s; }
      .animated-bg .shape12 { width: 90px; height: 90px; background: #fff59d; left: 70vw; top: 70vh; animation-delay: 13s; }
      @keyframes float {
        0% { transform: translateY(0) scale(1); }
        100% { transform: translateY(-60px) scale(1.15); }
      }
    `}</style>
  </div>
);

export default AnimatedBackground;
