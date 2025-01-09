import { useEffect } from 'react';
// import './App.css'

function App() {

  useEffect(() => {
    const c = document.getElementById('mycanvas') as HTMLCanvasElement;
    if (c) {
      const ctx = c.getContext('2d');
      ctx?.beginPath();
      ctx?.arc(95, 50, 40, 0, 2 * Math.PI);
      ctx?.stroke();
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
            <button className='px-4 py-2 rounded-md text-white bg-blue-500 hover:bg-blue-600'>Hit</button>
          </div>
          <div className='flex flex-row justify-center mt-4'>
            <button className='px-4 py-2 rounded-md text-white bg-red-500 hover:bg-red-600'>Reset</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
