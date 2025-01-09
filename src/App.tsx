import { useEffect, useRef, useState } from 'react';

const circleX = 100;
const circleY = 200;
const circleRadius = 40;
const arrowY = 200;
const arrowLen = 50;

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [animating, setAnimating] = useState(false);
  const [arrowX, setArrowX] = useState(700);
  const [circleColor, setCircleColor] = useState('yellow')
  const requestId = useRef<number>();

  function drawArrow(ctx: CanvasRenderingContext2D, x: number) {
    ctx.beginPath();
    ctx.moveTo(x, arrowY)
    ctx.lineTo(x + arrowLen, arrowY)
    ctx.moveTo(x, arrowY)
    ctx.lineTo(x + 15, arrowY - 10)
    ctx.moveTo(x, arrowY)
    ctx.lineTo(x + 15, arrowY + 10)

    ctx.strokeStyle = '#000'
    ctx.lineWidth = 2
    ctx.stroke();
    ctx.closePath();
  }

  function animateArrow() {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    setArrowX(x => {
      const newX = x - 3;
      if (newX <= circleX + circleRadius) {
        setAnimating(false);
        setCircleColor('blue');
        return circleX + circleRadius;
      }
      return newX;
    });
    requestId.current = requestAnimationFrame(animateArrow);
  }

  // handles starting the animation
  function handleHit() {
    if (!animating && canvasRef.current) {
      setAnimating(true);
      animateArrow();
    }
  }

  // handles reset functionality for arrow animation
  function handleReset() {
    if(requestId.current){
      cancelAnimationFrame(requestId.current);

      setAnimating(false)
      setArrowX(700)
      setCircleColor('blue')
    }
  }

  function drawCircle(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, startAngle: number, endAngle: number) {
    ctx.beginPath();
    ctx.arc(x, y, radius, startAngle, endAngle);
    ctx.fillStyle = circleColor;
    ctx.fill();
    ctx.closePath();
  }

  // circle on canvas
  useEffect(() => {
    const c = document.getElementById('mycanvas') as HTMLCanvasElement;
    const ctx = c.getContext('2d');
    if (ctx) {
      drawCircle(ctx, circleX, circleY, circleRadius, 0, 2 * Math.PI);
      drawArrow(ctx, arrowX);
    }
  }, [arrowX, circleColor])

  return (
    <>
      <div className='flex flex-col items-center justify-center min-h-screen'>
        <div className=' bg-white'>
          <h1 className='text-2xl font-bold text-center'>Bubble App</h1>
          <canvas ref={canvasRef} id='mycanvas' width={800} height={400} className='border-2 rounded-md border-gray-400'>
            Your browser does not support the HTML5 canvas tag.
          </canvas>
        </div>
        <div className='flex'>
          <div className='flex flex-row justify-center mt-4 mr-4'>
            <button onClick={handleHit} className='px-4 py-2 rounded-md text-white bg-blue-500 hover:bg-blue-600'>Hit</button>
          </div>
          <div onClick={handleReset} className='flex flex-row justify-center mt-4'>
            <button className='px-4 py-2 rounded-md text-white bg-red-500 hover:bg-red-600'>Reset</button>
          </div>
        </div>
      </div>
    </>
  )
}


export default App
