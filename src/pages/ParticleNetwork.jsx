import React, { useEffect, useRef } from 'react';

export default function ParticleNetwork() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let can_w = window.innerWidth;
    let can_h = window.innerHeight;
    
    canvas.width = can_w;
    canvas.height = can_h;

    const BALL_NUM = 30;
    const ball_color = { r: 207, g: 255, b: 4 };
    const R = 2;
    let balls = [];
    const alpha_f = 0.03;
    const link_line_width = 0.8;
    const dis_limit = 260;
    const mouse_ball = { x: 0, y: 0, vx: 0, vy: 0, r: 0, type: 'mouse' };

    function randomNumFrom(min, max) {
      return Math.random() * (max - min) + min;
    }

    function randomArrayItem(arr) {
      return arr[Math.floor(Math.random() * arr.length)];
    }

    function randomSidePos(length) {
      return Math.ceil(Math.random() * length);
    }

    function getRandomSpeed(pos) {
      const min = -1, max = 1;
      switch(pos) {
        case 'top':
          return [randomNumFrom(min, max), randomNumFrom(0.1, max)];
        case 'right':
          return [randomNumFrom(min, -0.1), randomNumFrom(min, max)];
        case 'bottom':
          return [randomNumFrom(min, max), randomNumFrom(min, -0.1)];
        case 'left':
          return [randomNumFrom(0.1, max), randomNumFrom(min, max)];
        default:
          return [0, 0];
      }
    }

    function getRandomBall() {
      const pos = randomArrayItem(['top', 'right', 'bottom', 'left']);
      const speed = getRandomSpeed(pos);
      
      const positions = {
        top: { x: randomSidePos(can_w), y: -R },
        right: { x: can_w + R, y: randomSidePos(can_h) },
        bottom: { x: randomSidePos(can_w), y: can_h + R },
        left: { x: -R, y: randomSidePos(can_h) }
      };

      return {
        ...positions[pos],
        vx: speed[0],
        vy: speed[1],
        r: R,
        alpha: 1,
        phase: randomNumFrom(0, 10)
      };
    }

    function renderBalls() {
      balls.forEach(b => {
        if (!b.type) {
          ctx.fillStyle = `rgba(${ball_color.r},${ball_color.g},${ball_color.b},${b.alpha})`;
          ctx.beginPath();
          ctx.arc(b.x, b.y, R, 0, Math.PI * 2, true);
          ctx.closePath();
          ctx.fill();
        }
      });
    }

    function updateBalls() {
      const new_balls = [];
      balls.forEach(b => {
        b.x += b.vx;
        b.y += b.vy;
        
        if (b.x > -50 && b.x < can_w + 50 && b.y > -50 && b.y < can_h + 50) {
          new_balls.push(b);
        }
        
        b.phase += alpha_f;
        b.alpha = Math.abs(Math.cos(b.phase));
      });
      
      balls = new_balls;
    }

    function getDisOf(b1, b2) {
      const delta_x = Math.abs(b1.x - b2.x);
      const delta_y = Math.abs(b1.y - b2.y);
      return Math.sqrt(delta_x * delta_x + delta_y * delta_y);
    }

    function renderLines() {
      for (let i = 0; i < balls.length; i++) {
        for (let j = i + 1; j < balls.length; j++) {
          const fraction = getDisOf(balls[i], balls[j]) / dis_limit;
          
          if (fraction < 1) {
            const alpha = (1 - fraction).toString();
            ctx.strokeStyle = `rgba(150,150,150,${alpha})`;
            ctx.lineWidth = link_line_width;
            ctx.beginPath();
            ctx.moveTo(balls[i].x, balls[i].y);
            ctx.lineTo(balls[j].x, balls[j].y);
            ctx.stroke();
            ctx.closePath();
          }
        }
      }
    }

    function addBallIfy() {
      if (balls.length < BALL_NUM) {
        balls.push(getRandomBall());
      }
    }

    function render() {
      ctx.clearRect(0, 0, can_w, can_h);
      renderBalls();
      renderLines();
      updateBalls();
      addBallIfy();
      requestAnimationFrame(render);
    }

    function initBalls(num) {
      for (let i = 1; i <= num; i++) {
        balls.push({
          x: randomSidePos(can_w),
          y: randomSidePos(can_h),
          vx: getRandomSpeed('top')[0],
          vy: getRandomSpeed('top')[1],
          r: R,
          alpha: 1,
          phase: randomNumFrom(0, 10)
        });
      }
    }

    const handleResize = () => {
      can_w = window.innerWidth;
      can_h = window.innerHeight;
      canvas.width = can_w;
      canvas.height = can_h;
    };

    const handleMouseEnter = () => {
      if (!balls.some(b => b.type === 'mouse')) {
        balls.push(mouse_ball);
      }
    };

    const handleMouseLeave = () => {
      balls = balls.filter(b => !b.type);
    };

    const handleMouseMove = (e) => {
      mouse_ball.x = e.clientX;
      mouse_ball.y = e.clientY;
    };

    window.addEventListener('resize', handleResize);
    canvas.addEventListener('mouseenter', handleMouseEnter);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    canvas.addEventListener('mousemove', handleMouseMove);

    initBalls(BALL_NUM);
    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mouseenter', handleMouseEnter);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div style={{ 
      width: '100vw', 
      height: '100vh', 
      margin: 0, 
      padding: 0, 
      backgroundColor: '#ece3e3ff',
      overflow: 'hidden'
    }}>
      <canvas 
        ref={canvasRef}
        style={{ 
          display: 'block',
          backgroundColor: '#060000ff'
        }}
      />
    </div>
  );
}