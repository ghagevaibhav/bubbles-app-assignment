import { useEffect, useRef, useState } from 'react';
// import './App.css'

const circleX = 100;
const circleY = 200;
const circleRadius = 40;

const arrowY = 200;
const arrowLen = 50;


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





function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [animating, setAnimating] = useState(false);
  const [circleColor, setCircleColor] = useState('yellow')
  
  function animateArrow(canvasRef: HTMLCanvasElement) {
    const [arrowX, setArrowX] = useState(700);
    if (!canvasRef) return;
    
    const ctx = canvasRef.getContext("2d");
    setArrowX(x => {
      const newX = x - 3;
      if (newX <= circleX + circleRadius) {
        setAnimating(false)

      }
    })
  }
  // handles starting the animation
  function handleHit() {
    if (!animating && canvasRef.current) {
      setAnimating(true);
      animateArrow(canvasRef.current);
    }
  }
  
  // handles reset functionality for arrow animation
  function handleReset() {
    
  }

  function drawCircle(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, startAngle: number, endAngle: number) {
    ctx.beginPath();
    ctx.arc(x, y, radius, startAngle, endAngle);
    ctx.fillStyle = 'blue';
    ctx.fill();
    ctx.closePath();
  }

  // circle on canvas
  useEffect(() => {
    const c = document.getElementById('mycanvas') as HTMLCanvasElement;
    const ctx = c.getContext('2d');
    if (ctx) {
      drawCircle(ctx, circleX, circleY, circleRadius, 0, 2 * Math.PI);
      drawArrow(ctx, 700);
    }
  }, [])

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
