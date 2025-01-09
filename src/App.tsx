import { useEffect } from 'react';
// import './App.css'

const arrowYPos = 200;
const arrowLen = 50;

function drawCircle(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, startAngle: number, endAngle: number) {
  ctx.beginPath();
  ctx.arc(x, y, radius, startAngle, endAngle);
  ctx.fillStyle = 'blue';
  ctx.fill();
}

function drawArrow(ctx: CanvasRenderingContext2D, x: number) {
  ctx.beginPath();
  ctx.moveTo(x, arrowYPos)
  ctx.lineTo(x + arrowLen, arrowYPos)
  ctx.moveTo(x, arrowYPos)
  ctx.lineTo(x + 15, arrowYPos - 10)
  ctx.moveTo(x, arrowYPos)
  ctx.lineTo(x + 15, arrowYPos + 10)
  
  ctx.strokeStyle = '#000'
  ctx.lineWidth = 2
  ctx.stroke();
  ctx.closePath();
}

function App() {
  // circle on canvas
  useEffect(() => {
    const c = document.getElementById('mycanvas') as HTMLCanvasElement;
    const ctx = c.getContext('2d');
    if (ctx) {
      drawCircle(ctx, 100, 200, 40, 0, 2 * Math.PI);
      drawArrow(ctx, 700);
    }
  }, [])

  return (
    <>
      <div className='flex flex-col items-center justify-center min-h-screen'>
        <div className=' bg-white'>
          <h1 className='text-2xl font-bold text-center'>Bubble App</h1>
          <canvas id='mycanvas' width={800} height={400} className='border-2 rounded-md border-gray-400'>
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

function handleHit() {
  // Add bubble logic here
}

function handleReset(){
  
}

export default App
